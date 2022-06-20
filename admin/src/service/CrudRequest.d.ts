import { Page } from 'laf-db-query-wrapper'

/**
 * CrudRequest
 * @author 冰凝
 * @date 2022-06-15 下午 12:25
 **/
export interface CrudRequest<T> {
    /**
     * 分页查询请求
     * @param page 页码, 页大小
     * @param query 查询参数
     */
    pageRequest: (page: Page<T>, query: Partial<T>) => Promise<Page<T>>
    /**
     * 新增请求
     * @param data 新增表单数据
     */
    createRequest: (data: Partial<T>) => Promise<any>
    /**
     * 更新请求
     * @param data 更新表单数据
     */
    updateRequest: (data: Partial<T>) => Promise<any>
    /**
     * 根据ID "删除"
     * @param id 待删除ID
     */
    deleteByIdRequest: (id: string | number) => Promise<any>
}
