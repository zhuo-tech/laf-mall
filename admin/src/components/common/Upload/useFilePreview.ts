import { UploadFileInfo } from '@/service/FileService'
import { ObjectTool } from '@es-tool/core'
import { UploadProps } from 'element-plus'
import { ref, Ref } from 'vue'

export type FilePreviewReturn = {
    onPreview: UploadProps['onPreview']
    isShow: Ref<boolean>
    file: Ref<UploadFileInfo>
    show(): void
    close(): void
}

/**
 * useFilePreview
 * @author LL
 * @date 2022-04-25 上午 12:40
 **/
export function useFilePreview(intiValue: UploadFileInfo = {} as any): FilePreviewReturn {
    const isShow = ref(false)
    const file = ref(intiValue)

    const show = () => isShow.value = true
    const close = () => isShow.value = false
    return {
        isShow,
        file,
        show,
        close,
        onPreview(f) {
            if (ObjectTool.isEmpty(f)) {
                return
            }
            file.value = f.response as UploadFileInfo
            show()
        },
    }
}
