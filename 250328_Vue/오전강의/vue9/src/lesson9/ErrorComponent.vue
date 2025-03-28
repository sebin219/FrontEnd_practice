<template>
  <div class="error-component">
    <h3>컴포넌트 로딩 실패</h3>
    <p>무거운 컴포넌트를 로드하는 도중 오류가 발생했습니다.</p>
    <button @click="$emit('retry')">다시 시도</button>
  </div>
</template>
