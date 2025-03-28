<script setup>
import { ref } from 'vue';
import InputName from './components/InputName.vue';

const parentName = ref('');

const nameChangeHandler = (event) => {
  parentName.value = event.childName;
};
</script>

<template>
  <h1>컴포넌트 5</h1>
  <hr />
  <div>
    <InputName @nameChange="nameChangeHandler" />
    <br />
    <h3>App Data: {{ parentName }}</h3>
  </div>
</template>

<style scoped></style>
