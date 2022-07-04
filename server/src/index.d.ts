// noinspection JSUnusedGlobalSymbols

declare module '@/cloud-sdk' {
    import { Cloud } from 'laf-client-sdk'
    const cloud = new Cloud()
    export default cloud as typeof cloud & { env: Record<string, string> }
}


declare global {
    export type FunctionContext = {
        body: Record<string, any>,
        auth: Record<string, any>,
        method: string,
        query: Record<string, any>
    }
}
