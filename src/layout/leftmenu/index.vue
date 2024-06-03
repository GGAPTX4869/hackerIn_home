<!--
  Description：
  @date：2024-03-26 15:04
  @author：JokerWang
-->

<template>

  <div class="leftmenu">
    <div class="info" @click="goLogin" v-show="isShow">
        <el-button type="primary" round style="background-color: #0eb4dd" @click="goLogin" >
          登录/注册
        </el-button>
    </div>
    <div class="info" v-show="!isShow">
      <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goPrivateInfo">个人中心</el-dropdown-item>
            <el-dropdown-item @click="goAdmin">管理界面</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang='ts'>

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import useUserStore from "@/store/modules/user.ts";

let $route = useRouter();
let $router = useRouter();
let userStore = useUserStore();
let isShow = ref<boolean>(true);
onMounted(()=>{
  if (userStore.token){
    isShow.value = false;
  }
})

const goLogin = ()=>{
  $router.push("/login")
}

const logout = async () =>{
  // 向服务器发请求,退出登录【token】无效
  await userStore.userLogout()
  // 登录跳转
  await $router.push({ path: '/login', query: { redirect: $route.path } })
}

const goPrivateInfo = () =>{
  $router.push({ path: '/h6/private/info'})
}

const goAdmin = ()=>{
  window.open('http://localhost:5174/')
}

</script>

<style scoped lang="scss">
.leftmenu{
  display: flex;
  align-items: center;
  margin-right: 80px;
  .info{
    margin-left: 30px;
    cursor: pointer;
  }
}
</style>