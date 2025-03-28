<script setup>
import { ref } from 'vue';
const emit = defineEmits(['nameChange']);

const ChildName = ref('');
</script>
<template>
  <div>
    이름 : <input type="text" v-model="childName" />
    <button @click="emit('nameChange', { childName })">이벤트발신</button>
  </div>
</template>

<style scoped></style>
