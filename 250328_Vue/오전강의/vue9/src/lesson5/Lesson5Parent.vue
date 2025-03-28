<script>
import HomePage from './HomePage.vue'
import AboutPage from './AboutPage.vue'
import ContactPage from './ContactPage.vue'
export default {
  name: 'Lesson5Parent',
  components: {
    HomePage,
    AboutPage,
    ContactPage,
  },
  data() {
    return {
      currentTab: 'HomePage',
      tabs: [
        { name: 'HomePage', label: '홈' },
        { name: 'AboutPage', label: '소개' },
        { name: 'ContactPage', label: '연락처' },
      ],
    }
  },
}
</script>

<template>
  <h2>동적 컨포넌트 :is</h2>
  <div class="tab-interface">
    <div class="tab-buttons">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="currentTab = tab.name"
        :class="{ active: currentTab === tab.name }"
        class="tab-button"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 동적 컴포넌트 -->
      <!--  <component :is="componentName">을 사용하여 런타임에 컴포넌트를 전환할 수 있는 기능 -->
      <component :is="currentTab" />
    </div>
  </div>
</template>

<style scoped>
.tab-interface {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.tab-buttons {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;
}
.tab-button.active {
  background-color: white;
  border-bottom: 2px solid #3182ce;
  font-weight: bold;
}
.tab-content {
  padding: 1rem;
}
</style>
