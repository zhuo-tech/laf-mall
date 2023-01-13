/**
 * @see https://cn.vitejs.dev/config/#envprefix
 */
const ENV = import.meta.env

/**
 * 额外转换一层, 避免其他位置直接依赖 ENV 属性 key
 */
export const BASE_URL = ENV.VITE_LAF_BASE_URL
export const DB_PROXY = ENV.VITE_LAF_DB_PROXY
export const FILE_URL = ENV.VITE_LAF_FILE
