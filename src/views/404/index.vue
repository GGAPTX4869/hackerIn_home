<!--
  Description：
  @date：2024-03-18 11:11
  @author：JokerWang
-->

<template>
  <el-empty description="404" />
  <div style="display:flex;justify-content: center">
    <el-button type="primary" size="large" @click="goBack">
      返回首页
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

let $router = useRouter();
const goBack = ()=>{
  $router.push('/')
}

</script>

<style scoped></style>
