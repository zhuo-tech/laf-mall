
import { Cloud, EnvironmentType, UniRequest } from 'laf-client-sdk'
import { API_BASE_URL } from '../config'
import { getToken } from '../utils'

export const cloud = new Cloud({
  baseUrl: API_BASE_URL,
  entryUrl: '/proxy/app',
  getAccessToken: getToken as any 
})

