<script>
import SlotComponent from './SlotComponent.vue'
export default {
  name: 'Lesson1Parent',
  components: { SlotComponent },
}
</script>

<template>
  <h2>슬롯 예제</h2>
  <SlotComponent>
    <p>이것은 카드 내부에 들어가는 컨텐츠입니다.</p>
    <p>이것은 카드 내부에 들어가는 컨텐츠입니다.</p>
    <p>이것은 카드 내부에 들어가는 컨텐츠입니다.</p>
    <p>이것은 카드 내부에 들어가는 컨텐츠입니다.</p>
    <p>이것은 카드 내부에 들어가는 컨텐츠입니다.</p>
    <button>자세히 보기</button>
  </SlotComponent>

  <!-- 컨텐츠가 없는 경우 기본값이 표시됩니다 -->
  <SlotComponent></SlotComponent>
</template>

<style scoped></style>
