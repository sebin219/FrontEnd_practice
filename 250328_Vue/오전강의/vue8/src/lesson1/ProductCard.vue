<script>
export default {
  name: 'ProductCard',
  props: {
    title: String,
    price: [String, Number], // 여러 타입 허용. 숫자형, 문자형 둘다 허용
    isAvailable: Boolean,
    features: Array,
    productInfo: Object,
  },
  computed: {
    formattedPrice() {
      // price를 숫자로 변환하고 한국 원화 형식으로 포맷
      return Number(this.price).toLocaleString() + '원'
    },
  },
}
</script>

<template>
  <div class="product-card">
    <h2>제품 정보</h2>
    <p><strong>제품명:</strong> {{ title }}</p>
    <p><strong>가격:</strong> {{ formattedPrice }}</p>
    <p><strong>구매가능:</strong> {{ isAvailable ? '예' : '아니오' }}</p>

    <div v-if="features.length">
      <h3>상품특징:</h3>
      <ul>
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
    </div>

    <div>
      <h3>추가 정보:</h3>
      <p>ID: {{ productInfo.id }}</p>
      <p>브랜드: {{ productInfo.brand }}</p>
      <p>카테고리: {{ productInfo.category }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
