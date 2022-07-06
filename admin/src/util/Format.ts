import { formatDate as fd } from 'common'

/**
 * 格式化时间戳
 * @author 冰凝
 * @date 2022-06-15 下午 06:04
 * @return el-table-column formatter 所需的格式化函数
 * @see https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7
 **/
export function formatDate(pattern: string = 'YYYY-MM-DD') {
    return (row: any, column: string, cellValue: number, index: number) => fd(cellValue, pattern)
}
