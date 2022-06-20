// noinspection JSUnusedGlobalSymbols

declare module '@/cloud-sdk' {
    import { Cloud } from 'laf-client-sdk'
    export default new Cloud()
}


declare global {
    export type FunctionContext = {
        body: Record<string, any>,
        auth: Record<string, any>,
        method: string,
        query: Record<string, any>
    }
}
