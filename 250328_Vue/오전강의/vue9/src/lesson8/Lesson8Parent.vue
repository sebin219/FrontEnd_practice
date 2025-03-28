<script>
export default {
  name: 'Lesson8Parent',
  data() {
    return {
      showModal: false,
      showRegularModal: false,
      counter: 0,
    }
  },
  computed: {},
  methods: {},
  components: {},
}
</script>

<template>
  <div class="app-container">
    <h1>Vue 3 Teleport 모달 예제</h1>

    <!-- 버튼을 클릭하면 모달 표시 -->
    <button @click="showModal = true">모달 열기</button>

    <!-- 컨텐츠가 중첩된 구조 내에 있다고 가정 -->
    <div
      class="content-container"
      style="
        position: relative;
        overflow: hidden;
        height: 200px;
        border: 1px solid #ccc;
        padding: 10px;
      "
    >
      <p>이 컨테이너는 overflow: hidden이 적용되어 있어 일반적인 모달이 잘릴 수 있습니다.</p>

      <!-- Teleport를 사용하지 않는 일반 모달 -->
      <div v-if="showRegularModal" class="regular-modal">
        <div class="modal-content">
          <h3>일반 모달 (Teleport 없음)</h3>
          <p>이 모달은 DOM 에서 생성 위치를 변경할 수 없습니다.</p>
          <button @click="showRegularModal = false">닫기</button>
        </div>
      </div>

      <button @click="showRegularModal = true">일반 모달 열기</button>
    </div>

    <!-- Teleport를 사용한 모달 -->
    <teleport to="body">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>Teleport 모달</h3>
          <p>이 모달은 DOM에서 body 요소로 텔레포트되었습니다.</p>
          <p>현재 카운터: {{ counter }}</p>
          <button @click="counter++">카운터 증가</button>
          <button @click="showModal = false">닫기</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.app-container {
  display: block;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 일반 모달 스타일 position: a 일 경우 */
.regular-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 일반 모달 스타일 position: fixed 일 경우 */
/* .regular-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.regular-modal > div {
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
}

/* Teleport 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 80%;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
