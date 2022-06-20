import { Entity, LogicDelete } from './Entity'

/**
 * SysPassword
 * @author 冰凝
 * @date 2022-06-16 下午 04:48
 **/
export class SysPassword implements Entity {
    public static readonly NAME = 'sys_password'

    public _id: string
    /**
     * UID
     */
    public uid: string
    /**
     * 编码后的密码.
     * 形如:
     * ```js
     * new RegExp('^(\\{[\\dA-Za-z]+})?(\\S+)$')
     * ```
     */
    public password: string
    public type: 'login' | string

    public createBy: string
    public createTime: number
    /**
     * @deprecated 不需要
     */
    public isDelete?: LogicDelete
    public updateBy: string
    public updateTime: number
}
