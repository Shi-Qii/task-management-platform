<script setup lang="ts">
// [AI assisted - frontend.md #7] 主畫面：清單 + 篩選 + 新增/編輯/刪除的流程串接
import { onMounted, ref } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskFormDialog from './components/TaskFormDialog.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import { usingMock } from './api/tasks'
import { useTaskStore } from './stores/tasks'
import type { Task, TaskRequest } from './types/task'

const store = useTaskStore()

const formOpen = ref(false)
const editingTask = ref<Task | null>(null)

const confirmOpen = ref(false)
const deletingTask = ref<Task | null>(null)
const deleting = ref(false)

onMounted(store.fetchAll)

function openCreate() {
  editingTask.value = null
  formOpen.value = true
}

function openEdit(task: Task) {
  editingTask.value = task
  formOpen.value = true
}

async function submitForm(payload: TaskRequest) {
  const target = editingTask.value
  const ok = target
    ? await store.updateTask(target.id, payload)
    : await store.createTask(payload)
  // 失敗時保持 dialog 開著，讓使用者可以修正後重送
  if (ok) formOpen.value = false
}

function openDelete(task: Task) {
  deletingTask.value = task
  confirmOpen.value = true
}

async function confirmDelete() {
  const target = deletingTask.value
  if (!target) return
  deleting.value = true
  const ok = await store.removeTask(target.id)
  deleting.value = false
  if (ok) confirmOpen.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-title>任務管理</v-app-bar-title>
      <template #append>
        <v-chip v-if="usingMock" color="white" variant="outlined" size="small">
          Mock 資料模式
        </v-chip>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8" style="max-width: 880px">
        <div class="d-flex align-center justify-space-between mb-4">
          <v-btn-toggle
            v-model="store.filter"
            mandatory
            density="comfortable"
            variant="outlined"
            divided
          >
            <v-btn value="all">全部（{{ store.tasks.length }}）</v-btn>
            <v-btn value="active">未完成（{{ store.activeCount }}）</v-btn>
            <v-btn value="completed">已完成（{{ store.completedCount }}）</v-btn>
          </v-btn-toggle>

          <div class="d-flex ga-2">
            <v-btn
              variant="text"
              prepend-icon="mdi-refresh"
              :loading="store.loading"
              @click="store.fetchAll()"
            >
              重新整理
            </v-btn>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">
              新增任務
            </v-btn>
          </div>
        </div>

        <v-card flat border rounded="lg">
          <v-skeleton-loader v-if="store.loading" type="list-item-two-line@3" />

          <v-empty-state
            v-else-if="store.visibleTasks.length === 0"
            icon="mdi-clipboard-text-outline"
            :title="store.tasks.length === 0 ? '還沒有任何任務' : '這個篩選條件下沒有任務'"
            :text="
              store.tasks.length === 0
                ? '點右上角的「新增任務」建立第一筆。'
                : '換個篩選條件看看。'
            "
          />

          <TaskList
            v-else
            :tasks="store.visibleTasks"
            @toggle="store.toggleTask($event.id)"
            @edit="openEdit"
            @remove="openDelete"
          />
        </v-card>
      </v-container>
    </v-main>

    <TaskFormDialog
      v-model="formOpen"
      :task="editingTask"
      :saving="store.saving"
      @submit="submitForm"
    />

    <ConfirmDialog
      v-model="confirmOpen"
      title="刪除任務"
      :message="`確定要刪除「${deletingTask?.title ?? ''}」嗎？此動作無法復原。`"
      :loading="deleting"
      @confirm="confirmDelete"
    />

    <v-snackbar
      :model-value="Boolean(store.error)"
      color="error"
      location="bottom"
      :timeout="5000"
      @update:model-value="store.clearError()"
    >
      {{ store.error }}
    </v-snackbar>
  </v-app>
</template>
