/**
 * BasisEntity
 * @author 冰凝
 * @date 2022-06-14 下午 03:55
 **/
export interface Entity {
    /**
     * mongo 的主键ID
     */
    _id: string
    /**
     * 创建时间
     */
    createTime: number
    /**
     * 更新时间 可选
     */
    updateTime?: number
    /**
     * 创建人 可选
     */
    createBy?: string
    /**
     * 更新人 可选
     */
    updateBy?: string
    /**
     * 逻辑删除 可选
     */
    isDelete?: LogicDelete
}

/**
 * 逻辑删除
 */
export enum LogicDelete {
    /**
     * 已删除
     */
    DELETED = 0,
    /**
     * 正常
     * @type {LogicDelete.NORMAL}
     */
    NORMAL = 1,
}
