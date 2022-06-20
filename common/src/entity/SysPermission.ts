import { CanUpdateEntity } from './Entity'

/**
 * SysPermission
 * @author 冰凝
 * @date 2022-06-14 下午 03:54
 **/
export class SysPermission implements CanUpdateEntity {

    public static readonly NAME = 'sys_permission'

    public _id: string
    /**
     * 权限名, 标识, 唯一key
     */
    public name: string
    /**
     * 权限描述
     */
    public desc: string
    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}
