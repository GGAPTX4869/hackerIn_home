<!--
  Description：
  @date：2024-03-27 2:03
  @author：JokerWang
-->

<template>
  <el-card class="upload">
    <div style="text-align: center;font-size: large;font-family: 微软雅黑;font-weight: bold">
      投稿入口
    </div>
    <div style="margin-top: 20px;display: grid;">
      <el-button type="primary" size="large" style="width: 22vw;margin-left: 12px" icon="Plus" @click="goAddChallenge">
        题目投稿
      </el-button>
      <el-button type="primary" size="large" style="width: 22vw;margin-top: 20px" icon="Plus" @click="goAddWp">
        WP投稿
      </el-button>
    </div>

  </el-card>
</template>

<script setup lang='ts'>

import {useRoute, useRouter} from "vue-router";
import useUserStore from "@/store/modules/user.ts";

let $route = useRoute();
let $router = useRouter();
let userStore = useUserStore();
const goAddChallenge = ()=>{
  $router.push({
    path:'/h7/challenge/add',
    query:{
      userid:userStore.userId,
      redirect:$route.path,
    }
  })
}

const goAddWp = ()=>{
  $router.push({
    path:'/h8/wp/add',
    query:{
      userid:userStore.userId,
      redirect:$route.path,
    }
  })
}

</script>

<style scoped lang="scss">
.upload{
  border-radius: 10px;

}
</style>