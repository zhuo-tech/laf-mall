import { cloud } from '@/config/LafConfig'

/**
 * 使用 HTTP POST 方式调用云函数
 */
export function invoke(url: string, body: any) {
    return cloud.invoke(url, body)
}

/**
 * 简单 HTTP 请求
 */
export function Request<R = any>(option: RequestOption): Promise<R> {
    const {method, url, onProgress, body, timeout} = option

    const request = new XMLHttpRequest()
    if (timeout !== undefined) {
        request.timeout = timeout
    }

    const listener = (e: ProgressEvent) => onProgress?.(e)
    request.addEventListener('progress', listener)
    request.addEventListener('load', listener)

    return new Promise((resolve, reject) => {

        request.onreadystatechange = (e) => {
            if (request.readyState === 4) {
                const s = request.status
                if (s >= 200 && s < 300) {
                    resolve(request.responseText as any)
                }
                reject(new Error(request.statusText))
            }
        }

        try {
            request.open(method, url)
            request.send(body)
        } catch (e) {
            reject(e)
        }
    })
}

export interface RequestOption {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
    onProgress?: (e: ProgressEvent) => void
    timeout?: number
}
