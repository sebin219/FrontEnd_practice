<script setup>
import { watch, ref } from 'vue'
const x = ref(0)
const result = ref(0)

watch(x, (current, old) => {
  console.log(`${old}->${current}`)
  result.value = current * 3
})
</script>

<template>
  <div>
    X : <input type="text" v-model.number="x" /> <br />
    결과: {{ result }}
  </div>
</template>
<style scoped></style>
