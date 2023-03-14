import cloud from '@/cloud-sdk'
import { TimeUnit } from '@es-tool/core'
import { SysAdmin, SysPassword } from 'common'
// @ts-ignore
import * as crypto from 'crypto'
import { LafWrapperConfig, QueryChainWrapper } from 'laf-db-query-wrapper'

LafWrapperConfig.database = cloud.database

const DB_NAME = {
    SYS_USER: 'sys_admin',
    SYS_PASSWORD: 'sys_password',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}

interface AuthPayload {
    uid: string
    type: string
    exp: number
}

/**
 * API: 管理员登录
 * TODO: 考虑保留登录设备信息和登录日志
 */
// @ts-ignore
exports.main = async function (ctx: FunctionContext): Promise<Response<any>> {
    const {username, password} = ctx.body
    if (!username || !password) {
        return Response.error('必须的参数为空')
    }

    // if (!ctx.method.toLocaleUpperCase('POST')) {
    //     return Response.error('UNSUPPORTED_REQUEST_METHOD')
    // }

    const user = await new QueryChainWrapper<SysAdmin>(DB_NAME.SYS_USER)
        .eq('username', username)
        .one()

    if (!user) {
        console.log('无效的用户名: ', username)
        return Response.error('用户不存在')
    }

    const pwd = await new QueryChainWrapper<SysPassword>(DB_NAME.SYS_PASSWORD)
        .eq('uid', user._id)
        .eq('type', 'login')
        .one()

    if (!PasswordTool.check(password, (pwd ?? {} as any).password)) {
        console.log('密码错误')
        return Response.error('用户名或密码错误')
    }

    // 签发 token
    const token = new JwtToken(user._id, 'admin')

    return Response.ok(token.view())
}

class JwtToken {
    public readonly payload: AuthPayload

    constructor(uid: string, type: string) {
        this.payload = JwtToken.getPayload(uid, type)
    }

    public get accessToken(): string {
        // @ts-ignore
        return cloud.getToken(this.payload)
    }

    public view() {
        return {...this.payload, accessToken: this.accessToken}
    }

    private static get expire() {
        return Math.floor(Date.now() / 1000) + TimeUnit.DAY.toSecond(7)
    }

    private static getPayload(uid: string, type: string): AuthPayload {
        return {uid: uid, type: type, exp: JwtToken.expire}
    }

}

class PasswordTool {
    /**
     * 加密方式映射
     * - key: 加密方式, 保存在密码头中
     * - value: 加密字符串的方法
     */
    private static readonly encryptionMapping = {
        /**
         * 明文: "{none}"
         */
        none: (s: string) => s,
        /**
         * 哈希: "{sha256}"
         */
        sha256: (s: string) => crypto.createHash('sha256').update(s).digest('hex'),
    }
    /**
     * 密码格式: [{加密方式}]<非空字符密文>
     */
    private static readonly encryption = new RegExp('^(\\{([\\dA-Za-z]+)})?(\\S+)$')

    /**
     * 检查密码
     * @param password 客户端提供未加密密码
     * @param ciphertext 数据库保存的加密后的密码
     */
    public static check(password: string, ciphertext: string) {
        const arr = this.encryption.exec(ciphertext)
        // 密码格式不正确
        if (!arr) {
            return false
        }

        const type: keyof typeof PasswordTool.encryptionMapping = (arr[2] ?? 'sha256') as any
        const cipher = arr[3]

        // 如果找不到合适的加密函数, 表达式应为: undefined === cipher
        return this.encryptionMapping[type]?.(password) === cipher
    }
}

class Response<T> {
    public code: number
    public msg: string
    public data: T

    constructor(code: number, msg: string, data: T) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    public static ok<T = any>(data: T, msg: string = ''): Response<T> {
        return new Response<T>(0, msg, data)
    }

    public static error(msg: string, code: number = 1) {
        return new Response(code, msg, null)
    }
}
