import cloud from '@/cloud-sdk'
import { Client } from 'minio'
import { RandomUtil } from 'typescript-util'

interface Body {
    /**
     * 简单文件桶名
     */
    simpleBucketName: string
    /**
     * 文件名
     */
    fileName: string
}

const HTTP_PROTOCOL = new RegExp('^(http://|https://)?(\\S+)')
const client = new Client({
    endPoint: splitURL(),
    useSSL: true,
    accessKey: cloud.env.OSS_ACCESS_KEY,
    secretKey: cloud.env.OSS_ACCESS_SECRET,
    region: cloud.env.OSS_REGION,
})

/**
 * oss-upload-url-pre-signed
 * @author 冰凝
 * @date 2022-07-04 上午 10:47
 **/
// @ts-ignore
exports.main = async function (ctx: FunctionContext): Promise<Response<PreSignedResponse>> {
    const {simpleBucketName, fileName} = ctx.body as Body

    if (!simpleBucketName || !fileName) {
        return Response.error('非法参数')
    }

    try {
        const name = generateFileName(fileName)
        const bucketName = cloud.env.APP_ID + '-' + simpleBucketName
        const url = await client.presignedUrl('PUT', bucketName, name, 3600)

        return Response.ok({
            url: url,
            path: `/${ bucketName }/${ name }`,
        })
    } catch (e: any) {
        return Response.error(e?.message)
    }
}

/**
 * 提取文件后缀名
 * - group 1: 文件名
 * - group 2: 后缀名
 */
const FILE_EXTENSION = new RegExp('.*?/?([^/]+)(\\.[\\d\\w]+)$')

/**
 * 生成随机文件名 <br>
 * {@link Date.now} 转 36 进制 + 20 位随机数转36进制
 * @param fileName 原始文件名参考, 取文件后缀名
 */
function generateFileName(fileName: string) {
    const timePrefix = Date.now().toString(36)
    const randomNumStr = RandomUtil.randomString(RandomUtil.NUMBER, 20)
    const randomSuffix = Number(randomNumStr).toString(36)

    const exec = FILE_EXTENSION.exec(fileName)
    if (!exec) {
        return timePrefix + randomSuffix
    }

    return timePrefix + randomSuffix + exec[2] || ''
}

export interface PreSignedResponse {
    url: string
    path: string
}

function splitURL() {
    const arr = HTTP_PROTOCOL.exec(cloud.env.OSS_EXTERNAL_ENDPOINT)
    if (!arr) {
        throw new Error('env.OSS_EXTERNAL_ENDPOINT 格式非法')
    }
    return arr[2]
}

class Response<T> {
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

    public static error<T>(msg: string, code: number = 1) {
        return new Response<T>(code, msg, null as any)
    }
}
