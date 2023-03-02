import { invoke } from '@/util/Tool'
import { Response, SysUser } from 'common'

/**
 * 后台管理 云函数
 * SysAdminApi
 * @author 冰凝
 * @date 2022-06-17 下午 03:51
 **/
export class SysAdminApi {
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

    /**
     * 创建管理员
     */
    public async createUser(data: SysUser & { password: string }): Promise<string> {
        return Response.getDate(await invoke('admin_create', data))
    }

}

export interface LoginResponse {
    accessToken: string
    exp: number
    type: string
    uid: string
}

export type UserInfoResponse = SysUser & { roles: Array<string>, pers: Array<string> }
