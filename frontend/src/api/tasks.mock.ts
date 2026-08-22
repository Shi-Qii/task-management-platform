// [AI assisted - frontend.md #5]
// 後端還沒跑起來時用的假資料來源，行為（含 404 / 400 錯誤）比照後端規格，
// 這樣切回真實 API 時上層完全不用改。
import { ApiError } from './errors'
import type { Task, TaskRequest } from '../types/task'
import type { TaskApi } from './types'

const LATENCY_MS = 250

let seq = 3
let store: Task[] = [
  {
    id: 1,
    title: '完成全端面試作業',
    description: 'Spring Boot 3 + Vue 3，API 用 OpenAPI 規格定義',
    completed: false,
    createdAt: '2026-08-20T09:12:00',
    updatedAt: '2026-08-20T09:12:00',
  },
  {
    id: 2,
    title: '整理 README 與領域模型說明',
    description: null,
    completed: false,
    createdAt: '2026-08-21T14:03:00',
    updatedAt: '2026-08-21T14:03:00',
  },
  {
    id: 3,
    title: '建立專案 GitHub repository',
    description: 'monorepo：/backend 與 /frontend',
    completed: true,
    createdAt: '2026-08-19T20:41:00',
    updatedAt: '2026-08-21T08:55:00',
  },
]

const delay = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS))
const clone = (task: Task): Task => ({ ...task })
const now = () => new Date().toISOString().slice(0, 19)

function findOr404(id: number): Task {
  const task = store.find((t) => t.id === id)
  if (!task) throw new ApiError(`Task not found with id: ${id}`, 404)
  return task
}

/** 模擬後端 @Valid：title 為必填且不可空白 */
function validate(payload: TaskRequest): void {
  if (!payload.title?.trim()) {
    throw new ApiError('title is required', 400, [
      { field: 'title', defaultMessage: 'title is required' },
    ])
  }
}

export const mockTaskApi: TaskApi = {
  async list() {
    await delay()
    return store.map(clone)
  },
  async get(id) {
    await delay()
    return clone(findOr404(id))
  },
  async create(payload) {
    await delay()
    validate(payload)
    const timestamp = now()
    const task: Task = {
      id: ++seq,
      title: payload.title.trim(),
      description: payload.description?.trim() || null,
      completed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    store = [...store, task]
    return clone(task)
  },
  async update(id, payload) {
    await delay()
    validate(payload)
    const task = findOr404(id)
    task.title = payload.title.trim()
    task.description = payload.description?.trim() || null
    task.updatedAt = now()
    return clone(task)
  },
  async toggle(id) {
    await delay()
    const task = findOr404(id)
    task.completed = !task.completed
    task.updatedAt = now()
    return clone(task)
  },
  async remove(id) {
    await delay()
    findOr404(id)
    store = store.filter((t) => t.id !== id)
  },
}
