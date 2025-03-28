<script>
import UserProfile from './UserProfile.vue'
import ProductCard from './ProductCard.vue'
import MessageBox from './MessageBox.vue'

export default {
  name: 'Lesson1Parent',
  components: { UserProfile, ProductCard, MessageBox },
  methods: {
    // Counter 컨포넌트 관련 함수
    reachedMax(count) {
      alert(`최대값 ${count}에 도달했습니다!`)
    },
  },
}
</script>

<template>
  <!-- 기본 문자열 props -->
  <UserProfile name="이름" job="직업" />

  <!-- 다양한 타입의 props -->
  <ProductCard
    title="노트북"
    price="1200000"
    :is-available="true"
    :features="['8GB RAM', '256GB SSD', '15인치 화면']"
    :product-info="{ id: 1234, brand: 'TechBrand', category: '전자기기' }"
  />

  <!-- 필수 props 누락 시 콘솔영역에 경고메시지 확인 -->
  <MessageBox message="첫번째 컨포넌트" />
  <MessageBox message="두번째 컨포넌트" sender="길동이" />
  <MessageBox message="두번째 컨포넌트" sender="길동이" :is-important="true" />
</template>
