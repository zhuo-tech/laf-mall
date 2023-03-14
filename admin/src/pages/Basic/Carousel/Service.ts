import { UniversalConfigRepository } from '@/repository/UniversalConfigRepository'
import BasisCrud from '@/service/BasisCrud'
import { CrudRequest } from '@/service/CrudRequest'
import { RuleItem } from 'async-validator'
import { Entity, HomePageCarousel, MallConfigKey } from 'common'

type HomePageCarouselAndId = HomePageCarousel & Entity

/**
 * Service
 * @author 冰凝
 * @date 2022-06-20 下午 05:53
 **/
export class CarouselService extends BasisCrud<HomePageCarouselAndId> {
    public override formRule: Partial<Record<keyof HomePageCarouselAndId, Array<RuleItem>>> = {
        href: [ { type: 'string', required: true, message: '请选择文件上传', trigger: 'blur' } ],
    }
    protected override readonly request: CrudRequest<HomePageCarouselAndId> = new UniversalConfigRepository(MallConfigKey.HOMEPAGE_CAROUSEL)

    protected override get formDataDefault(): Partial<HomePageCarouselAndId> {
        const value = new HomePageCarousel()
        value.sort = 1
        return value
    }
}
