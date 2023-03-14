import { ElMessage } from 'element-plus'

/**
 * 标准错误处理器
 * @param e 任何错误类型
 */
export function StandardErrorProcess(e: Error | any): void {
    if (!e) {
        return
    }

    if (typeof e === 'string') {
        ElMessage.error(e)
        return
    }

    if (e instanceof Error) {
        ElMessage.error(e.message)
        return
    }
}
