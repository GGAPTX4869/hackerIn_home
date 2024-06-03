<!--
  Description：
  @date：2024-03-27 18:20
  @author：JokerWang
-->

<template>
  <el-card class="actionrace">
    <div style="justify-content: space-between;display: flex;text-align: center">
      <div style="font-weight: bolder;font-size: 18px;color: rgba(0,0,0,0.56)">
        最新赛事动态
      </div>
      <el-button type="text" size="small" @click="goComp">
        更多>>
      </el-button>
    </div>

    <div
        v-for="item in compList"
        style="margin-top: 20px;"
    >
      <div style="font-size: 20px;font-weight: bolder;align-content: center;justify-content: center;color: rgba(46,46,46,0.72)">
        {{ item.competitonname }}
      </div>
      <div style="margin-top: 2vh">
        <el-tag :type="getType(item)" >
          {{ item.typemessage }}
        </el-tag>
        <el-tag type="primary" style="margin-left: 1vw">
          {{ item.comptypename }}
        </el-tag>
      </div>
      <div style="margin-top: 10px;font-size: 16px;font-weight: bolder;color: rgba(67,67,67,0.78);   display: -webkit-box;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 2vw;"
      >赛事链接:
        <span style="color: #79bad5;font-size: 12px;cursor: pointer" @click="goCompUrl(item)">
          {{ item.compurl }}
        </span>


      </div>
      <div style="margin-top: 1vh;font-size: 16px;font-weight: bolder;color: rgba(67,67,67,0.78)" >
        <div>
            赛事时间:
          <span style="font-weight: bolder;font-size: 12px">
              {{ item.begintime.slice(0,-3) }} 至 {{ item.endtime.slice(0,-3) }}
          </span>
        </div>
        <div style="margin-top: 2vh;font-size: 16px;font-weight: bolder;color: rgba(67,67,67,0.78)">
          持续时间:
          <span style="font-weight: bolder;font-size: 12px">
         {{ item.duration }}
          </span>
        </div>
    </div>
      <el-divider />
    </div>
  </el-card>

</template>

<script setup lang='ts'>

import {onMounted, ref} from "vue";
import {reqGetCompByDesc, reqGetCompListByGroup} from "@/api/comp/comp.ts";
import {useRouter} from "vue-router";
onMounted(async ()=>{
  await getCompList();
})

let $router = useRouter();

let compList = ref([{
  begintime: "",
  competitonid: 0,
  competitonname: "",
  comptypeid: "",
  comptypename: "",
  compurl: "",
  createtime: "",
  description: "",
  duration: "",
  endtime: "",
  operator: "",
  status: 0,
  typemessage:'',
}]);

let pagination = ref({
  page:1,
  limit:3,
})



const getCompList = async ()=>{
  let result = await reqGetCompByDesc(pagination.value.page,pagination.value.limit)
  if(result.code == 200){
    compList.value = result.data;
  }
}



const getType = (item)=>{
  let nowDate = new Date();
  let beginDate = new Date(item.begintime);
  let endDate =  new Date(item.endtime);
  if (nowDate - beginDate > 0){
    item.typemessage = '即将开始'
    return 'warning'
  }else if(nowDate - endDate > 0){
    item.typemessage = '已经结束'
    return 'danger'
  }else{
    item.typemessage = '正在进行'
    return 'success'
  }
  return 'success'
}
const goCompUrl = (row)=>{
  window.location.href = row.compurl
}

const goComp = ()=>{
  $router.push('/h5/competition')
}
</script>

<style scoped>
.actionrace{
  border-radius: 10px;
}
</style>