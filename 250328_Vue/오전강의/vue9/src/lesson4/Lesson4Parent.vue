<script>
import TabPanel from './TabPanel.vue'
export default {
  name: 'Lesson4Parent',
  data() {
    return {
      tabs: [
        { title: '상품 정보' },
        { title: '상세 설명' },
        { title: '리뷰' },
        { title: '배송 정보' },
      ],
    }
  },
  components: { TabPanel },
}
</script>

<template>
  <h2>동적슬롯 활용사례</h2>
  <div class="tabs-example">
    <TabPanel :tabs="tabs">
      <!-- 각 탭에 대한 컨텐츠 정의 -->
      <template #tab-0>
        <div class="product-info">
          <h3>상품 정보</h3>
          <p>브랜드: Vue3 브랜드</p>
          <p>모델명: OptionSlot-2023</p>
          <p>제조일자: 2023-05-15</p>
        </div>
      </template>

      <template #tab-1>
        <div class="product-description">
          <h3>상세 설명</h3>
          <p>이 상품은 Vue 3의 슬롯 기능을 설명하기 위한 가상의 제품입니다.</p>
          <p>Options API를 사용한 슬롯 예제와 함께 제공됩니다.</p>
        </div>
      </template>

      <template #tab-2>
        <div class="reviews">
          <h3>리뷰</h3>
          <div class="review-item">
            <strong>홍길동</strong>
            <div>⭐⭐⭐⭐⭐</div>
            <p>아주 좋은 제품입니다. 만족스럽게 사용 중입니다.</p>
          </div>
          <div class="review-item">
            <strong>김철수</strong>
            <div>⭐⭐⭐⭐</div>
            <p>대체로 만족합니다. 다만 배송이 조금 늦었어요.</p>
          </div>
        </div>
      </template>

      <template #tab-3>
        <div class="shipping-info">
          <h3>배송 정보</h3>
          <p>배송 방법: 택배</p>
          <p>배송비: 3,000원 (30,000원 이상 구매 시 무료)</p>
          <p>배송 예정: 결제 완료 후 1-3일 이내 발송</p>
        </div>
      </template>
    </TabPanel>
  </div>
</template>

<style scoped>
.tabs-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.review-item {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}
</style>
