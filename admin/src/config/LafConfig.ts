import { BASE_URL, DB_PROXY } from '@/config/Env'
import { StorageServiceImpl } from '@/service/impl/StorageServiceImpl'
import { StorageService } from '@/service/StorageService'
import { StrTool, TimeUnit } from '@es-tool/core'
import { Cloud, EnvironmentType } from 'laf-client-sdk'
import { LafWrapperConfig, LoggerLevel } from 'laf-db-query-wrapper'

export const cloud = new Cloud({
    baseUrl: BASE_URL,
    getAccessToken: () => {
        const service: StorageService = new StorageServiceImpl()
        return service.getAttribute('token') || StrTool.EMPTY
    },
    dbProxyUrl: DB_PROXY,
    timeout: TimeUnit.SECOND.toMillis(30),
    environment: EnvironmentType.H5,
})

/* 包装器 cloud 引用注入 */
LafWrapperConfig.cloud = () => cloud
// 设置 LoggerLevel.TRACE 可以启用 wrapper 层日志
LafWrapperConfig.LoggerFactory.enableLevel = LoggerLevel.TRACE
