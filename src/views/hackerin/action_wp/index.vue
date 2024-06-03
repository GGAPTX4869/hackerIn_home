<!--
  Description：
  @date：2024-03-28 0:44
  @author：JokerWang
-->

<template>
  <el-card class="action_wp">
    <div style="justify-content: space-between;display: flex;text-align: center">
      <div style="font-weight: bolder;font-size: 18px;color: rgba(0,0,0,0.56)">
        最新WP题解
      </div>
      <el-button type="text" size="small" @click="goWp">
        更多>>
      </el-button>
    </div>
    <div v-for="item in actionWpList">
      <div style="margin-top: 20px;">
        <div style="display: flex;justify-content: space-between">
          <div class="title" style="cursor: pointer;color: #0eb4dd" @click="downLoadWp(item)">
            {{ item.writeupname }}
          </div>
          <div class="title">
            {{ item.challengename }}
          </div>
        </div>
        <div class="description">
          {{ item.description }}
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: space-between;align-items: center">
          <el-tag :type="getIconType(item)">{{ item.typename }}</el-tag>
          <span style="font-size: 14px;color: rgba(87,87,87,0.67)">{{item.createtime}}</span>
          <div style="display: flex;align-items: center">
            <svg-icon name="user"></svg-icon>
            <span style="color: rgba(87,87,87,0.67);font-size: 14px;margin-left: 8px">{{item.operator}}</span>
          </div>
        </div>
        <el-divider />
      </div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>

import {onMounted, ref} from "vue";
import {reqGetWpListByGroup} from "@/api/wp";
import {useRouter} from "vue-router";

onMounted(async ()=>{
  await getActionWpList();
})

let $router = useRouter();
let actionWpList = ref([]);

const getActionWpList = async ()=>{
  let result = await reqGetWpListByGroup({
    page:1,
    limit:5
  })
  if (result.code == 200){
    actionWpList.value = result.data;
  }
}

const getIconType = (item)=>{
  if(item.typename === 'Crypto'){
    return 'info'
  }else if(item.typename === 'Web'){
    return 'warning'
  }else if(item.typename === 'MISC'){
    return 'danger'
  }else if(item.typename === 'PWN'){
    return 'primary'
  }else if(item.typename === 'RE'){
    return 'success'
  }
  return "info"

}

const goWp = ()=>{
  $router.push('/h8/wp')
}

const downLoadWp = (item)=>{
  window.location.href = item.writeupurl
}

</script>

<style scoped>
.action_wp{
  border-radius: 10px;
  .title{
    font-size: 16px;
    font-weight: bolder;
    align-content: center;
    justify-content: center;
    color: rgba(46,46,46,0.72)
  }
  .description{
    line-height: 30px;
    margin-top: 10px;
    font-size: 14px;
    color: rgba(97,95,95,0.69);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: auto;

  }
}
</style>