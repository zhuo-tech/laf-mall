/**
 * 树节点
 * @author 冰凝
 * @date 2022-06-20 下午 01:59
 **/
export interface TreeNode<T extends TreeNode<T>> {
    /**
     * 父ID
     */
    parentId: string
    /**
     * 子级
     */
    children?: Array<T>
}
