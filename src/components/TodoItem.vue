<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useTodoStore } from '@/stores/todo'
import EditItem from './EditItem.vue'
import type { Todo } from '@/types/models'

const todoStore = useTodoStore()

interface Props {
  todo: Todo
}

const props = defineProps<Props>()
const { todo } = toRefs(props)

const isEdited = ref<boolean>(false)
const isCompleted = ref<boolean>(todo.value.isCompleted)

function toggleCheck() {
  isCompleted.value = !isCompleted.value
}

function setIsEdited(value: boolean) {
  isEdited.value = value
}

function updateStatus() {
  toggleCheck()
	todoStore.updateTodo(todo.value.id, 'isCompleted', isCompleted.value)
}
</script>

<template>
  <div class="todo">
    <mdicon
      v-if="!todo.isCompleted"
      @click="updateStatus"
      height="20"
      name="checkbox-blank-outline"
      class="icon checkbox"
    />

    <mdicon
      v-if="todo.isCompleted"
      @click="updateStatus"
      height="20"
      name="checkbox-outline"
      class="icon checkbox checkbox__checked"
    />

    <label
      v-if="!isEdited"
      class="todo__title"
      @dblclick="setIsEdited(true)"
      :class="{ isCompleted: todo.isCompleted }"
    >
      {{ todo.title }}
    </label>

    <EditItem @close="setIsEdited(false)" v-if="isEdited" :todo="todo" />

    <mdicon
      v-if="!isEdited"
      @click="setIsEdited(true)"
      height="17"
      name="pencil"
      class="icon icon__pencil"
    />

    <mdicon
      v-if="!isEdited"
      @click="todoStore.deleteTodo(todo)"
      name="delete"
      height="17"
      class="icon icon__close"
    />
  </div>
</template>

<style scoped lang="scss">
.todo {
  word-break: break-all;
  display: grid;
  justify-content: space-between;
  grid-template-columns: 0.1fr 1.5fr 0.1fr 0.1fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.219);

  &__title {
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin-right: 20px;
    padding: 5px 0;
  }
}

.icon {
  transition: 0.2s;
  cursor: pointer;
  padding: 7.5px 0;
  display: flex;
  justify-content: end;

  &__pencil {
    &:hover {
      color: orange;
    }
  }

  &__close {
    &:hover {
      color: red;
    }
  }
}

.checkbox {
  display: flex;
  justify-content: start;
  color: #e8eaed;
  margin-right: 15px;

  &__checked {
    color: #99999b;
  }
}

.isCompleted {
  text-decoration: line-through;
  color: #99999b;
}
</style>
