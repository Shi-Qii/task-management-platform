// [AI assisted - frontend.md #3] axios instance + 錯誤攔截，統一轉成 ApiError
import axios, { AxiosError } from 'axios'
import { ApiError, messageFromSpringError, type SpringErrorBody } from './errors'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<SpringErrorBody>) => {
    if (error.response) {
      const { status, data } = error.response
      const fallback = status === 404 ? '找不到這筆任務' : `請求失敗（HTTP ${status}）`
      return Promise.reject(
        new ApiError(messageFromSpringError(data, fallback), status, data?.errors ?? []),
      )
    }
    // 連不上後端（後端沒啟動、CORS 被擋、逾時）
    return Promise.reject(new ApiError('連不到後端伺服器，請確認 http://localhost:8080 已啟動', 0))
  },
)
