import axios from 'axios' //axios 라이브러리를 불러와서 http 요청을 보내기 위해 사용
import { ref } from 'vue' // vue에서 반응형 변수를 사용하기 위함

const API_URL = 'http://localhost:5000/todos' // API의 기본 주소를 상수로 지정

export const useTodos = () => {
  const todos = ref([]) //todos: Todo항목들을 저장할 반응형 배열
  const loadng = ref(false) //loadng: 데이터 로딩 상태를 저장하는 반응형 변수
  const error = ref(null) //error: 에러 메시지를 저장하는 반응형 변수

  // 1. 데이터 가져오기 - fetchTodos
  const fetchTodos = async () => {
    loadng.value = true //데이터를 불러오기 시작했으니 로딩 중 상태로 설정
    error.value = null //이전 에러가 있다면 초기화

    try {
      // 지연상태 확인
      // await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axios.get(API_URL)
      console.log('response---', response)
      todos.value = response.data
    } catch (err) {
      error.value = err.message || '데이터 요청 중 에러'
      console.error(err)
    } finally {
      loadng.value = false
    }
  }

  // 2. 데이터 등록하기 - addTodo
  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(API_URL, newTodo)
      console.log('response---', response)
      todos.value.push(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 3. todo 항목 업데이트, 수정 - updateTodo
  const updateTodo = async (updatedTodo) => {
    try {
      //Step1: 서버에 업데이트 요청 보내기
      const response = await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo)
      console.log('response---', response)
      // api 기본 주소 뒤에 수정할 todo의 id를 붙임으로 써 어떤 항목을 수정할지 지정
      // updatedTodo는 변경된 내용들이 담겨 있음

      //Step2: 로컬 배열(todos)에서 해당 todo 항목 찾아서 업데이트트
      const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
      if (index !== -1) todos.value[index] = updatedTodo
      // 인덱스가 유효하다면(-1이 아니라면) 해당 인덱스 위치의 값을 새로운 updatedTodo값으로 바꿈꿈
    } catch (err) {
      console.log(err)
    }
  }

  // 4. todo 항목 삭제 - deleteTodo
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/${todoId}`)
      todos.value = todos.value.filter((todo) => todo.id !== todoId)
      // return true
    } catch (err) {
      console.log(err)
      // return false
    }
  }

  // 5. 완료된 todo 일괄삭제 - deleteCompletedTodos
  const deleteCompletedTodos = async () => {
    try {
      //Step1: 배열에서 완료된 todo 항목들만 고르기
      const completedTodos = todos.value.filter((todo) => todo.completed)
      //Step2: 완료된 각 todo 항목에 대해 삭제 요청을 보냄(promise 배열 생성)
      const deletePromises = completedTodos.map((todo) =>
        axios.delete(`http://localhost:5000/todos/${todo.id}`),
      )
      //Step3: 모든 삭제 요청이 완료될 때까지 기다림
      await Promise.all(deletePromises)
      //Step4: 로컬 상태에서도 삭제된 항목을 제거하여 남은 todo만 업데이트트
      todos.value = todos.value.filter((todo) => !todo.completed)

      return true
    } catch (err) {
      error.value = err.message || '완료된 항목 삭제 중 오류 발생'
      console.error('완료된 항목 삭제 중 오류 발생:', err)
      return false
    }
  }

  return {
    todos,
    loadng,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteCompletedTodos,
  } //모든 상태와 함수를 객체로 반환
}
