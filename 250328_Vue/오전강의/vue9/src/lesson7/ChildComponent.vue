<script>
import GrandChildComponent from './GrandChildComponent.vue'

export default {
  name: 'ChildComponent',
  components: {
    GrandChildComponent,
  },
  // 여기서는 provide/inject가 필요하지 않음
}
</script>

<template>
  <div class="child">
    <h2>중간 자식 컴포넌트</h2>
    <GrandChildComponent />
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
.child {
  background-color: #f0f0f0;
  color: #333;
  padding: 15px;
  margin-top: 1rem;
  border-radius: 5px;
}
</style>
