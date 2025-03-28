<script>
import NamedSlot from './NamedSlot.vue'
export default {
  name: 'Lesson2Parent',
  components: { NamedSlot },
}
</script>

<template>
  <h2>이름있는 슬롯</h2>
  <NamedSlot>
    <!-- 이름 있는 슬롯에 컨텐츠 전달 -->
    <template #header>
      <div class="custom-header">
        <h1>홈페이지</h1>
        <nav>
          <a href="/">홈</a>
          <a href="/about">소개</a>
          <a href="/contact">연락처</a>
        </nav>
      </div>
    </template>

    <!-- 기본 슬롯에 컨텐츠 전달 -->
    <div class="main-content">
      <h2>환영합니다!</h2>
      <p>이 사이트는 Vue 3의 슬롯 기능을 보여주기 위한 예시입니다.</p>
    </div>

    <!-- 이름 있는 슬롯에 컨텐츠 전달 -->
    <template #footer>
      <div class="custom-footer">
        <p>&copy; 2025 Vue 3 슬롯 예시</p>
        <div class="social-links">
          <a href="#">페이스북</a>
          <a href="#">트위터</a>
          <a href="#">인스타그램</a>
        </div>
      </div>
    </template>
  </NamedSlot>
</template>

<style scoped>
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-header nav a {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
}
.main-content {
  max-width: 800px;
  margin: 0 auto;
}
.custom-footer {
  display: flex;
  justify-content: space-between;
}
.social-links a {
  margin-left: 1rem;
}
</style>
