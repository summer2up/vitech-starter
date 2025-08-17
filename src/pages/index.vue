<template>
  <div>
    <!-- <div class="test">hello world</div> -->
    <Swiper :items="items" height="36rem"></Swiper>
  </div>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register'
import type {SwiperItemType} from '@/components/types'
import bg from '@/assets/images/bg.png'

const items: SwiperItemType[] = [
  {
    image: bg,
    title: 'title',
    subTitle: 'subtitle'
  },
  {
    image: bg
  },
  {
    image: bg
  },
  {
    image: bg
  }
]

onMounted(() => {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      setInterval(() => {
        registration && registration.update()
      }, 3600000)
    }
  })
})
</script>

<style scoped>
.test {
  width: 240px;
  height: 100px
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
