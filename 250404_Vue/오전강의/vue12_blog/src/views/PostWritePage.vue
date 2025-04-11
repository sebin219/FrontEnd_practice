<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useToastStore } from '@/stores/toastStore'

const router = useRouter()
const postStore = usePostStore()
const toastStore = useToastStore()

const title = ref('')
const content = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!title.value.trim()) {
    toastStore.showToast('제목을 입력해주세요.', 'error')
    return
  }

  if (!content.value.trim()) {
    toastStore.showToast('내용을 입력해주세요.', 'error')
    return
  }

  isSubmitting.value = true

  try {
    const postData = {
      title: title.value,
      content: content.value,
    }

    await postStore.createPost(postData)

    toastStore.showToast('게시물이 성공적으로 등록되었습니다.', 'success')

    router.push({ name: 'postsList' })
  } catch (error) {
    const errorMsg = error.message || '게시물 등록에 실패했습니다.'
    toastStore.showToast(errorMsg, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const handleReset = () => {
  title.value = ''
  content.value = ''
  // errorMessage.value = ''
}

const goToList = () => {
  router.push({ name: 'postsList' })
}
</script>
<template>
  <section class="container postwrite">
    <h2>글쓰기 페이지</h2>

    <form @submit.prevent="handleSubmit">
      <label for="title">제목</label>
      <input
        type="text"
        id="title"
        placeholder="제목을 입력하세요"
        v-model="title"
      />
      <label for="content">내용</label>
      <textarea id="content" v-model="content"></textarea>
      <div class="btns-group">
        <button type="button" @click="goToList">글목록</button>
        <button type="button" @click="handleReset">초기화</button>
        <button type="submit" class="point" :disabled="isSubmitting">
          {{ isSubmitting ? '등록 중...' : '글작성' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.postwrite form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
