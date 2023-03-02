/**
 * FileService
 * @author 冰凝
 * @date 2022-07-04 上午 10:06
 **/
export interface FileService {

    /**
     * URL 补全
     * @param path {@link UploadFileInfo.path}
     */
    pathCompletion(path: string): string

    /**
     * 自定义 path 协议处理
     * @param path {@link UploadFileInfo.path}
     */
    pathProcess(path: string): Promise<string>

    /**
     * 文件上传
     * @param file 待上传的文件
     * @param onProgress 进度回调 可选
     */
    upload(file: File, onProgress?: (event: ProgressEvent) => void): Promise<UploadFileInfo>

}

export interface UploadFileInfo {
    /**
     * 如果是媒体文件, 可选的返回媒体时长
     * @see HTMLMediaElement.duration
     */
    duration?: number
    /**
     * 文件访问URL, 一般需要经 {@link FileService#pathCompletion} 补全
     */
    path: string
    /**
     * 原始文件名
     * @see File.name
     */
    name: string
    /**
     * 原始文件大小
     * @see File.name
     */
    size: number
    /**
     * 原始文件类型
     * @see File.type
     */
    type: string
}
