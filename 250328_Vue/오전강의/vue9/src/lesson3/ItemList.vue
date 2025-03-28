<script>
export default {
  name: 'ItemList',
  data() {
    return {
      items: [
        { id: 1, name: '상품 1', price: 10000, stock: 5 },
        { id: 2, name: '상품 2', price: 20000, stock: 3 },
        { id: 3, name: '상품 3', price: 15000, stock: 0 },
        { id: 4, name: '상품 4', price: 30000, stock: 8 },
      ],
    }
  },
}
</script>

<template>
  <div class="item-list">
    <h2>상품 목록</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <!-- 스코프 슬롯: 아이템 데이터를 슬롯에 전달 -->
        <!--
          - :is-in-stock="item.stock > 0"은 item.stock이 0보다 크면 true, 아니면 false를 전달합니다.
         -->
        <slot :item="item" :isInStock="item.stock > 0">
          <!-- 기본 렌더링 -->
          {{ item.name }} - {{ item.price }}원
        </slot>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item-list {
  margin: 1rem 0;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
