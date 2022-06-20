import { cloud } from '@/config/LafConfig'
import { Component, Response, SysUser } from 'common'

/**
 * 后台管理 云函数
 * SysAdminApi
 * @author 冰凝
 * @date 2022-06-17 下午 03:51
 **/
@Component(SysAdminApi.KEY)
export class SysAdminApi {
    public static readonly KEY = 'SysAdminApi'

    /**
     * 管理员登录
     * @see https://console.lafyun.com/app-console/#/app/3dgrfj/cloudfunction/functions/62ab05081a8c4af190ddb420
     */
    public async login(data: Record<string, string>): Promise<LoginResponse> {
        return Response.getDate(await invoke('admin_login', data))
    }

    /**
     * 查询当前登录用户信息
     * @see https://console.lafyun.com/app-console/#/app/3dgrfj/cloudfunction/functions/62ac2f181a8c4af190ddb44c
     */
    public async userInfo(): Promise<UserInfoResponse> {
        return Response.getDate(await invoke('admin_info', {}))
    }

    public async createUser(data: SysUser & { password: string }): Promise<string> {
        return Response.getDate(await invoke('admin_create', data))
    }

}

/**
 * 使用 HTTP POST 方式调用云函数
 */
function invoke(url: string, body: any) {
    return cloud.invoke(url, body)
}

export interface LoginResponse {
    accessToken: string
    exp: number
    type: string
    uid: string
}

export type UserInfoResponse = SysUser & { roles: Array<string>, pers: Array<string> }
