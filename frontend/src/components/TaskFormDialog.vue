<script setup lang="ts">
// [AI assisted - frontend.md #8] 新增與編輯共用同一個 dialog：有帶 task 就是編輯，沒帶就是新增
import { computed, ref, watch } from 'vue'
import type { Task, TaskRequest } from '../types/task'

const props = defineProps<{
  modelValue: boolean
  task?: Task | null
  saving?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [payload: TaskRequest]
}>()

const title = ref('')
const description = ref('')
const touched = ref(false)

const isEdit = computed(() => Boolean(props.task))
const titleError = computed(() =>
  touched.value && !title.value.trim() ? '請輸入任務標題' : '',
)

// 每次開啟時把表單重設成對應的內容
watch(
  () => props.modelValue,
  (open) => {
    if (!open) return
    title.value = props.task?.title ?? ''
    description.value = props.task?.description ?? ''
    touched.value = false
  },
)

function close() {
  emit('update:modelValue', false)
}

function submit() {
  touched.value = true
  if (!title.value.trim()) return
  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim() || undefined,
  })
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="520"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6 pt-4">
        {{ isEdit ? '編輯任務' : '新增任務' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="title"
          label="標題"
          placeholder="例如：完成面試作業"
          maxlength="100"
          counter
          autofocus
          :error-messages="titleError"
          @keyup.enter="submit"
        />
        <v-textarea
          v-model="description"
          label="描述（選填）"
          rows="3"
          auto-grow
          class="mt-2"
        />
      </v-card-text>

      <v-card-actions class="px-4 pb-4">
        <v-spacer />
        <v-btn variant="text" :disabled="saving" @click="close">取消</v-btn>
        <v-btn color="primary" :loading="saving" @click="submit">
          {{ isEdit ? '儲存' : '新增' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
