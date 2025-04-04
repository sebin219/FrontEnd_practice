import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLikeStore = defineStore('like', () => {
  // state 생성
  const like = ref(0);

  // getter
  // 5배씩 보이는
  const fivetime = computed(() => like.value * 5);
  // action
  const increase = () => {
    like.value *= 5;
  };

  return { like, increase, fivetime };
});
