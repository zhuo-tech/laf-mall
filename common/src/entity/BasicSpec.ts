import { CanUpdateEntity } from './Entity'

/**
 * <h2>基本规格</h2>
 *
 * 一行记录是一个规格组, 规格项保存在 {@link item} 中
 *
 * @author 冰凝
 * @date 2022-07-06 下午 12:19
 **/
export class BasicSpec implements CanUpdateEntity {
    public static readonly NAME = 'basic_spec'

    public _id: string
    /**
     * 规格组名
     */
    public name: string
    /**
     * 规格项(名)列表; 不重复
     */
    public item: Array<string>

    public createBy: string
    public createTime: number
    public updateBy: string
    public updateTime: number
}
