import dayjs from 'dayjs'

/**
 * Format
 * @author 冰凝
 * @date 2022-06-15 下午 04:51
 **/
export function formatDate(timestamp: number, pattern: string = 'YYYY-MM-DD'): string {
    return dayjs(timestamp).format(pattern)
}
