import { FileService } from '@/service/FileService'
import { LafOssFileServiceImpl } from '@/service/impl/LafOssFileServiceImpl'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { ElMessage } from 'element-plus'
import { ExtractPropTypes, onBeforeUnmount, ref, shallowRef, watch } from 'vue'

/**
 * RichTextEditor
 * @author 冰凝
 * @date 2022-07-08 上午 11:37
 **/
export class RichTextEditor {
    public readonly mode: 'default' | 'simple' = 'default'
    /**
     * 编辑器实例，必须用 shallowRef
     */
    public editorRef = shallowRef<IDomEditor>()
    public htmlValue = ref('')
    /**
     * @see https://www.wangeditor.com/v5/toolbar-config.html
     */
    public toolbarConfig: Partial<IToolbarConfig> = {
        // modalAppendToBody: true,
    }
    /**
     * @see https://www.wangeditor.com/v5/editor-config.html
     * @see https://www.wangeditor.com/v5/menu-config.html
     */
    public editorConfig: Partial<IEditorConfig>
    private readonly props: PropsType
    private readonly emits: EmitsType
    private readonly fileService: FileService = new LafOssFileServiceImpl()

    constructor(props: PropsType, emits: EmitsType) {
        this.props = props
        this.emits = emits

        this.editorConfig = {
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            readOnly: this.props.readonly,
            scroll: true,
            autoFocus: true,
        }

        // 文件上传
        this.editorConfig.MENU_CONF = {
            uploadImage: { customUpload: this.customUpload },
            uploadVideo: { customUpload: this.customUpload },
        }
        // 自定义 Alert
        this.editorConfig.customAlert = this.customAlert

        // 迟到的回显: 组件已经创建之后, 外部需要替换数据
        watch(() => this.props.value, () => this.htmlValue.value = this.props.value)
        onBeforeUnmount(() => this.editorRef.value?.destroy?.())
    }

    public handleCreated = (editor: IDomEditor) => {
        this.editorRef.value = editor
        // 静态默认值
        this.echo()
    }

    public onChange = (editor: IDomEditor) => this.emits('update:value', editor.getHtml())

    public onMaxLength = (editor: IDomEditor) => {
        console.debug('onMaxLength: ', editor.getHtml())
    }

    // noinspection JSUnusedLocalSymbols
    public onFocus = (editor: IDomEditor) => {
        console.debug('编辑器获得焦点')
    }

    // noinspection JSUnusedLocalSymbols
    public onBlur = (editor: IDomEditor) => {
        console.debug('编辑器失去焦点')
    }

    /**
     * 自定义上传
     * @see https://www.wangeditor.com/v5/menu-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%9F%E8%83%BD
     * @see https://www.wangeditor.com/v5/menu-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%9F%E8%83%BD-1
     */
    private customUpload = async (file: File, insertFn: InsertFnType) => {
        const info = await this.fileService.upload(file)
        const url = this.fileService.pathCompletion(info.path)

        insertFn(url, info.name, info.path)
    }

    /**
     * @see https://www.wangeditor.com/v5/editor-config.html#customalert
     */
    private customAlert: IEditorConfig['customAlert'] = (info, type) => {
        switch (type) {
            case 'info':
                ElMessage.info(info)
                break
            case 'success':
                ElMessage.success(info)
                break
            case 'warning':
                ElMessage.warning(info)
                break
            case 'error':
                ElMessage.error(info)
                break
            default:
                ElMessage.info(info)
        }
    }

    /**
     * 默认值 / 回显
     */
    private echo() {
        this.editorRef.value!.setHtml(this.props.value)
    }
}

type EmitsType = (event: 'update:value', value: string) => void

type PropsType = Readonly<ExtractPropTypes<{
    value: {
        type: StringConstructor,
        default: string
    },
    height: {
        type: StringConstructor,
        default: string
    },
    placeholder: {
        type: StringConstructor,
        default: string
    },
    maxLength: {
        type: NumberConstructor,
        default: number
    },
    readonly: {
        type: BooleanConstructor,
    }
}>>

type InsertFnType = (url: string, alt: string, href: string) => void
