// [AI assisted - frontend.md #6]
// 所有 API 呼叫與畫面狀態都收在這裡，元件只跟 store 溝通、不直接碰 axios。
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { taskApi } from '../api/tasks'
import { ApiError } from '../api/errors'
import type { Task, TaskFilter, TaskRequest } from '../types/task'

function toMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.message
  return err instanceof Error ? err.message : fallback
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const saving = ref(false)
  /** 正在切換完成狀態或刪除中的任務 id，用來鎖住該列的按鈕 */
  const busyIds = ref<Set<number>>(new Set())
  const error = ref<string | null>(null)
  const filter = ref<TaskFilter>('all')

  const visibleTasks = computed(() => {
    if (filter.value === 'active') return tasks.value.filter((t) => !t.completed)
    if (filter.value === 'completed') return tasks.value.filter((t) => t.completed)
    return tasks.value
  })

  const activeCount = computed(() => tasks.value.filter((t) => !t.completed).length)
  const completedCount = computed(() => tasks.value.filter((t) => t.completed).length)

  function isBusy(id: number) {
    return busyIds.value.has(id)
  }

  function setBusy(id: number, busy: boolean) {
    const next = new Set(busyIds.value)
    busy ? next.add(id) : next.delete(id)
    busyIds.value = next
  }

  /** 用後端回傳的最新資料覆蓋該列（不做樂觀更新，避免前後端狀態不一致） */
  function replace(updated: Task) {
    tasks.value = tasks.value.map((t) => (t.id === updated.id ? updated : t))
  }

  function clearError() {
    error.value = null
  }

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      tasks.value = await taskApi.list()
    } catch (err) {
      error.value = toMessage(err, '載入任務清單失敗')
    } finally {
      loading.value = false
    }
  }

  async function createTask(payload: TaskRequest): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      tasks.value = [...tasks.value, await taskApi.create(payload)]
      return true
    } catch (err) {
      error.value = toMessage(err, '建立任務失敗')
      return false
    } finally {
      saving.value = false
    }
  }

  async function updateTask(id: number, payload: TaskRequest): Promise<boolean> {
    saving.value = true
    error.value = null
    try {
      replace(await taskApi.update(id, payload))
      return true
    } catch (err) {
      error.value = toMessage(err, '更新任務失敗')
      return false
    } finally {
      saving.value = false
    }
  }

  async function toggleTask(id: number) {
    setBusy(id, true)
    error.value = null
    try {
      replace(await taskApi.toggle(id))
    } catch (err) {
      error.value = toMessage(err, '切換完成狀態失敗')
    } finally {
      setBusy(id, false)
    }
  }

  async function removeTask(id: number): Promise<boolean> {
    setBusy(id, true)
    error.value = null
    try {
      await taskApi.remove(id)
      tasks.value = tasks.value.filter((t) => t.id !== id)
      return true
    } catch (err) {
      error.value = toMessage(err, '刪除任務失敗')
      return false
    } finally {
      setBusy(id, false)
    }
  }

  return {
    tasks,
    loading,
    saving,
    error,
    filter,
    visibleTasks,
    activeCount,
    completedCount,
    isBusy,
    clearError,
    fetchAll,
    createTask,
    updateTask,
    toggleTask,
    removeTask,
  }
})
