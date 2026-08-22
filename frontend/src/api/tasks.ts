// [AI assisted - frontend.md #4]
// 單一進入點：用 VITE_USE_MOCK 決定資料來源，元件與 store 只認這個 taskApi。
import { mockTaskApi } from './tasks.mock'
import { realTaskApi } from './tasks.real'
import type { TaskApi } from './types'

export const usingMock = import.meta.env.VITE_USE_MOCK === 'true'

export const taskApi: TaskApi = usingMock ? mockTaskApi : realTaskApi

export type { TaskApi }
