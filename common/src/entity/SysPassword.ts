import { CanUpdateEntity } from './Entity'

/**
 * SysPassword
 * @author 冰凝
 * @date 2022-06-16 下午 04:48
 **/
export class SysPassword implements CanUpdateEntity {
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
    public updateBy: string
    public updateTime: number
}
