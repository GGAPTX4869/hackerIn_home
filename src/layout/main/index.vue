<!--
  Description：
  @date：2024-03-26 14:22
  @author：JokerWang
-->

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang='ts'>
import useLayoutSettingStore from '@/store/setting.ts'
import { nextTick, ref, watch } from 'vue'

let layoutSettingStore = useLayoutSettingStore()

let flag = ref(true)

watch(
    () => layoutSettingStore.refresh,
    () => {
      flag.value = false
      nextTick(() => {
        flag.value = true
      })
    },
)
</script>

<style scoped>

</style>