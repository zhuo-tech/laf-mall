import cloud from '@/cloud-sdk'
import { SysPermission, SysRole, SysAdmin } from 'common'
import { LafClient, LafWrapperConfig, QueryChainWrapper } from 'laf-db-query-wrapper'
import { ArrayTool, ObjectTool } from 'typescript-util'

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
 * 查询当前登录用户信息
 * 实际就是根据 auth 中的 uid 查询用户, 用户角色, 用户权限;
 * 本质上和 injector 中的查询一模一样
 * @author 冰凝
 * @date 2022-06-17 下午 03:35
 **/
// @ts-ignore
exports.main = async function (ctx: FunctionContext) {
    const {uid} = (ctx.auth ?? {} as AuthPayload)

    if (uid) {
        return Response.ok(await getUserDetail(uid))
    }

    return Response.error('非法请求', 401)
}

async function getUserDetail(uid: string): Promise<(SysAdmin & { roles: Array<string>, pers: Array<string> }) | null> {
    const user = await new LafClient<SysAdmin>(DB_NAME.SYS_USER).selectById(uid)

    if (ObjectTool.isEmpty(user)) {
        return null
    }
    if (ArrayTool.isEmpty(user!.role)) {
        return {...user!, roles: [], pers: []}
    }

    const roles = await new QueryChainWrapper<SysRole>(DB_NAME.SYS_ROLE)
        .in('key', user!.role)
        .show('key', 'name', 'permissions')
        .list()
    const perNames = ArrayTool.distinct(roles.flatMap(i => i.permissions))

    if (ArrayTool.isEmpty(perNames)) {
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
