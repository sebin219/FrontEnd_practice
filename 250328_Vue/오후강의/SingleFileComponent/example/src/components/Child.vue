<script setup>
import GrandChild from './GrandChild.vue';
</script>

<template>
  <div class="parent" style="border: 2px solid skyblue">
    <h1>나는 자식!!</h1>
    <GrandChild />
    <GrandChild />
  </div>
</template>

<style scoped></style>
