import { RuleItem } from 'async-validator'
import { MallActivityBargain } from 'common'
import { FormInstance } from 'element-plus'
import { computed, reactive, ref, UnwrapNestedRefs } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * BargainEditorService
 * @author 冰凝
 * @date 2022-07-11 11:49:05
 **/
export class BargainEditorService {
    public formIsLoading = ref(false)
    public formData: UnwrapNestedRefs<MallActivityBargain> = reactive(new MallActivityBargain())
    public formRule: Partial<Record<keyof MallActivityBargain, Array<RuleItem> | RuleItem>> = {
        title: { type: 'string', len: 32, required: true, message: '不能为空', trigger: 'blur' },
        cover: { type: 'string', required: true, message: '不能为空', trigger: 'blur' },
        desc: { type: 'string', len: 500, required: true, message: '不能为空, 最大500字符', trigger: 'blur' },
        detail: { type: 'string', len: 3000, required: true, message: '不能为空, 最大3000字符', trigger: 'blur' },
        rule: {},
        ads: {},
        carousel: {},
        productId: {},
        frequency: {},
        repeatable: {},
        start: { type: 'number', min: 0, required: true, message: '请选择', trigger: 'blur' },
        stop: { type: 'number', min: 0, required: true, message: '请选择', trigger: 'blur' },
        info: {},
        sort: {},
    }
    private readonly route: RouteLocationNormalizedLoaded
    private currentId = computed(() => <string>this.route.params?.['id'])
    private isEditor = computed(() => !!this.currentId.value)
    private formRef = ref<FormInstance>({} as any)

    constructor(route: RouteLocationNormalizedLoaded) {
        this.route = route
    }

    public setFormRef = (el: any) => {
        if (el) {
            this.formRef.value = el
        }
    }

}
