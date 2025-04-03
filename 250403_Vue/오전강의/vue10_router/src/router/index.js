import { createRouter, createWebHistory } from 'vue-router'
import IntroPage from '@/views/IntroPage.vue'
import BusinessPage from '@/views/BusinessPage.vue'
// import HomePage from '@/views/HomePage.vue'
import SponsorPage from '@/views/SponsorPage.vue'
import NewsPage from '@/views/NewsPage.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomePage,
  // },
  {
    path: '/intro',
    name: 'intro',
    component: IntroPage,
  },
  {
    path: '/business',
    name: 'business',
    component: BusinessPage,
  },
  {
    path: '/sponsor',
    name: 'sponsor',
    component: SponsorPage,
  },
  {
    path: '/news',
    name: 'news',
    component: NewsPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
