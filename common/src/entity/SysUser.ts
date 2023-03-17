import { LogicDelete } from '../constant'
import { MoneyType } from '../type'
import { IntegralEntity } from './Entity'

/**
 * SysUser
 * @author 冰凝
 * @date 2022-06-14 下午 03:53
 **/
export class SysUser implements IntegralEntity {
    public static readonly NAME = 'sys_user'

    public _id: string
    /**
     * 用户名
     */
    public username: string
    /**
     * 昵称
     */
    public nickname?: string
    /**
     * 头像
     */
    public avatar?: string
    /**
     * 会员等级
     * TODO: 关联等级信息
     */
    public level?: string
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
    /**
     * 分销信息
     */
    public mlm?: MlmInfo

    /**
     * 微信 openId
     */
    public wxOpenId: string
    /**
     * 是主播
     */
    public isLiver?: boolean
    /**
     * 经纬度
     */
    public longitude?: number
    public latitude?: number

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}


/**
 * 用户地址信息
 */
export class SysUserAddress {
    /**
     * 地址排序
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
     * 省
     */
    public province: string
    /**
     * 市
     */
    public city: string
    /**
     * 区
     */
    public area: string
    /**
     * 详细地址
     */
    public detailed: string
    /**
     * 邮政编码
     */
    public postCode: string
    /**
     * 经度
     */
    public longitude?: number
    /**
     * 纬度
     */
    public latitude?: number
    /**
     * 是默认地址?
     * 一个用户, 仅能设置一个默认地址,更新时注意同步; 意外设置多个 行为未定义;
     */
    public isDefault: boolean
    public createTime: number
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
    /**
     * 佣金余额
     */
    public commission: MoneyType
}

/**
 * 分销信息
 * TODO: 分销记录 未定义
 */
export class MlmInfo {
    /**
     * 上级推广员ID {@link SysUser._id}
     */
    public upperLevelUid: string
    /**
     * 上 上级推广员ID {@link SysUser._id}
     */
    public topUid: string
    /**
     * 推广时间
     */
    public spreadTime: number
    /**
     * 下一级用户UID {@link SysUser._id}
     */
    public nextLevel: Array<string>
}
