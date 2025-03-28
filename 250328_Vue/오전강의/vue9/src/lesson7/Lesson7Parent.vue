<script>
import ChildComponent from './ChildComponent.vue'

export default {
  name: 'App',
  components: {
    ChildComponent,
  },
  data() {
    return {
      theme: 'light',
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },
  provide() {
    // 반응형 객체를 제공하려면 computed 사용 또는 provide의 객체를 반환해야 함
    return {
      theme: () => this.theme, // 함수로 반환하여 반응형 유지
      toggleTheme: this.toggleTheme, // 메소드 전달
    }
  },
}
</script>

<template>
  <div class="app">
    <h1>테마 설정 예제</h1>
    <p>현재 테마: {{ theme }}</p>
    <button @click="toggleTheme">테마 변경</button>

    <ChildComponent />
  </div>
</template>
