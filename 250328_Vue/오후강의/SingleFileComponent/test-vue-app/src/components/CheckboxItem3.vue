<script setup>
defineProps({
  id: [Number, String], //문자열과 숫자형만 가능
  name: String, //문자열만 가능
  checked: {
    type: Boolean, //불리언 타입만 가능
    default: false,
    required: true,
  },
});
</script>

<template>
  <li><input type="checkbox" :checked="idol.checked" />{{ idol.name }}</li>
</template>

<style scoped></style>
