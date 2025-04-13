<script setup>
import FilterContainer from './components/FilterContainer.vue'
import HeaderLayout from './components/HeaderLayout.vue'
import InputContainer from './components/InputContainer.vue'
import TodoItem from './components/TodoItem.vue'
import SummaryContainer from './components/SummaryContainer.vue'

import { computed, onMounted, ref } from 'vue'
import { useTodos } from './api/useTodos'
//useTodos를 호출함으로써 todo 관련 기능을 사용
const { todos, loadng, error, fetchTodos, addTodo, updateTodo, deleteTodo, deleteCompletedTodos } =
  useTodos()

const currentFilter = ref('all')
// 어떤 필터가 선택됐는지를 나타내는 상태 변수. 초기값은 전체 목록을 보여줌

onMounted(() => {
  fetchTodos()
}) // 컴포넌트가 완전히 마운트 되고 화면에 표시되면 todo 데이터 불러옴

function handleAddTodo(newTodo) {
  addTodo(newTodo)
}

function handleUpdateTodo(updatedTodo) {
  updateTodo(updatedTodo)
}
function handleDeleteTodo(todoId) {
  deleteTodo(todoId)
}

// currentFilter에 따라 보여줄 todo 목록을 동적으로 계산하여 반환
// all:전체, active:미완료 todo, completed:완료 todo
const filteredTodos = computed(() => {
  if (currentFilter.value === 'all') {
    return todos.value
  } else if (currentFilter.value === 'active') {
    return todos.value.filter((todo) => !todo.completed)
  } else if (currentFilter.value === 'completed') {
    return todos.value.filter((todo) => todo.completed)
  }
  return todos.value
})

function handleFilterChange(filter) {
  currentFilter.value = filter
} // FilterContainer에서 필터가 변경되면 이벤트를 받아 현재 필터 상태 업데이트

const activeTodoCount = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length
}) // 미완료 todo의 개수를 계산하여 SummaryContainer에서 표시할 때 사용

const completedTodoCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length
}) // 완료 todo의 개수를 계산하여 SummaryContainer에서 표시할 때 사용

const handleDeleteCompletedTodos = () => {
  deleteCompletedTodos()
}
</script>

<template>
  <HeaderLayout />
  <InputContainer @add-todo="handleAddTodo" />
  <!-- InputContainer.vue : const emit = defineEmits(['add-todo']) -->
  <FilterContainer @update:filter="handleFilterChange" />
  <!-- FilterContainer.vue : const emit = defineEmits(['update:filter']) -->
  <div v-if="loadng">로딩중...</div>
  <div v-else-if="error">
    <p>에러 {{ error }}</p>
    <button @click="fetchTodos">새로고침</button>
  </div>
  <ul v-else class="todo-list">
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @update:todo="handleUpdateTodo"
      @delete-completed="handleDeleteTodo"
    />
    <!-- TodoItem.vue : const emit = defineEmits(['update:todo', 'delete:todo']) -->
    <!-- SummaryContainer.vue : const emit = defineEmits(['delete-completed']) -->
  </ul>
  <SummaryContainer
    :activeTodoCount="activeTodoCount"
    :completedTodoCount="completedTodoCount"
    @delete-completed="handleDeleteCompletedTodos"
  />
</template>

<style scoped>
.todo-list {
  margin: var(--space-l) auto !important;
}
</style>
