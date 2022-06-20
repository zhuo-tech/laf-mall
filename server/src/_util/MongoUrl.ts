export class MongoUrl {

    private username: string
    private password: string
    private host: string
    private port: string
    /**
     * 数据库名称
     */
    private readonly source: string

    private static hostFormat = new RegExp('^db-(\\S)s(\\d)-(\\S+)-(\\S+).*$')

    constructor(username: string, password: string, host: string, port: string, source: string) {
        this.username = username
        this.password = password
        this.host = host
        this.port = port
        this.source = source
    }

    private get query() {
        return {
            authSource: this.source,
            replicaSet: 'laf',
            writeConcern: 'majority',
            readPreference: 'nearest',
            maxPoolSize: 10,
            directConnection: true,
        }
    }

    public toString(): string {
        const {username, password, host, port, source, query} = this
        const queryStr = Object.keys(query).map(key => (key + '=' + query[key])).join('&')
        return `mongodb://${ username }:${ password }@${ host }:${ port }/${ source }?${ queryStr }`
    }

    public static resolveHost(host: string) {
        const arr = this.hostFormat.exec(host)
        arr!.splice(0, 1)
        return arr!.join('') + '.db.lafyun.com'
    }

    public static directUrl(cloud: any) {
        const option = cloud.mongo.client.options
        const {hosts, credentials} = option
        const first = hosts[0]
        const port = first.port
        const host = MongoUrl.resolveHost(first.host)

        return new MongoUrl(credentials.username, credentials.password, host, port, credentials.source).toString()
    }

}
