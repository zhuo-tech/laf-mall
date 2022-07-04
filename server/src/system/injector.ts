import cloud from '@/cloud-sdk'
import { SysPermission, SysRole, SysAdmin } from 'common'
import { LafClient, LafWrapperConfig, QueryChainWrapper } from 'laf-db-query-wrapper'
import { CollUtil, ObjectUtil } from 'typescript-util'

LafWrapperConfig.database = cloud.database

const DB_NAME = {
    SYS_USER: 'sys_admin',
    SYS_ROLE: 'sys_role',
    SYS_PERMISSION: 'sys_permission',
}

interface AuthPayload {
    uid: string
}

/**
 * 本函数为 policy injector， 当用户请求 proxy/:policy 时，会调用本函数返回的函数获取该策略的 injections。
 * 返回的 injections 会注入到该策略规则中执行。
 * 例如，本例中返回了 $has 和 $is 函数，则在规则中可以这样使用：
 * ```json
 * {
 *   "add": "$has('article.create')",
 *   "remove": "$is('admin')"
 * }
 * ```
 */
// @ts-ignore
exports.main = async function (ctx: any) {

    return async function (payload: AuthPayload, params: any) {
        const auth = payload
        if (!auth.uid) {
            return {}
        }
        const detail = await getUserDetail(auth.uid)
        if (!detail) {
            return {}
        }
        const {pers, roles} = detail
        return {
            ...auth,
            $has: (permissionName: string) => pers.includes(permissionName),
            $is: (roleName: string) => roles.includes(roleName),
        }
    }
}

async function getUserDetail(uid: string): Promise<(SysAdmin & { roles: Array<string>, pers: Array<string> }) | null> {
    const user = await new LafClient<SysAdmin>(DB_NAME.SYS_USER).selectById(uid)

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
