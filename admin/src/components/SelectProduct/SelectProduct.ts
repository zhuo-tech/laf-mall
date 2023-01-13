import { BasicProductRepository } from '@/repository/BasicProductRepository'
import { BasicProduct, Inject } from 'common'
import { Page } from 'laf-db-query-wrapper'
import { ObjectTool } from '@es-tool/core'
import { ExtractPropTypes, reactive, ref, Ref, watch } from 'vue'

/**
 * SelectProduct
 * @author 冰凝
 * @date 2022-07-08 下午 03:27
 **/
export class SelectProduct {
    private readonly props: PropsType
    private readonly emits: EmitsType

    public pageIsLoading: Ref<boolean> = ref(false)
    public page = reactive<Page<BasicProduct>>(new Page(1, 20))
    public queryData = reactive<Partial<BasicProduct>>({})

    public isShow: Ref<boolean> = ref(false)
    public show = () => this.isShow.value = true
    public close = () => this.isShow.value = false

    public echoIsLoading = ref(false)
    public currentSelect = ref<BasicProduct | null>(null)

    @Inject(BasicProductRepository.KEY)
    private get productRepository(): BasicProductRepository {
        return null as any
    }

    constructor(props: PropsType, emits: EmitsType) {
        this.props = props
        this.emits = emits

        watch(() => this.page.pageSize, this.listUpdate, {deep: true})
        watch(() => this.page.currentPage, this.listUpdate, {deep: true})

        this.handleEcho()
        this.listUpdate()
    }

    private handleEcho() {
        if (ObjectTool.isNotEmpty(this.props.product)) {
            this.currentSelect.value = this.props.product as any
            return
        }

        const productId = this.props.value
        // 商品ID存在
        if (productId) {
            this.echoIsLoading.value = true
            this.productRepository.detail(productId, false)
                .then(detail => this.currentSelect.value = detail)
                .finally(() => this.echoIsLoading.value = false)
        }
    }

    private listUpdate = () => {
        this.pageIsLoading.value = true

        // TODO: 可以更换一个有限的列查询, 节省流量
        this.productRepository.pageRequest(this.page as any, this.queryData)
            .then(({list, total}) => Object.assign(this.page, {list, total}))
            .finally(() => this.pageIsLoading.value = false)
    }

    public queryFormSubmit = () => this.listUpdate()

    public select = (product: BasicProduct) => {
        this.currentSelect.value = product

        this.emits('update', product?._id)
        this.emits('update:value', product?._id)
        this.emits('update:product', product)

        this.close()
    }

}

type PropsType = Readonly<ExtractPropTypes<{
    value: { type: StringConstructor, default: string },
    product: { type: (ObjectConstructor | typeof BasicProduct)[], default: () => {} }
}>>

type EmitsType = {
    (event: 'update', productId: string): void,
    (event: 'update:value', productId: string): void,
    (event: 'update:product', product: BasicProduct): void
}
