<script>
import Lesson1Parent from './lesson1/Lesson1Parent.vue'
import Lesson2Parent from './lesson2/Lesson2Parent.vue'
import Lesson3Parent from './lesson3/Lesson3Parent.vue'
import Lesson4Parent from './lesson4/Lesson4Parent.vue'
import Lesson5Parent from './lesson5/Lesson5Parent.vue'
import Lesson6Parent from './lesson6/Lesson6Parent.vue'
import Lesson7Parent from './lesson7/Lesson7Parent.vue'
import Lesson8Parent from './lesson8/Lesson8Parent.vue'
import Lesson9Parent from './lesson9/Lesson9Parent.vue'
import { markRaw } from 'vue'
// markRaw 가져오기 추가
// markRaw 함수를 사용하여 반응성을 제거할 수 있습니다.

export default {
  name: 'App',
  data() {
    return {
      // 사용 가능한 컴포넌트 목록 - markRaw로 반응형 방지
      components: [
        { id: 'lesson1', name: '레슨 1', component: markRaw(Lesson1Parent) },
        { id: 'lesson2', name: '레슨 2', component: markRaw(Lesson2Parent) },
        { id: 'lesson3', name: '레슨 3', component: markRaw(Lesson3Parent) },
        { id: 'lesson4', name: '레슨 4', component: markRaw(Lesson4Parent) },
        { id: 'lesson5', name: '레슨 5', component: markRaw(Lesson5Parent) },
        { id: 'lesson6', name: '레슨 6', component: markRaw(Lesson6Parent) },
        { id: 'lesson7', name: '레슨 7', component: markRaw(Lesson7Parent) },
        { id: 'lesson8', name: '레슨 8', component: markRaw(Lesson8Parent) },
        { id: 'lesson9', name: '레슨 9', component: markRaw(Lesson9Parent) },
      ],
      // 현재 선택된 컴포넌트 ID
      activeComponentId: null,
    }
  },
  components: {
    Lesson1Parent,
    Lesson2Parent,
    Lesson3Parent,
    Lesson4Parent,
    Lesson5Parent,
    Lesson6Parent,
    Lesson7Parent,
    Lesson8Parent,
    Lesson9Parent,
  },
  computed: {
    // 선택된 컴포넌트 찾기 위한 computed 속성 추가
    selectedComponent() {
      if (!this.activeComponentId) return null
      return this.components.find((comp) => comp.id === this.activeComponentId)
    },
  },
  methods: {
    // 활성 컴포넌트를 설정하는 메소드
    setActiveComponent(componentId) {
      this.activeComponentId = componentId
    },
  },
}
</script>

<template>
  <div class="app-container">
    <!-- 컴포넌트 목록 -->
    <div class="component-list">
      <h2>레슨 목록</h2>
      <ul>
        <li
          v-for="item in components"
          :key="item.id"
          @click="setActiveComponent(item.id)"
          :class="{ active: activeComponentId === item.id }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 컴포넌트 표시 영역 -->
    <div class="component-display">
      <!-- 컴포넌트 참조 방식 변경 - computed 속성 사용 -->
      <!-- message prop 제거 - 부모 컴포넌트에서 정의되지 않은 prop은 전달하지 않음 -->
      <component v-if="selectedComponent" :is="selectedComponent.component" />
      <div v-else class="placeholder">목록에서 레슨을 선택해주세요</div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

/* 왼쪽 사이드바 스타일 */
.component-list {
  width: 250px;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}

/* 목록 스타일 제거 */
.component-list ul {
  list-style: none;
  padding: 0;
}

/* 목록 항목 스타일 */
.component-list li {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

/* 마우스 오버 효과 */
.component-list li:hover {
  background-color: #e0e0e0;
}

/* 활성화된 항목 스타일 */
.component-list li.active {
  background-color: #007bff;
  color: white;
}

/* 컴포넌트 표시 영역 */
.component-display {
  flex: 1;
  padding: 20px;
}

/* 선택 안된 상태 플레이스홀더 */
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-style: italic;
  border: 1px dashed #ccc;
  border-radius: 8px;
}
</style>
