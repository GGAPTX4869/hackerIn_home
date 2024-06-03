<!--
  Description：
  @date：2024-03-26 9:58
  @author：JokerWang
-->

<template>
  <div class="container">
    <!-- 顶部菜单 -->
    <div class="top_slider">

      <Logo/>
      <el-menu
          text-color="black"
          :default-active="$route.path"
          mode="horizontal"
          class="menu"
          style="border-bottom: 0px"
      >
        <Menu :menuList="userStore.menuRoutes"></Menu>
      </el-menu>
      <Left/>
    </div>
    <!-- 栏目主体 -->
    <div class="relax">
      <div class="main">
        <Main/>
      </div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Left from './leftmenu/index.vue'
import Main from './main/index.vue'

import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user.js'
import useLayoutSettingStore from '@/store/setting.js'

let layoutSettingStore = useLayoutSettingStore()


let $route = useRoute()

let userStore = useUserStore()

</script>

<style scoped>
.container{
  height: 100vh;
  width: 100%;
  .top_slider{
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .menu{
      height: 8vh;
      vertical-align: center;
      margin-right: 40px;
    }
  }
  .relax{
    background: rgb(246, 248, 249);
    .main{
      padding: 5px;
      margin: 0 20vh;
    }
  }

}
</style>