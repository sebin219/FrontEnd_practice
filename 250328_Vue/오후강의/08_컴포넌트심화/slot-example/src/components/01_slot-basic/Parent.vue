<script setup>
import Child from './Child.Vue';
</script>

<template>
  <div style="border: 2px solid blue; padding: 10px">
    <Child>
      <p>여기에 작성된 컨텐츠가 전달됩니다</p>
    </Child>
  </div>
</template>

<style scoped></style>
