import { LAF } from '@/config/Env'
import { StorageService, StorageServiceKey } from '@/service/StorageService'
import { Context } from 'common'
import { Cloud, EnvironmentType } from 'laf-client-sdk'
import { LafWrapperConfig, LoggerLevel } from 'laf-db-query-wrapper'

export const cloud = new Cloud({
    baseUrl: LAF.BASE_URL,
    getAccessToken: () => {
        const service: StorageService = Context.getBean(StorageServiceKey)
        return service.getAttribute('token') || ''
    },
    dbProxyUrl: LAF.DB_PROXY,
    timeout: 1000 * 5,
    environment: EnvironmentType.H5,
})

/* 包装器 cloud 引用注入 */
LafWrapperConfig.cloud = () => cloud
// 设置 LoggerLevel.TRACE 可以启用 wrapper 层日志
LafWrapperConfig.LoggerFactory.enableLevel = LoggerLevel.WARN
