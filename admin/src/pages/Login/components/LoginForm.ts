import { HOME_PATH } from '@/pages/Home/Router'
import { SysAdminApi } from '@/repository/SysAdminApi'
import { StorageLevel, StorageService, StorageServiceKey } from '@/service/StorageService'
import { useUserStore } from '@/store/user'
import { RuleItem } from 'async-validator'
import { Inject } from 'common'
import { FormInstance, InputInstance } from 'element-plus'
import { StrTool } from '@es-tool/core'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Login
 * @author 冰凝
 * @date 2022-06-17 下午 12:17
 **/
export class LoginForm {
    private static readonly ROUTER_REDIRECT_PARAM = 'redirect'

    @Inject(SysAdminApi.KEY)
    private get sysAdminApi(): SysAdminApi {
        return null as any
    }

    @Inject(StorageServiceKey)
    private get storageService(): StorageService {
        return null as any
    }

    private formRef = ref<FormInstance>({} as any)

    public setFormRef = (el: any) => {
        if (el) {
            this.formRef.value = el
        }
    }
    public refs = reactive<Record<'username' | 'password' | 'code', InputInstance>>({
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
        username: [{required: true, type: 'string', message: '请输入用户名', min: 2, max: 128, trigger: 'blur'}],
        password: [{required: true, type: 'string', message: '请输入密码', min: 6, max: 128, trigger: 'blur'}],
        verificationCode: [{required: false}],
    }
    public showNext = reactive<Partial<Record<keyof typeof this.formData, boolean>>>({
        username: false,
        password: false,
    })
    public isLoading = ref(false)
    private router = useRouter()
    private route = useRoute()

    public next = (property: keyof typeof this.formData) => {
        if (StrTool.isEmpty(this.formData[property])) {
            return
        }
        if (this.showNext[property]) {
            return
        }
        this.showNext[property] = true
        switch (property) {
            case 'username':
                // noinspection JSIgnoredPromiseFromCall
                this.refs.password?.focus?.()
                break
            case 'password':
                // noinspection JSIgnoredPromiseFromCall
                this.refs.code?.focus?.()
                break
            case 'verificationCode':
                this.submit()
                break
            default:
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
