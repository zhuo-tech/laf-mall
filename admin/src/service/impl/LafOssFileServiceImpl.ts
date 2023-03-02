import { ToolApi } from '@/repository/ToolApi'
import { FileService, UploadFileInfo } from '@/service/FileService'
import { Request } from '@/util/Tool'
import { StrTool } from '@es-tool/core'

/**
 * LafOssFileServiceImpl
 * @author 冰凝
 * @date 2022-07-04 上午 10:34
 **/
export class LafOssFileServiceImpl implements FileService {

    /**
     * 默认 bucket name
     */
    private static readonly BUCKET_NAME = 'public'
    private static readonly MEDIA_FILE_TYPE = new RegExp('^(video|audio)/\\S*$')

    private readonly toolApi: ToolApi = new ToolApi()

    public pathCompletion(path: string): string {
        if (StrTool.isEmpty(path)) {
            return StrTool.EMPTY
        }
        if (path.startsWith(StrTool.HTTP) || path.startsWith(StrTool.HTTPS)) {
            return path
        }
        if (path.startsWith(StrTool.PATH_INTEGRAL)) {
            return 'https://oss.lafyun.com' + path
        }
        return 'https://oss.lafyun.com/' + path
    }

    public async pathProcess(path: string): Promise<string> {
        return this.pathCompletion(path)
    }

    public async upload(file: File, onProgress?: (event: ProgressEvent) => void): Promise<UploadFileInfo> {
        const {path, url} = await this.toolApi.ossUploadUrlPreSigned(LafOssFileServiceImpl.BUCKET_NAME, file.name)
        await Request({method: 'PUT', url, body: file, timeout: 1000 * 60 * 60, onProgress} as any)

        return {
            path: path,
            duration: await LafOssFileServiceImpl.getMediaDuration(file),
            name: file.name,
            size: file.size,
            type: file.type,
        }
    }

    private static getMediaDuration(file: File): Promise<number> {
        const arr = LafOssFileServiceImpl.MEDIA_FILE_TYPE.exec(file.type)
        if (!arr) {
            return new Promise<number>(ok => ok(0))
        }

        // arr[1] 应为 video(HTMLVideoElement) 或 audio (HTMLAudioElement)
        const me: HTMLMediaElement = document.createElement(arr[1] as any) as any

        me.src = URL.createObjectURL(file)
        me.autoplay = true
        me.controls = true
        me.muted = true
        me['width'] = 300

        me.style.position = 'fixed'
        me.style.width = '300px'
        me.style.zIndex = '3000'
        me.style.top = '0'
        me.style.left = '0'
        me.style.visibility = 'hidden'

        return new Promise<number>((resolve) => {
            me.onloadedmetadata = () => {
                resolve(Math.floor(me.duration))
                me.remove()
            }
        })
    }

}
