// [AI assisted - frontend.md #4] 對接真實後端的實作
import { http } from './http'
import type { Task, TaskRequest } from '../types/task'
import type { TaskApi } from './types'

export const realTaskApi: TaskApi = {
  async list() {
    const { data } = await http.get<Task[]>('/api/tasks')
    return data
  },
  async get(id) {
    const { data } = await http.get<Task>(`/api/tasks/${id}`)
    return data
  },
  async create(payload: TaskRequest) {
    const { data } = await http.post<Task>('/api/tasks', payload)
    return data
  },
  async update(id, payload: TaskRequest) {
    const { data } = await http.put<Task>(`/api/tasks/${id}`, payload)
    return data
  },
  async toggle(id) {
    const { data } = await http.patch<Task>(`/api/tasks/${id}/toggle`)
    return data
  },
  async remove(id) {
    await http.delete(`/api/tasks/${id}`)
  },
}
