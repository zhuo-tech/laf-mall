import { invoke } from '@/util/Tool'
import { Response } from 'common'

/**
 * ToolApi
 * @author 冰凝
 * @date 2022-07-04 上午 10:43
 **/
export class ToolApi {

    /**
     * @param sbn bucket name
     * @param name 文件名的参考值
     */
    public async ossUploadUrlPreSigned(sbn: string, name: string): Promise<PreSignedResponse> {
        return Response.getDate(await invoke('oss-upload-url-pre-signed', { simpleBucketName: sbn, fileName: name } as PreSignedRequestBody))
    }

}

export interface PreSignedRequestBody {
    /**
     * 简单文件桶名
     */
    simpleBucketName: string
    /**
     * 文件名的参考值
     */
    fileName: string
}

export interface PreSignedResponse {
    url: string
    path: string
}
