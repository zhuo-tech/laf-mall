import { FileService, UploadFileInfo } from '@/service/FileService'
import { LafOssFileServiceImpl } from '@/service/impl/LafOssFileServiceImpl'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ObjectTool, StrTool } from '@es-tool/core'
import { defineComponent } from 'vue'

/**
 * 兼容多种类型的文件展示
 * @inject {@link FileService}
 */
export default defineComponent({
    name: 'ShowFile',
    props: {
        file: {
            type: Object,
            required: false,
        },
        href: {
            type: String,
            required: false,
        },
        hrefType: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            fileService: new LafOssFileServiceImpl(),
            previewIsShow: false,
        }
    },
    methods: {
        renderImage(src: string) {
            const imageSlots = {
                error: () => (
                    <div class="image-slot">
                        <el-icon><IconPicture /></el-icon>
                    </div>
                ),
            }
            // props 穿透最后添加, 确保 previewSrcList 还能关闭
            return (
                <el-image src={ src } v-slots={ imageSlots } previewSrcList={ [ src ] } preview-teleported { ...this.$attrs }></el-image>
            )
        },

        renderVideo(src: string) {
            return (
                <span>
                    <el-icon onClick={ () => this.previewIsShow = true } size={ 50 }>
                        <video-play />
                    </el-icon>
                    <el-dialog
                        v-model={ this.previewIsShow }
                        append-to-body
                        close-on-click-modal
                        destroy-on-close
                        draggable
                        lock-scroll
                        modal
                        width="50%"
                    >
                        <video style={ { minHeight: '500px' } } src={ src } controls autoplay { ...this.$attrs } ></video>
                    </el-dialog>
                </span>
            )
        },

        renderAudio(src: string) {
            if (this.previewIsShow) {
                return this.previewIsShow && <audio src={ src } controls { ...this.$attrs } ></audio>
            } else {
                return (
                    <el-icon onClick={ () => this.previewIsShow = true } size={ 50 }>
                        <headset />
                    </el-icon>
                )
            }
        },

        renderByType(src: string, type: string) {
            if (!src) {
                console.debug('地址不存在 src = ', src)
                return <span></span>
            }
            src = this.fileService.pathCompletion(src)
            // 图片
            if (new RegExp('^image/\\S+$').test(type)) {
                return this.renderImage(src)
            }
            if (new RegExp('^video/\\S+$').test(type)) {
                return this.renderVideo(src)
            }
            if (new RegExp('^audio/\\S+$').test(type)) {
                return this.renderAudio(src)
            }

            return (
                <span>
                    不支持的类型 { type }
                </span>
            )
        },
    },
    render() {
        const { file, href, hrefType } = this.$props
        if (StrTool.isNotEmpty(href)) {
            return this.renderByType(href as string, hrefType)
        }

        const f: UploadFileInfo = file as any
        if (ObjectTool.isNotEmpty(f)) {
            return this.renderByType(f.path, f.type)
        }

        return <span></span>
    },
})
