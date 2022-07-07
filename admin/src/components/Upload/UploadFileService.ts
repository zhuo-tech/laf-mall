import { FileService, FileServiceKey, UploadFileInfo } from '@/service/FileService'
import { Inject } from 'common'
import { ElMessage, UploadFile, UploadFiles, UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus'
import { CollUtil, ObjectUtil, StrUtil } from 'typescript-util'
import { ref, watchEffect } from 'vue'

// noinspection JSUnusedLocalSymbols
/**
 * UploadFile
 * @author 冰凝
 * @date 2022-06-29 下午 03:01
 **/
export class UploadFileService {
    private readonly log = console
    public readonly fileList = ref<Array<UploadUserFile>>([])
    private readonly props: PropType
    private readonly emits: EmitType

    @Inject(FileServiceKey)
    private get fileService(): FileService {
        return null as any
    }

    constructor(props: PropType, emits: EmitType) {
        this.props = props
        this.emits = emits
        watchEffect(this.handleEcho)
    }

    public onUploadSuccess = (response: UploadFileInfo, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        this.updateModel(uploadFiles, this.props)
    }

    public onRemove = (uploadFile: UploadFile) => {
        this.log.debug('移除文件', uploadFile.response, '文件列表', this.fileList.value)
        this.updateModel(this.fileList.value as any, this.props)
    }

    /**
     * 自定义上传
     * @impl 此函数不能返回 {@link Promise} 否则 element-plus upload 会置 response 为 {@link undefined}
     */
    public upLoadRequest = (options: UploadRequestOptions) => {
        const onProgress = (event: ProgressEvent) => {
            const percent = event.loaded / event.total * 100
            const progress = {...event, percent: isNaN(percent) ? 100 : percent}
            console.debug('进度: ', {progress, percent})
            // TODO: 进度回调无效
            // options.onProgress(progress as any)
        }

        const action = async () => {
            const fileInfo = await this.fileService.upload(options.file, onProgress)
            options.onSuccess(fileInfo)
        }
        action().catch(err => options.onError(err))
    }

    public beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.size / 1024 / 1024 > 5) {
            ElMessage.error('文件大小不能超过 5 MB！')
            return false
        }
        return true
    }

    /**
     * 内部状态变化后, 抛出变化后的数据
     */
    private updateModel(fileList: UploadFiles, propValue: PropType) {
        const {emits} = this
        if (CollUtil.isEmpty(fileList)) {
            emits('update:href', StrUtil.EMPTY)
            emits('update:hrefs', [])
            emits('update:fileInfo', undefined as any)
            emits('update:fileInfoList', [])
            emits('input', [])
            return
        }
        const fileInfo = fileList.filter(i => i.status === 'success')
            .map(i => (i.response) as UploadFileInfo)
        const value = fileInfo.map(i => i.path)

        // 取最后一个 (最新), 用于 avatar 模式 替换
        emits('update:href', value[value.length - 1] ?? StrUtil.EMPTY)
        emits('update:hrefs', value)
        emits('update:fileInfo', fileInfo[value.length - 1])
        emits('update:fileInfoList', fileInfo)
        emits('input', fileList)
    }

    /**
     * 处理回显
     */
    private handleEcho = () => {
        const {fileList} = this
        if (CollUtil.isNotEmpty(fileList.value)) {
            return
        }
        const {href, hrefs, fileInfo, fileInfoList} = this.props

        if (CollUtil.isNotEmpty(fileInfoList)) {
            fileList.value = fileInfoList?.map(i => this.fileInfoToUploadFile(i)) as any
            return
        }
        if (ObjectUtil.isNotEmpty(fileInfo)) {
            fileList.value = [this.fileInfoToUploadFile(fileInfo!)]
            return
        }
        if (CollUtil.isNotEmpty(hrefs)) {
            fileList.value = hrefs?.map(i => this.strToUploadFile(i)) as any
        }
        if (StrUtil.isNotEmpty(href)) {
            fileList.value = [this.strToUploadFile(href)]
        }
    }

    /**
     * 格式化工具: {@link UploadFileInfo} -> {@link UploadUserFile}
     */
    private fileInfoToUploadFile = (fileInfo: UploadFileInfo): UploadUserFile => {
        const {path, size, type, name} = fileInfo
        return {
            size,
            name,
            uid: path,
            url: this.fileService.pathCompletion(path),
            response: fileInfo,
            status: 'success',
        } as UploadUserFile & { uid: string }
    }

    /**
     * 格式化工具: src -> {@link UploadUserFile}
     */
    private strToUploadFile = (s: any): UploadUserFile => ({
        response: {path: s} as UploadFileInfo,
        status: 'success',
        name: s,
        size: 0,
        url: this.fileService.pathCompletion(s),
        uid: s,
    })

}

export type PropType = Readonly<{
    tips?: string
    href?: string
    limit?: number
    hrefs?: Array<String>
    fileInfo?: UploadFileInfo
    fileInfoList?: UploadFileInfo[]
}>

export type EmitType = {
    (event: 'update:href', value: string): void,
    (event: 'update:hrefs', value: Array<string>): void,
    (event: 'update:fileInfo', value: UploadFileInfo): void,
    (event: 'update:fileInfoList', value: Array<UploadFileInfo>): void,
    (event: 'input', value: Array<UploadUserFile>): void
}
