<template>
  <section class="not-found-page container">
    <h2>oops!</h2>
    <p>잘못된 경로로 접근했어요</p>
    <router-link to="/">홈으로</router-link>
  </section>
</template>

<style scoped>
.not-found-page {
  text-align: center;
  margin-top: 50px;
}
.not-found-page a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  margin-top: 20px;
  border-radius: 5px;
}
</style>
