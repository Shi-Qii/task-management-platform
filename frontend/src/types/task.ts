// [AI assisted - frontend.md #2]
// 型別完全來自後端的 OpenAPI 規格：執行 `npm run gen:api` 會從
// http://localhost:8080/v3/api-docs 產生 src/types/api.d.ts。
import type { components } from './api'

/** 任務（後端 TaskResponse；description 沒填時後端回 null） */
export type Task = components['schemas']['TaskResponse']

/** 建立／修改任務的請求 body（title 必填，由後端 @Valid 驗證） */
export type TaskRequest = components['schemas']['TaskRequest']

// 清單上方的篩選條件（純前端狀態，後端沒有對應參數）
export type TaskFilter = 'all' | 'active' | 'completed'
