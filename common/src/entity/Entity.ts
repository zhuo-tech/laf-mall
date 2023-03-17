import { LogicDelete } from '../constant'

/**
 * Mongo 实体
 */
export interface Entity {
    /**
     * mongo 的主键ID
     */
    _id: string
}

/**
 * 创建信息
 */
interface CreateInfo {
    /**
     * 创建时间
     */
    createTime: number
    /**
     * 创建人 可选
     */
    createBy?: string
}

/**
 * 更新信息
 */
interface UpdateInfo {
    /**
     * 更新时间 可选
     */
    updateTime: number
    /**
     * 更新人 可选
     */
    updateBy: string
}

/**
 * 支持逻辑删除
 */
interface HasLogicDelete {
    /**
     * 逻辑删除
     */
    isDelete: LogicDelete
}

// 以上为基础定义; 以下为方便使用提供

/**
 * 可更新实体, 不需要逻辑删除, 含 {@link Entity} {@link CreateInfo} {@link UpdateInfo}
 */
export interface CanUpdateEntity extends Entity, CreateInfo, UpdateInfo {

}

/**
 * 完整实体类型, 含 {@link Entity} {@link CreateInfo} {@link UpdateInfo} {@link HasLogicDelete}
 */
export interface IntegralEntity extends Entity, CreateInfo, UpdateInfo, HasLogicDelete {

}

/**
 * 只读(可新增) 实体, 含 {@link Entity} {@link CreateInfo}
 */
export interface ReadonlyEntity extends Entity, CreateInfo {

}
