import cloud from '@/cloud-sdk'
import { SysPassword, SysPermission, SysRole, SysUser } from 'common'
// @ts-ignore
import * as crypto from 'crypto'
import { LafClient, LafWrapperConfig, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil, ObjectUtil } from 'typescript-util'

LafWrapperConfig.database = cloud.database

const DB_NAME = {
    SYS_USER: 'sys_user',
    SYS_PASSWORD: 'sys_password',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}
/**
 * 必须的权限
 */
const PERMISSIONS = 'sys_user_create'

interface AuthPayload {
    uid: string
    type: string
    exp: number
}

/**
 * 创建管理员账号, 不提供默认权限
 * @author 冰凝
 * @date 2022-06-17 下午 06:30
 **/
// @ts-ignore
exports.main = async function (ctx: FunctionContext) {
    const body: SysUser & { password: string } = ctx.body
    const auth: AuthPayload = ctx.auth ?? {}

    // 权限检查
    if (!auth.uid) {
        return Response.error('ILLEGAL_REQUEST', 401)
    }
    const currentUser = await getUserDetail(auth.uid)
    if (!currentUser) {
        console.log('auth 中无效的UID', auth.uid)
        return Response.error('INVALID_USER', 403)
    }

    if (!currentUser.pers.includes(PERMISSIONS)) {
        console.debug('权限不足')
        return Response.error('INSUFFICIENT_PERMISSIONS', 401)
    }

    // 参数检查
    const {username, password} = body
    if (!username || !password) {
        return Response.error('ILLEGAL_PARAMETER', 400)
    }

    try {
        const uid = await createUser(body, currentUser._id)
        return Response.ok(uid, 'SUCCESS')
    } catch (e: any) {
        return Response.error(e?.message, 500)
    }
}

/**
 * 加密方式映射
 * - key: 加密方式, 保存在密码头中
 * - value: 加密字符串的方法
 */
const encryptionMapping = {
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
 * 创建一个新用户
 * @param body 用户信息
 * @param operatorId 操作人ID
 */
async function createUser(body: SysUser & { password: string }, operatorId: string): Promise<string> {
    const {username, password, nickname, role, isAdmin, freeze, avatar, basic} = body

    // 保存用户
    const newUid: string = <string>await new LafClient<SysUser>(DB_NAME.SYS_USER).insert({
        username,
        nickname,
        role,
        isAdmin,
        freeze,
        avatar,
        basic,
        createBy: operatorId,
        createTime: Date.now(),
        updateTime: Date.now(),
        // LogicDelete.NORMAL
        isDelete: 1,
    })

    // 保存密码
    await new LafClient<SysPassword>(DB_NAME.SYS_PASSWORD).insert({
        type: 'login',
        password: '{sha256}' + encryptionMapping.sha256(password),
        uid: newUid,
        createTime: Date.now(),
        updateTime: Date.now(),
        createBy: operatorId,
    })

    return newUid
}

async function getUserDetail(uid: string): Promise<(SysUser & { roles: Array<string>, pers: Array<string> }) | null> {
    const user = await new LafClient<SysUser>(DB_NAME.SYS_USER).selectById(uid)

    if (ObjectUtil.isEmpty(user)) {
        return null
    }
    if (CollUtil.isEmpty(user!.role)) {
        return {...user!, roles: [], pers: []}
    }

    const roles = await new QueryChainWrapper<SysRole>(DB_NAME.SYS_ROLE)
        .in('key', user!.role)
        .show('key', 'name', 'permissions')
        .list()
    const perNames = CollUtil.distinct(roles.flatMap(i => i.permissions))

    if (CollUtil.isEmpty(perNames)) {
        return {...user!, roles: roles.flatMap(i => i.key), pers: []}
    }
    const pers = await new QueryChainWrapper<SysPermission>(DB_NAME.SYS_PERMISSION)
        .in('name', perNames)
        .show('name', 'desc')
        .list()

    return {...user!, roles: roles.flatMap(i => i.key), pers: pers.flatMap(i => i.name)}
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
