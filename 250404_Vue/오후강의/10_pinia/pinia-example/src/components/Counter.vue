<script setup>
import { useCounterStore } from '@/stores/counter'; //counter.js에서 export한거 받아오기

// 값 자체를 가져올 때 반응형이 깨짐
// const {count, increase, reset} = useCounterStore();
const counter = useCounterStore();
const { increase, reset } = counter;
</script>

<template>
  <div>
    <h3>{{ counter.count }}</h3>
    <button @click="increase">+ 증가</button>
    <button @click="reset">0 초기화</button>
  </div>
</template>
