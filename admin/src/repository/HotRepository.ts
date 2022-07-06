import { cloud } from '@/config/LafConfig'
import { CrudRequest } from '@/service/CrudRequest'
import { Hot, MallConfig, MallConfigKey } from 'common'
import { Page } from 'laf-db-query-wrapper'

const DB = cloud.database()

export type HotAndId = Hot & { _id: string }

export class HotRepository implements CrudRequest<HotAndId> {
    public async createRequest(data: Partial<HotAndId>): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .add({value: {...data}, key: MallConfigKey.HOMEPAGE_HOT})
    }

    public async deleteByIdRequest(id: string | number): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .where({_id: id})
            .remove()
    }

    public async pageRequest(page: Page<HotAndId>, query: Partial<HotAndId>): Promise<Page<HotAndId>> {
        const andIdPage = new Page<HotAndId>(page.currentPage, page.pageSize)

        const whereFlag = {
            key: MallConfigKey.HOMEPAGE_HOT,
        }
        const totalRes = await DB.collection(MallConfig.NAME)
            .where(whereFlag)
            .count()
        if (totalRes.total <= 0) {

            return andIdPage
        }
        const pageRes = await DB.collection(MallConfig.NAME)
            .where(whereFlag)
            .page({
                current: page.currentPage,
                size: page.pageSize,
            })
            .orderBy('sort', 'desc')
            .get<MallConfig>()
        andIdPage.list = pageRes.data.map(item => ({...<Hot>item.value, _id: item._id}))
        andIdPage.total = totalRes.total

        return andIdPage
    }

    public async updateRequest(data: Partial<HotAndId>): Promise<any> {
        const {_id, status, tag, sort} = data
        return await DB.collection(MallConfig.NAME)
            .where({_id})
            .update({
                value: {tag, status, sort},
                updateTime: Date.now(),
            })
    }
}
