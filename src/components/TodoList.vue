<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'

const todoStore = useTodoStore()
const title = ref<string>('')

const addNewTodo = () => {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <header>
    <h1>TODO APP</h1>
  </header>

  <main>
    <section>
      <section class="new-todo">
        <input
          @keyup.enter="addNewTodo"
          class="new-todo__input"
          placeholder="New task"
          v-model.trim="title"
        />

        <label for="title">
          <button :disabled="title.trim().length === 0" class="new-todo__add" @click="addNewTodo">
            Add
          </button>
        </label>
      </section>

      <section class="todos" :style="todoStore.todos.length > 0 ? 'margin-top: 10px;' : ''">
        <TransitionGroup>
          <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
        </TransitionGroup>
      </section>
    </section>
  </main>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

main {
  max-width: 450px;
  margin: 0 auto;
  padding: 15px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.new-todo {
  display: flex;

  &__input {
    border: none;
    outline: none;
    background-color: #e8e8e823;
    color: #cccccc;
    padding: 0 7.5px;
    border-radius: 2.5px;
    flex-grow: 1;
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-family: monospace;
    font-size: 16px;
  }

  &__add {
    border: none;
    background-color: #3e8ed0;
    color: white;
    padding: 7.5px 10px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 2.5px;
    transition: 0.3s;

    &:hover {
      box-shadow:
        rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      background-color: #3488ce;
    }

    &:active {
      box-shadow:
        rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      background-color: #3e8ed0;
    }

    &:disabled {
      background-color: #7fa8ca9c;
      cursor: not-allowed;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}

.v-enter-from {
  opacity: 0;
  background-color: rgba(0, 128, 0, 0.426);
}
.v-leave-to {
  opacity: 0;
  background-color: rgba(194, 28, 20, 0.778);
}
</style>
