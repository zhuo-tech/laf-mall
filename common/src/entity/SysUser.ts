import { LogicDelete } from '../constant/LogicDelete'
import { MoneyType } from '../type/Financial'
import { IntegralEntity } from './Entity'

/**
 * SysUser
 * @author 冰凝
 * @date 2022-06-14 下午 03:53
 **/
export class SysUser implements IntegralEntity {
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
    public basic: SysUserInfo
    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}

/**
 * 用户其他信息
 */
export class SysUserInfo {
    /**
     * 地址列表
     */
    public address?: Array<SysUserAddress>
    /**
     * 手机号
     */
    public phone?: string
    /**
     * 用户钱包: 余额, 支付密码, 积分 等
     */
    public wallet?: SysUserWallet
}

/**
 * 用户地址信息
 */
export class SysUserAddress {
    /**
     * 地址排序, "隐式索引"
     */
    public sort: number
    /**
     * 地址别名
     */
    public alias: string
    /**
     * 收件人名称
     */
    public name: string
    /**
     * 收件人手机号
     */
    public phone: string

    /**
     * 省市区 详细地址, 邮政编码
     */
    public province: string
    public city: string
    public area: string
    public detailed: string
    public postCode: string

    /**
     * 是默认地址?
     * 一个用户, 仅能设置一个默认地址,更新时注意同步; 意外设置多个 行为未定义;
     */
    public isDefault: boolean
}

/**
 * 用户钱包
 */
export class SysUserWallet {
    /**
     * 货币(人民币)余额:
     */
    public balance: MoneyType
    /**
     * 支付密码
     */
    public paymentPassword: string
    /**
     * 积分余额
     */
    public pointBalance: string
}
