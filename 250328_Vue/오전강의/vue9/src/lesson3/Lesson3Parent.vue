<script>
import ItemList from './ItemList.vue'
export default {
  name: 'Lesson3Parent',
  data() {
    return {}
  },
  components: {
    ItemList,
  },
  methods: {
    addToCart(item) {
      console.log(`${item.name}을(를) 장바구니에 추가했습니다.`)
      // 장바구니 추가 로직
    },
  },
}
</script>

<template>
  <h2>스코프 슬롯 활용사례</h2>
  <div class="product-page">
    <!-- 스코프 슬롯을 사용하여 아이템 렌더링 방식 커스터마이징 -->
    <ItemList>
      <template #default="{ item, isInStock }">
        <div class="product-item" :class="{ 'out-of-stock': !isInStock }">
          <div class="product-info">
            <h3>{{ item.name }}</h3>
            <p class="price">{{ item.price.toLocaleString() }}원</p>
            <p class="stock" :class="{ 'text-red': !isInStock }">
              {{ isInStock ? `재고: ${item.stock}개` : '품절' }}
            </p>
          </div>
          <button @click="addToCart(item)" :disabled="!isInStock" class="add-to-cart">
            {{ isInStock ? '장바구니 추가' : '품절' }}
          </button>
        </div>
      </template>
    </ItemList>
  </div>
</template>

<style scoped>
.product-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}
.out-of-stock {
  opacity: 0.6;
}
.price {
  font-weight: bold;
  color: #2c5282;
}
.text-red {
  color: #e53e3e;
}
.add-to-cart {
  padding: 0.5rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-to-cart:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
</style>
