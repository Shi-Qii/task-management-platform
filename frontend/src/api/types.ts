// [AI assisted - frontend.md #4] mock 與真實實作共用的介面，讓上層元件感覺不到差別
import type { Task, TaskRequest } from '../types/task'

export interface TaskApi {
  list(): Promise<Task[]>
  get(id: number): Promise<Task>
  create(payload: TaskRequest): Promise<Task>
  update(id: number, payload: TaskRequest): Promise<Task>
  toggle(id: number): Promise<Task>
  remove(id: number): Promise<void>
}
