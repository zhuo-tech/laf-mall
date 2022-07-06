import { cloud } from '@/config/LafConfig'
import { CrudRequest } from '@/service/CrudRequest'
import { MallConfig, MallConfigKey, Menu } from 'common'
import { Page } from 'laf-db-query-wrapper'

const DB = cloud.database()

export class MenuRepository implements CrudRequest<Menu> {
    public async createRequest(data: Partial<Menu>): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .add({value: {...data}, key: MallConfigKey.HOMEPAGE_MENU})
    }

    public async deleteByIdRequest(id: string | number): Promise<any> {
        return await DB.collection(MallConfig.NAME)
            .where({_id: id})
            .remove()
    }

    public async pageRequest(page: Page<Menu>, query: Partial<Menu>): Promise<Page<Menu>> {
        const andIdPage = new Page<Menu>(page.currentPage, page.pageSize)
        const whereFlag = {
            key: MallConfigKey.HOMEPAGE_MENU,
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
            .get()
        andIdPage.list = pageRes.data.map(item => ({...item.value, _id: item._id}))
        andIdPage.total = totalRes.total

        return andIdPage
    }

    public updateRequest(data: Partial<Menu>): Promise<any> {
        return Promise.resolve(undefined)
    }
}
