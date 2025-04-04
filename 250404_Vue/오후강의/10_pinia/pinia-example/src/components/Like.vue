<script setup>
import { useLikeStore } from '@/stores/like';

const like = useLikeStore();
const { increase } = like;
</script>

<template>
  <div>
    <button @click="increase">좋아요!</button>
  </div>
</template>
