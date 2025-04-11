import { defineStore } from 'pinia'
import axios from 'axios'
import { useToastStore } from './toastStore'

const API_URL = 'http://localhost:5500/posts'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  getters: {
    getSortedPosts: state => {
      return [...state.posts].sort((a, b) => b.createdAt - a.createdAt)
    },
  },
  actions: {
    async fetchPosts() {
      const toastStore = useToastStore()
      this.posts = []
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(API_URL)
        this.posts = response.data
      } catch (error) {
        this.error = error.message || '게시물을 불러오는데 실패했습니다.'
        toastStore.showToast(this.error, 'error')
      } finally {
        this.loading = false
      }
    },

    async getPostById(id) {
      const toastStore = useToastStore()
      try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
      } catch (error) {
        const errorMsg = `게시물(ID: ${id})을 불러오는데 실패했습니다.`
        toastStore.showToast(errorMsg, 'error')
        throw error
      }
    },

    formatDate(timestamp) {
      const date = new Date(parseInt(timestamp))
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}. ${month}. ${day}`
    },

    async createPost(postData) {
      const toastStore = useToastStore()
      this.loading = true
      this.error = null

      try {
        const newPost = {
          ...postData,
          createdAt: Date.now().toString(),
        }
        const response = await axios.post(API_URL, newPost)
        this.posts.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message || '게시물 등록에 실패했습니다.'
        toastStore.showToast(this.error, 'error')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updatePost(id, postData) {
      const toastStore = useToastStore()
      this.loading = true
      this.error = null

      try {
        const existingPost = await this.getPostById(id)
        const updatedPostData = {
          ...existingPost,
          ...postData,
          createdAt: existingPost.createdAt, // 원래 생성 날짜를 보존
        }

        const response = await axios.put(`${API_URL}/${id}`, updatedPostData)

        const index = this.posts.findIndex(post => post.id == id)
        if (index !== -1) {
          this.posts[index] = response.data
        }

        return response.data
      } catch (error) {
        this.error = error.message || '게시물 수정에 실패했습니다.'
        toastStore.showToast(this.error, 'error')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deletePost(id) {
      const toastStore = useToastStore()
      this.loading = true
      this.error = null

      try {
        await axios.delete(`${API_URL}/${id}`)
        this.posts = this.posts.filter(post => post.id != id)

        return true
      } catch (error) {
        this.error = error.message || '게시물 삭제에 실패했습니다.'
        toastStore.showToast(this.error, 'error')
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
