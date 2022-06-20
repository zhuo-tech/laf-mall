import { Entity, LogicDelete } from './Entity'

/**
 * SysRole
 * @author 冰凝
 * @date 2022-06-14 下午 03:54
 **/
export class SysRole implements Entity {
    public static readonly NAME = 'sys_role'

    public _id: string
    /**
     * 标识, 唯一key
     */
    public key: string
    /**
     * 角色的可读名称
     */
    public name: string
    /**
     * 详细的描述信息
     */
    public desc: string
    /**
     * @see SysPermission.name
     */
    public permissions: Array<string>

    public createBy: string
    public createTime: number
    /**
     * @deprecated 弃用
     */
    public isDelete?: LogicDelete
    public updateBy: string
    public updateTime: number
}
