import { formatDate as fd } from 'common'

/**
 * 格式化时间戳
 * @author 冰凝
 * @date 2022-06-15 下午 06:04
 **/
export function formatDate(pattern: string = 'YYYY-MM-DD') {
    return (row: any, column: string, cellValue: number, index: number) => fd(cellValue, pattern)
}
