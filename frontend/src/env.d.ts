/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 後端 base URL，預設 http://localhost:8080 */
  readonly VITE_API_BASE_URL?: string
  /** 設為 'true' 時使用前端假資料，不打後端 */
  readonly VITE_USE_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
