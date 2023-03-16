import { FileService } from '@/service/FileService'
import { LafOssFileServiceImpl } from '@/service/impl/LafOssFileServiceImpl'
import { computed } from '@vue/runtime-core'

type PropType = { src?: string | Array<string> }

/**
 * ShowImage
 * @author 冰凝
 * @date 2022-06-15 下午 9:50 星期三
 */
export class ShowImage {
    private static readonly ABSOLUTE_ADDRESS = new RegExp('^(http://|https://)(.+/)*.+\\.\\S{1,5}')
    private prop: Readonly<PropType>
    public srcArr = computed(() => ShowImage.preprocessing(this.prop.src).map(i => this.hrefFilter(i)))
    private readonly fileService: FileService = new LafOssFileServiceImpl()

    constructor(prop: Readonly<PropType>) {
        this.prop = prop
    }

    /**
     * props 类型预处理
     */
    private static preprocessing(src: PropType['src']): Array<string> {
        if (!src) {
            return []
        }
        if (typeof src === 'string') {
            return [ src ]
        }
        if (Array.isArray(src)) {
            return src
        }
        console.warn('ShowImage 非法的 props src', src)
        return []
    }

    private hrefFilter(src: string) {
        if (!src) {
            return ''
        }
        if (ShowImage.ABSOLUTE_ADDRESS.test(src)) {
            return src
        }
        return this.fileService.pathCompletion(src)
    }

}
