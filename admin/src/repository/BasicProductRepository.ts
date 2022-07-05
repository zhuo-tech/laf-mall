import { CrudRequest } from '@/service/CrudRequest'
import { useUserStore } from '@/store/user'
import { BasicProduct } from 'common'
import { LafClient, Page } from 'laf-db-query-wrapper'

/**
 * BasicProductRepository
 * @author 冰凝
 * @date 2022-06-20 下午 05:33
 **/
export class BasicProductRepository implements CrudRequest<BasicProduct> {
    private readonly client = new LafClient<BasicProduct>(BasicProduct.NAME)
    private readonly userStore = useUserStore()

    public createRequest = async (data: Partial<BasicProduct>): Promise<any> => {

    }

    public deleteByIdRequest = async (id: string | number): Promise<any> => {

    }

    public pageRequest = async (page: Page<BasicProduct>, query: Partial<BasicProduct>): Promise<Page<BasicProduct>> => {

        return new Page()
    }

    public updateRequest = async (data: Partial<BasicProduct>): Promise<any> => {

    }

}
