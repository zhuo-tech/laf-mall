import { MallConfigRepository } from '@/repository/MallConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { HomePageCarousel, Inject, MallConfig, MallConfigKey } from 'common'

/**
 * Service
 * @author 冰凝
 * @date 2022-06-20 下午 05:53
 **/
export class CarouselService extends BasisCrud<MallConfig> {
    protected readonly request: CrudRequest<MallConfig> = this.repository
    private readonly _key = MallConfigKey.HOMEPAGE_CAROUSEL

    public formRule: Partial<Record<keyof MallConfig, Array<RuleItem>>> = {
        // @ts-ignore
        'value.href': [{type: 'string', required: true, message: '请选择文件上传', trigger: 'blur'}],
    }

    public queryData: Partial<MallConfig> = {key: this._key}

    @Inject(MallConfigRepository.KEY)
    private get repository(): MallConfigRepository {
        return null as any
    }

    protected get formDataDefault(): Partial<MallConfig> {
        const config = new MallConfig()
        config.key = this._key
        const value = new HomePageCarousel()
        value.sort = 1
        config.value = value
        return config
    }
}
