import { cloud } from '@/config/LafConfig'
import { CrudRequest } from '@/service/CrudRequest'
import { MallConfig } from 'common'
import { Page } from 'laf-db-query-wrapper'

const DB = cloud.database()

export class ConfigRepository<E> implements CrudRequest<E & { _id: string }> {
    public MainName: string

    constructor(props: string) {
        this.MainName = props
    }

    public createRequest = async (data: Partial<E & { _id: string }>): Promise<any> => {
        console.log('mainName====>>>>', this)
        return await DB.collection(MallConfig.NAME)
            .add({value: {...data}, key: this.MainName})
    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {
        return await DB.collection(MallConfig.NAME)
            .where({_id: id})
            .remove()
    }

    public pageRequest = async (page: Page<E & { _id: string }>, query: Partial<E & { _id: string }>): Promise<Page<E & { _id: string }>> => {
        const andIdPage = new Page<E & { _id: string }>(page.currentPage, page.pageSize)

        const whereFlag = {
            key: this.MainName,
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
            .get<MallConfig>()

        andIdPage.total = totalRes.total
        andIdPage.list = pageRes.data.map(item => ({...item.value, _id: item._id} as any)).sort((a, b) => (a.sort - b.sort))
        console.log('pageRes=====>', pageRes)
        console.log('andIdPage=====>', andIdPage.list)

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
