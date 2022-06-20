/**
 * KeyValue
 * @author 冰凝
 * @date 2022-06-15 下午 10:43 星期三
 */
export class KeyValue<K = string, V = string> {
    public key: K
    public value: V

    constructor(key: K, value: V) {
        this.key = key
        this.value = value
    }
}
