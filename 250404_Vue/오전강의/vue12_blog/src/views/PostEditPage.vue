<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useToastStore } from '@/stores/toastStore'

const router = useRouter()
const route = useRoute()
const postStore = usePostStore()
const toastStore = useToastStore()

const postId = route.params.postId
const title = ref('')
const content = ref('')
const isSubmitting = ref(false)
const isLoading = ref(true)
const postExists = ref(true)

const loadPost = async () => {
  try {
    isLoading.value = true
    const post = await postStore.getPostById(postId)

    if (!post) {
      postExists.value = false

      toastStore.showToast('존재하지 않는 게시물입니다.', 'error')
      return false
    }

    title.value = post.title
    content.value = post.content
    return true
  } catch (error) {
    postExists.value = false
    const errorMsg = error.message || '게시글을 불러오는데 실패했습니다.'
    toastStore.showToast(errorMsg, 'error')
    return false
  } finally {
    isLoading.value = false
  }
}

onMounted(loadPost)

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

    await postStore.updatePost(postId, postData)

    toastStore.showToast('게시물이 성공적으로 수정되었습니다.', 'success')

    router.push({ name: 'PostDetail', params: { postId } })
  } catch (error) {
    const errorMsg = error.message || '게시물 수정에 실패했습니다.'
    toastStore.showToast(errorMsg, 'error')
  } finally {
    isSubmitting.value = false
  }
}

const handleReset = async () => {
  await loadPost()
  toastStore.showToast('내용이 초기화되었습니다.', 'info')
}

const goToList = () => {
  router.push({ name: 'postsList' })
}
</script>
<template>
  <section class="container postedit">
    <h2>글 수정 페이지</h2>

    <div v-if="isLoading" class="loading">게시글 로딩 중...</div>

    <form v-else @submit.prevent="handleSubmit">
      <label for="title">제목</label>
      <input
        type="text"
        id="title"
        v-model="title"
        placeholder="제목을 입력하세요"
      />

      <label for="content">내용</label>
      <textarea id="content" v-model="content" rows="10"></textarea>

      <div class="btns-group">
        <button type="button" @click="goToList">글목록</button>
        <button type="button" @click="handleReset">초기화</button>
        <button type="submit" :disabled="isSubmitting" class="point">
          {{ isSubmitting ? '수정 중...' : '수정완료' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.postedit form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
