import { Entity, LogicDelete } from './Entity'

/**
 * SysUser
 * @author 冰凝
 * @date 2022-06-14 下午 03:53
 **/
export class SysUser implements Entity {
    public static readonly NAME = 'sys_user'

    public _id: string
    public username: string
    public nickname: string
    public avatar: string
    /**
     * 是否可以登录后台管理
     */
    public isAdmin: boolean
    /**
     * 账号冻结 默认 false
     */
    public freeze: boolean
    /**
     * 拥有的角色
     * @see SysRole.key
     */
    public role: Array<string>
    /**
     * 其他用户信息: 手机号, 地址, 等
     */
    public basic: {

    }

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}
