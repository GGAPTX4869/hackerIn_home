<!--
  Description：
  @date：2024-03-26 14:33
  @author：JokerWang
-->

<template>

  <template v-for="(item, index) in menuList" :key="index">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
          :index="item.path"
          v-if="!item.meta.hidden"
          @click="goRoute"
      >
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
          :index="item.path"
          v-if="!item.children[0].meta.hidden"
          @click="goRoute"
          :class="activeNum === item.path?'active':'menu_font'"
      >
        {{ item.children[0].meta.title }}
      </el-menu-item>
    </template>

    <!-- 有子路由且大于一个 -->
    <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang='ts'>
//获取父组件路由数据
import {ref} from "vue";

defineProps(['menuList'])
import { useRouter } from 'vue-router'

let activeNum = ref('');
//获取路由器对象
let $router = useRouter()
//菜单回调
const goRoute = (vc: any) => {

  activeNum.value = vc.index
  $router.push(vc.index)
}
</script>

<style scoped lang="scss">
.menu_font{
  font-family: Microsoft YaHei;
  font-size: 15px;
  margin-left: 30px;
}
.active{
  font-family: Microsoft YaHei;
  font-size: 15px;
  margin-left: 30px;
  border-bottom-color: #95bfed;
  color: #0eb3dc;
}
</style>