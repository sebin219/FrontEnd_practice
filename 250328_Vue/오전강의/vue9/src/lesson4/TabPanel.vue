<script>
export default {
  name: 'TabPanel',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index
    },
  },
}
</script>

<template>
  <div class="tab-panel">
    <div class="tab-headers">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="setActiveTab(index)"
        :class="{ active: activeTab === index }"
        class="tab-button"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 동적 슬롯 이름 -->
      <slot :name="'tab-' + activeTab">
        <p>이 탭에 대한 컨텐츠가 없습니다.</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.tab-panel {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.tab-headers {
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
