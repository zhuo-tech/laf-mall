import { LogicDelete } from '../constant/LogicDelete'
import { MoneyType } from '../type/Financial'
import { IntegralEntity } from './Entity'

/**
 * BasicProduct
 * @author 冰凝
 * @date 2022-06-20 下午 01:22
 **/
export class BasicProduct implements IntegralEntity {
    public static readonly NAME = 'basic_product'
    public _id: string
    /**
     * 所属分类
     * @see BasicProductCategory._id
     */
    public categoryId: string
    /**
     * 商品名称
     */
    public name: string
    /**
     * 关键字
     */
    public keyword: Array<string>
    /**
     * 封面图
     */
    public cover: string
    /**
     * 轮播图
     */
    public carousel: Array<string>
    /**
     * 金额
     */
    public price: MoneyType
    // TODO: 更多价格 未定义 (折扣价, 折扣率, 会员价, 多级会员价)

    /**
     * 单位
     * 规格: 个 / 箱 / 瓶 / 只 / 套 等
     */
    public format: string
    /**
     * 库存
     */
    public stock: number
    /**
     * 排序优先级 (按 sort 升序)
     */
    public sort: number

    /**
     * 上架?
     * true 是
     */
    public onTheShelf: boolean

    public createBy: string
    public createTime: number
    public isDelete: LogicDelete
    public updateBy: string
    public updateTime: number
}
