<script>
export default {
  name: 'GrandChildComponent',
  inject: ['theme', 'toggleTheme'],
  computed: {
    themeClass() {
      return `theme-${this.theme()}`
    },
  },
}
</script>

<template>
  <div class="grandchild" :class="themeClass">
    <h3>손자 컴포넌트</h3>
    <p>주입된 테마: {{ theme() }}</p>
    <button @click="toggleTheme">테마 변경</button>
  </div>
</template>

<style scoped>
.theme-light {
  background-color: #f0f0f0;
  color: #333;
  padding: 15px;
  border-radius: 5px;
}

.theme-dark {
  background-color: #333;
  color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
}
</style>
