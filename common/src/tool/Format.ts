import dayjs from 'dayjs'

/**
 * Format
 * @author ε°ε
 * @date 2022-06-15 δΈε 04:51
 **/
export function formatDate(timestamp: number, pattern: string = 'YYYY-MM-DD'): string {
    return dayjs(timestamp).format(pattern)
}
