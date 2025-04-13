<script setup>
import { ref } from 'vue'
const currentFilter = ref('all')

const emit = defineEmits(['update:filter']) // 부모에게 'update:filter'이벤트를 보낼 준비비

function setFilter(filter) {
  currentFilter.value = filter // 로컬 상태 갱신
  emit('update:filter', filter) // 부모에게 새로운 필터 값 전달
}
</script>

<template>
  <div class="filter-container">
    <!-- 버튼 클릭 시 setFilter 함수로 필터 변경-->
    <button :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">전체</button>
    <button :class="{ active: currentFilter === 'active' }" @click="setFilter('active')">
      미완료
    </button>
    <button :class="{ active: currentFilter === 'completed' }" @click="setFilter('completed')">
      완료
    </button>
  </div>
</template>

<style scoped>
/*필터 탭 filter-container */
.filter-container {
  display: flex;
  gap: var(--space-m);
}
</style>
