<script>
export default {
  name: 'NamedSlot',
}
</script>

<template>
  <div class="layout">
    <header class="header">
      <!-- 이름있는 slot 영역 -->
      <slot name="header">
        <h1>기본 헤더</h1>
      </slot>
    </header>

    <main class="content">
      <slot>메인 컨텐츠가 없습니다.</slot>
    </main>

    <footer class="footer">
      <!-- 이름있는 slot 영역 -->
      <slot name="footer">
        <p>&copy; 2025 기본 푸터</p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}
.header {
  background-color: #4a5568;
  color: white;
  padding: 1rem;
}
.content {
  flex: 1;
  padding: 1rem;
}
.footer {
  background-color: #f7fafc;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}
</style>
