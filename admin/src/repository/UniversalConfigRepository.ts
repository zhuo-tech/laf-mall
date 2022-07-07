import { cloud } from '@/config/LafConfig'
import { CrudRequest } from '@/service/CrudRequest'
import { MallConfig, MallConfigKey } from 'common'
import { Page } from 'laf-db-query-wrapper'

const DB = cloud.database()

export class UniversalConfigRepository<E> implements CrudRequest<E & { _id: string }> {
    /**
     * @see MallConfig.key
     */
    private readonly key: MallConfigKey

    constructor(props: MallConfigKey) {
        this.key = props
    }

    public createRequest = async (data: Partial<E & { _id: string }>): Promise<any> => {
        return await DB.collection(MallConfig.NAME)
            .add({
                key: this.key,
                value: {...data},
                createTime: Date.now(),
                updateTime: Date.now(),
            })
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await DB.collection(MallConfig.NAME)
            .where({_id: id})
            .remove()
    }

    // noinspection JSUnusedLocalSymbols
    public pageRequest = async (page: Page<E & { _id: string }>, query: Partial<E & { _id: string }>): Promise<Page<E & { _id: string }>> => {
        const andIdPage = new Page<E & { _id: string }>(page.currentPage, page.pageSize)

        const whereFlag = {
            key: this.key,
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
            .orderBy('createTime', 'desc')
            .orderBy('updateTime', 'desc')
            .get<MallConfig>()

        andIdPage.total = totalRes.total
        andIdPage.list = pageRes.data
            .map(item => ({...item.value, _id: item._id} as any))
            .sort((a, b) => (a.sort - b.sort))

        return andIdPage
    }

    public updateRequest = async (data: Partial<E & { _id: string }>): Promise<any> => {
        const _id = data._id
        delete data._id
        return await DB.collection(MallConfig.NAME)
            .where({_id})
            .update({
                value: data,
                updateTime: Date.now(),
            })
    }
}
