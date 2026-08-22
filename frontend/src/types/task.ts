// [AI assisted - frontend.md #2]
// 型別來源是後端的 OpenAPI 規格：執行 `npm run gen:api` 會從
// http://localhost:8080/v3/api-docs 產生 src/types/api.d.ts。
import type { components } from './api'

/** 直接對應 spec 的原始型別 */
type TaskResponseSchema = components['schemas']['TaskResponse']

// springdoc 在沒有 nullability 標註時，會把 response 的欄位全部產成 optional，
// 但實際回傳一定包含這些欄位（description 沒填時是 null）。
// 這裡收斂成前端實際使用的形狀，避免整份程式碼到處做 non-null 斷言。
export type Task = Required<Omit<TaskResponseSchema, 'description'>> & {
  description: string | null
}

/** 建立／修改任務的請求 body（title 必填由後端 @Valid 驗證） */
export type TaskRequest = components['schemas']['TaskRequest']

// 清單上方的篩選條件（純前端狀態，後端沒有對應參數）
export type TaskFilter = 'all' | 'active' | 'completed'
