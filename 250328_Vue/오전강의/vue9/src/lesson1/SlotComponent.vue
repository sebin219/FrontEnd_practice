<script>
export default {
  name: 'SlotComponent',
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>카드 제목</h3>
    </div>
    <div class="card-body">
      <!-- 기본 슬롯 -->
      <!-- slot 영역에는 부모로부터 전달되는 레이아웃이 전달 -->
      <slot>컨텐츠가 없습니다.</slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.card-header {
  background-color: #f5f5f5;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
}
.card-body {
  padding: 1rem;
}
</style>
