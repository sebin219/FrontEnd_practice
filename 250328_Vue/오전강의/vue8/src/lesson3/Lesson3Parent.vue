<script>
import MessageSender from './MessageSender.vue'
import MessageReceiver from './MessageReceiver.vue'
import UserActivityMonitor from './UserActivityMonitor.vue'
export default {
  name: 'Lesson3Parent',
  components: { MessageSender, MessageReceiver, UserActivityMonitor },
}
</script>

<template>
  <div class="container">
    <message-sender />
    <message-receiver />
    <UserActivityMonitor />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>
