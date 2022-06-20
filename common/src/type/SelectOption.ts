/**
 * Option
 * @author 冰凝
 * @date 2022-06-15 下午 03:35
 **/
export class SelectOption<V = string> {
    /**
     * 显示
     */
    public label: string
    /**
     * 选择后的值
     */
    public value: V
    /**
     * 禁用
     */
    public disabled?: boolean
    /**
     * 树形结构子元素
     */
    public children?: Array<SelectOption<V>>
}
