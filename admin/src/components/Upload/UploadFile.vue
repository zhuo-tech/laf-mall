<script lang="tsx" setup>
import ShowImage from '@/components/Show/index.vue'
import ShowFile from '@/components/Show/ShowFile'
import { UploadFileInfo } from '@/service/FileService'
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'
import { UploadFileService } from './UploadFileService'
import { useFilePreview } from './useFilePreview'

/**
 * 对 el-upload 的包装,
 * 绝大部分 props 透传给 el-upload;
 * 参考: {@link UploadProps}
 * 提供四种 v-model:
 * - v-model:href 单URL, string
 * - v-model:hrefs string[]
 * - v-model:fileInfo 单个完整文件信息, {@link UploadFileInfo}
 * - v-model:fileInfos 多个
 *
 * <h3>
 *     不要传递 action, headres, on-success, fileList 等 上传控制属性,
 *     仅可以传递上传样式控制属性, 如: drag, limit, listType 等 参考: {@link UploadProps}
 *</h3>
 * @see https://element-plus.org/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7
 * */
const props = defineProps<{
    tips?: string
    href?: string
    limit?: number
    hrefs?: Array<String>
    fileInfo?: UploadFileInfo
    fileInfoList?: Array<UploadFileInfo>
}>()

const emits = defineEmits<{
    (event: 'update:href', value: string): void
    (event: 'update:hrefs', value: Array<string>): void
    (event: 'update:fileInfo', value: UploadFileInfo): void
    (event: 'update:fileInfoList', value: Array<UploadFileInfo>): void
    (event: 'input', value: Array<UploadUserFile>): void
}>()

const { fileList, upLoadRequest, onRemove, onUploadSuccess, beforeUpload } = new UploadFileService(props, emits)

// 预览
const { isShow, onPreview, file } = useFilePreview()

</script>

<template>
<el-upload
    :before-upload="beforeUpload"
    :file-list="fileList"
    :http-request="upLoadRequest"
    :limit="$attrs.listType ? limit ?? 1 : 2"
    :on-preview="file => onPreview(file)"
    :on-remove="onRemove"
    :on-success="onUploadSuccess"
    class="upload"
    v-bind="$attrs"
>
    <!-- 上传控制区域 -->
    <slot>
        <!-- 拖动上传 -->
        <div v-if="$attrs.drag && $attrs.listType !== 'picture-card'">
            <el-icon class="el-icon--upload">
                <UploadFilled />
            </el-icon>
            <div class="el-upload__text">
                将文件拖放到此处或
                <em>点击上传</em>
            </div>
        </div>
        <!-- 照片墙 -->
        <el-icon v-else-if="$attrs.listType === 'picture-card'">
            <Plus />
        </el-icon>
        <!-- picture: 带缩略图的文件列表 -->
        <div v-else-if="$attrs.listType === 'picture'">
            <el-button type="primary">点击上传</el-button>
        </div>
        <!-- 普通 -->
        <div v-else-if="$attrs.listType === 'text'">
            <el-button type="primary">点击上传</el-button>
        </div>
        <!-- 单张图片上传, 需要: :show-file-list="false" -->
        <div v-else style="width: 150px;height: 150px;">
            <ShowImage v-if="href" :previewSrcList="[]" :src="href" fit="cover" />
            <div v-else class="avatar-control">
                <el-icon class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </div>
        </div>
    </slot>

    <!-- TIPS -->
    <template #tip>
        <div class="el-upload__tip">
            {{ tips || 'jpg/png 小于 500KB 的文件。' }}
        </div>
    </template>

    <!-- 预览弹框 -->
    <el-dialog
        v-model="isShow"
        append-to-body
        close-on-click-modal
        destroy-on-close
        draggable
        lock-scroll
        modal
        width="45%"
    >
        <ShowFile :file="file" />
    </el-dialog>

</el-upload>
</template>

<style lang="sass">
.upload
    width: 100% !important

.avatar-control
    width: 150px
    height: 150px
    border: 1px solid #8a7f7f

.avatar-control i
    display: block
    position: relative
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
