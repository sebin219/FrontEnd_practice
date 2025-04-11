<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/postStore'
import { useToastStore } from '@/stores/toastStore'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const toastStore = useToastStore()

const post = ref(null)
const loading = ref(true)
const error = ref(null)

const postId = route.params.postId
const isDeleting = ref(false)

onMounted(async () => {
  try {
    post.value = await postStore.getPostById(route.params.postId)
    if (!post.value) {
      error.value = '존재하지 않는 게시물입니다.'
      toastStore.showToast(error.value, 'error')
    }
    loading.value = false
  } catch (err) {
    error.value = `게시물을 불러오는데 실패했습니다: ${err.message || '알 수 없는 오류'}`
    toastStore.showToast(error.value, 'error')
    loading.value = false
  }
})

const goBack = () => {
  router.push('/postsList')
}

const goEdit = () => {
  router.push(`/edit/${route.params.postId}`)
}

const handleDelete = async () => {
  const confirmed = window.confirm(
    '정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
  )

  if (!confirmed) {
    return
  }

  try {
    isDeleting.value = true
    await postStore.deletePost(postId)
    toastStore.showToast('게시글이 성공적으로 삭제되었습니다.', 'success')
    router.push({ name: 'postsList' })
  } catch (err) {
    error.value = `게시물을 불러오는데 실패했습니다: ${err.message || '알 수 없는 오류'}`
    toastStore.showToast(error.value, 'error')
  } finally {
    isDeleting.value = false
  }
}
</script>
<template>
  <section class="container postdetail">
    <h2>글상세</h2>

    <div v-if="loading" class="loading">게시물을 불러오는 중...</div>

    <div v-else-if="post">
      <div class="contentbox">
        <p class="title">{{ post.title }}</p>
        <p class="content">{{ post.content }}</p>
        <p class="author">{{ post.author }}</p>
        <p class="date">{{ postStore.formatDate(post.createdAt) }}</p>
      </div>
      <div class="btns-group">
        <button @click="goBack">글목록</button>
        <button @click="goEdit" class="point">글수정</button>

        <button @click="handleDelete" :disabled="isDeleting" class="danger">
          {{ isDeleting ? '삭제 중...' : '삭제하기' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.postdetail > div > p {
  padding: 1em 0;
  border-bottom: 1px dotted #ccc;
}
.title {
  font-size: 1.5em;
  font-weight: bold;
  padding: 1rem 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
}
.contentbox {
  line-height: 1.6;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title,
.content {
  flex: 1 1 100%;
}

.author {
  color: dodgerblue;
  font-size: 0.75em;
  padding-top: 1em;
}
.date {
  color: #666;
  font-size: 0.75em;
}
</style>
