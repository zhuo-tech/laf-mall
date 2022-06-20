import { MongoUrl } from '@/_util/MongoUrl'
import cloud from '@/cloud-sdk'

// @ts-ignore
exports.main = async function (ctx: FunctionContext) {
    console.log('数据库直连URL: ', MongoUrl.directUrl(cloud))

    return '初始化完成'
}
