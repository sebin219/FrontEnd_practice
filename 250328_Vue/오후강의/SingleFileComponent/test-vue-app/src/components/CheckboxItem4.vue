<script setup>
defineProps({
  //validator
  // Vue 공식기능
  // 부모가 prop을 전달할 때마다 함수가 호출됨
  idol: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        (typeof value.id === 'number' || typeof value.id === 'string') &&
        typeof value.name === 'string' &&
        typeof value.checked === 'boolean'
      );
    },
  },
});
</script>

<template>
  <li><input type="checkbox" :checked="idol.checked" />{{ idol.name }}</li>
</template>

<style scoped></style>
