import { computed, reactive, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '../types/models'

export const useTodoStore = defineStore('todo', () => {
  const todos = reactive<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
  const lastId = computed<number>(() =>
    todos.length !== 0 ? Math.max(...todos.map((todo: any) => todo.id)) : 0
  )

  function setLocalStorageTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function addTodo(title: string) {
    const newTodo = {
      id: lastId.value + 1,
      title,
      isCompleted: false
    }

    todos.push(newTodo)
  }

  function deleteTodo(todo: Todo) {
    todos.splice(todos.indexOf(todo), 1)
  }

  function updateTodo(id: number, key: keyof Omit<Todo, 'id'>, value: string | boolean) {
    todos.forEach((todo) => {
      if (todo.id === id) {
        switch (key) {
          case 'title':
            todo.title = value as string
            break

          case 'isCompleted':
            todo.isCompleted = value as boolean
            break

          default:
            break
        }
      }
    })
  }

  watchEffect(() => {
    setLocalStorageTodos()
  })

  return { todos, addTodo, deleteTodo, updateTodo, setLocalStorageTodos }
})
