<script setup lang="ts">
// [AI assisted - frontend.md #7] 任務清單：勾選框切換完成狀態，右側是編輯／刪除
import { useTaskStore } from '../stores/tasks'
import type { Task } from '../types/task'

defineProps<{ tasks: Task[] }>()

const emit = defineEmits<{
  toggle: [task: Task]
  edit: [task: Task]
  remove: [task: Task]
}>()

const store = useTaskStore()

const formatter = new Intl.DateTimeFormat('zh-TW', {
  dateStyle: 'short',
  timeStyle: 'short',
})

function formatTime(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : formatter.format(date)
}
</script>

<template>
  <v-list lines="two" class="py-0">
    <template v-for="(task, index) in tasks" :key="task.id">
      <v-divider v-if="index > 0" />
      <v-list-item class="py-2">
        <template #prepend>
          <v-checkbox-btn
            :model-value="task.completed"
            :disabled="store.isBusy(task.id)"
            color="primary"
            @update:model-value="emit('toggle', task)"
          />
        </template>

        <v-list-item-title
          :class="task.completed ? 'text-medium-emphasis text-decoration-line-through' : ''"
        >
          {{ task.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          <span v-if="task.description">{{ task.description }}</span>
          <span v-else class="font-italic text-disabled">（無描述）</span>
        </v-list-item-subtitle>

        <template #append>
          <div class="d-flex align-center ga-1">
            <span class="text-caption text-medium-emphasis mr-2">
              更新於 {{ formatTime(task.updatedAt) }}
            </span>
            <v-chip
              v-if="task.completed"
              size="small"
              color="success"
              variant="tonal"
              class="mr-2"
            >
              已完成
            </v-chip>
            <v-btn
              icon="mdi-pencil-outline"
              variant="text"
              size="small"
              :disabled="store.isBusy(task.id)"
              aria-label="編輯任務"
              @click="emit('edit', task)"
            />
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              size="small"
              color="error"
              :disabled="store.isBusy(task.id)"
              aria-label="刪除任務"
              @click="emit('remove', task)"
            />
          </div>
        </template>
      </v-list-item>
    </template>
  </v-list>
</template>
