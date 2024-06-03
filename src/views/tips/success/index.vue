<!--
  Description：
  @date：2024-04-09 3:28
  @author：JokerWang
-->

<template>
  <div style="margin-top: 20vh;margin-bottom: 30vh">
    <el-col>
      <el-result
          icon="success"
          title="Success Tip"
          sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-button type="primary" @click="goBack">返回</el-button>
        </template>
      </el-result>
    </el-col>
  </div>
</template>

<script setup lang='ts'>
import {useRoute, useRouter} from "vue-router";

let $route = useRoute();
let $router = useRouter();
const goBack = ()=>{
  $router.push({
    path:$route.query.redirect
  })
}
</script>

<style scoped>

</style>