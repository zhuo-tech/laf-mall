/**
 * Response
 * @author 冰凝
 * @date 2022-06-17 下午 04:14
 **/
export class Response<T> {

    public static readonly CODE_OK = 0

    public code: number
    public msg: string
    public data: T

    constructor(code: number, msg: string, data: T) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    public static ok<T = any>(data: T, msg: string = ''): Response<T> {
        return new Response<T>(0, msg, data)
    }

    public static error(msg: string, code: number = 1) {
        return new Response(code, msg, null)
    }

    public static getDate<T>(res: Response<T>): T {
        if (res && res.code == Response.CODE_OK) {
            return res.data
        }
        throw new ResponseStatusError(res.msg, res.code, res)
    }
}

/**
 * 服务器响应状态错误. <br>
 * 这种错误严重程度低于语法错误和网络错误, 酌情处理
 */
export class ResponseStatusError extends Error {
    /**
     * @see Response.code
     * @see Response.CODE_OK
     */
    public errorCode: number
    /**
     * @see Response.msg
     */
    public msg: string

    public res: Response<any>

    constructor(message: string, errorCode: number, res: Response<any>) {
        super(message)
        this.errorCode = errorCode
        this.msg = message
        this.res = res
    }
}
