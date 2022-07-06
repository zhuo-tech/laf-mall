import { cloud } from '@/config/LafConfig'
import { CrudRequest } from '@/service/CrudRequest'
import { MallConfig, MallConfigKey, Personal } from 'common'
import { Page } from 'laf-db-query-wrapper'

const DB = cloud.database()

export type PersonalAndId = Personal & { _id: string }

export class PersonalRepository implements CrudRequest<PersonalAndId> {
    public async createRequest(data: Partial<PersonalAndId>): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .add({value: {...data}, key: MallConfigKey.PERSONAL_CENTER})
    }

    public async deleteByIdRequest(id: string | number): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .where({_id: id})
            .remove()
    }

    public async pageRequest(page: Page<PersonalAndId>, query: Partial<PersonalAndId>): Promise<Page<PersonalAndId>> {
        const andIdPage = new Page<PersonalAndId>(page.currentPage, page.pageSize)

        const whereFlag = {
            key: MallConfigKey.PERSONAL_CENTER,
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
        andIdPage.total = totalRes.total
        andIdPage.list = pageRes.data.map(item => ({...<Personal>item.value, _id: item._id}))

        return andIdPage
    }

    public async updateRequest(data: Partial<PersonalAndId>): Promise<any> {
        const {_id, status, name, sort, pcIcon, uniIcon, uniUrl, pcUrl} = data
        return await DB.collection(MallConfig.NAME)
            .where({_id})
            .update({
                value: {status, name, sort, pcIcon, uniIcon, uniUrl, pcUrl},
                updateTime: Date.now(),
            })
    }
}
