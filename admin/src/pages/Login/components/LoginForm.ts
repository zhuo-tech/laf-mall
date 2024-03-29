import { HOME_PATH } from '@/pages/Home/Router'
import { SysAdminApi } from '@/repository/SysAdminApi'
import { StorageServiceImpl } from '@/service/impl/StorageServiceImpl'
import { StorageLevel, StorageService } from '@/service/StorageService'
import { useUserStore } from '@/store/user'
import { StandardErrorProcess } from '@/util'
import { RuleItem } from 'async-validator'
import { FormInstance, InputInstance } from 'element-plus'
import { reactive, ref, UnwrapNestedRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Login
 * @author 冰凝
 * @date 2022-06-17 下午 12:17
 **/
export class LoginForm {
    private static readonly ROUTER_REDIRECT_PARAM = 'redirect'
    public refs: UnwrapNestedRefs<Record<'username' | 'password' | 'code', InputInstance>> =
        reactive<Record<'username' | 'password' | 'code', InputInstance>>({
            username: null as any,
            password: null as any,
            code: null as any,
        })
    public formData = reactive({
        username: '',
        password: '',
        verificationCode: '',
    })
    public formRule: Record<keyof typeof this.formData, Array<RuleItem>> = {
        username: [ { required: true, type: 'string', message: '请输入用户名', min: 2, max: 128, trigger: 'blur' } ],
        password: [ { required: true, type: 'string', message: '请输入密码', min: 6, max: 128, trigger: 'blur' } ],
        verificationCode: [ { required: false } ],
    }

    public isLoading = ref(false)
    private readonly sysAdminApi: SysAdminApi = new SysAdminApi()
    private readonly storageService: StorageService = new StorageServiceImpl()
    private formRef = ref<FormInstance>({} as any)
    private router = useRouter()
    private route = useRoute()

    public setFormRef = (el: any) => {
        if (el) {
            this.formRef.value = el
        }
    }

    /**
     * 表单登录
     */
    public submit = () => {
        const asyncOperation = async () => {
            const ok = await this.formRef.value.validate?.()
                .catch(err => console.warn(err))
            if (!ok) {
                throw new Error('表单验证失败')
            }

            const res = await this.sysAdminApi.login(this.formData)
            this.storageService.setAttribute('token', res.accessToken, StorageLevel.SESSION)
            useUserStore().init()
            await this.processLoginComplete()
        }

        this.isLoading.value = true
        asyncOperation()
            .catch(StandardErrorProcess)
            .finally(() => this.isLoading.value = false)
    }

    /**
     * 处理登录完成
     */
    private async processLoginComplete() {
        const redirect = this.route.params[LoginForm.ROUTER_REDIRECT_PARAM] ?? this.route.query[LoginForm.ROUTER_REDIRECT_PARAM]
        await this.router.push(redirect as string || HOME_PATH)
    }
}
