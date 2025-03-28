<script>
export default {
  name: 'UserProfile',
  props: ['name', 'job'],
}
</script>

<template>
  <div class="userprofile">
    <h2>사용자 프로필</h2>
    <p><strong>이름:</strong> {{ name }}</p>
    <p><strong>직업:</strong> {{ job }}</p>
  </div>
</template>

<style scoped>
.userprofile {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>
