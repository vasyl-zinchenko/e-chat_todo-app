<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue'
import { useTodoStore } from '../stores/todo'
import type { Todo } from '@/types/models'

interface Props {
  todo: Todo
}

const todoStore = useTodoStore()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = defineProps<Props>()
const { todo } = toRefs(props)

const inputRef = ref<HTMLInputElement | null>(null)

const newTitle = ref<string>(todo.value.title)
const isSaving = ref<boolean>(false)

const closeButtonStyle = computed(() => {
  return !newTitle.value ? { cursor: 'not-allowed' } : {}
})

function closeEditing() {
  if (isSaving.value) {
    return
  }
  emit('close')
}

function saveTodo() {
  if (!newTitle.value) {
    inputRef.value?.focus()
    return
  }
  todoStore.updateTodo(todo.value.id, 'title', newTitle.value)
  emit('close')
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input
    v-model.trim="newTitle"
    ref="inputRef"
    class="todo__edit"
    @keyup.esc="closeEditing"
    @keyup.enter="saveTodo"
    @blur="closeEditing"
  />

  <mdicon
    @click="saveTodo"
    @mouseenter="isSaving = true"
    @mouseleave="isSaving = false"
    :style="closeButtonStyle"
    height="17"
    name="content-save"
    class="icon icon__save"
  />

  <mdicon @click="closeEditing" height="17" name="close-thick" class="icon icon__close" />
</template>

<style scoped lang="scss">
.todo {
  &__edit {
    flex-grow: 1;
    margin-right: 20px;
    background-color: #e8e8e80d;
    color: #e8eaed;
    outline: none;
    padding: 7.5px;
    border-radius: 2.5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-family: monospace;
  }
}

.icon {
  transition: 0.2s;
  cursor: pointer;
  padding: 7.5px 0;
  display: flex;
  justify-content: end;

  &__close {
    &:hover {
      color: red;
    }
  }

  &__save {
    &:hover {
      color: #36b636;
    }
  }
}
</style>
