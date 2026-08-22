<script setup lang="ts">
// [AI assisted - frontend.md #9] 刪除前的確認對話框
defineProps<{
  modelValue: boolean
  title: string
  message: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6 pt-4">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-spacer />
        <v-btn variant="text" :disabled="loading" @click="emit('update:modelValue', false)">
          取消
        </v-btn>
        <v-btn color="error" :loading="loading" @click="emit('confirm')">刪除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
