import { LogicDelete } from '../constant/LogicDelete'
import { IntegralEntity } from './Entity'

/**
 * SysUser
 * @author 冰凝
 * @date 2022-06-14 下午 03:53
 **/
export class SysAdmin implements IntegralEntity {
    public static readonly NAME = 'sys_admin'

    public _id: string
    public username: string
    public nickname: string
    public avatar: string
    /**
     * 账号冻结 默认 false
     */
    public freeze: boolean
    /**
     * 拥有的角色
     * @see SysRole.key
     */
    public role: Array<string>
    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}
