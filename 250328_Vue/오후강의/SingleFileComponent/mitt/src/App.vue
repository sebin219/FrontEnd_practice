<script setup>
import Sibling1 from './components/01_problem/Sibling1.vue';
import Sibling2 from './components/01_problem/Sibling2.vue';
import { ref } from 'vue';

const sibling2Message = ref(''); //반응형 데이터 정의

const handleMessageFromChild = (msg) => {
  sibling2Message.value = msg;
};
</script>

<template>
  <div>
    <h2>mitt없이 형제관계 간 통신</h2>
    <Sibling1 @send-message="handleMessageFromChild" />
    <Sibling2 :message="sibling2Message" />
  </div>
</template>

<style scoped></style>
