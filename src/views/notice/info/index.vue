<!--
  Description：
  @date：2024-03-30 17:19
  @author：JokerWang
-->

<template>
  <div class="artinfo">
    <el-button type="primary" plain round style="font-size: 16px" size="large" icon="ArrowLeft" @click="goBackToNotice">返回公告</el-button>
    <div style="margin: 2vh 3vw">
      <el-card style="border-radius: 10px">
        <div style="display: flex;justify-content: center;font-size: 26px;font-weight: bolder">
          {{ noticeInfo.actionname }}
        </div>
        <div style="display:flex;justify-content: center;margin-top: 3vh">
          <span style="font-size: 8px;display: flex;align-items: center;color: rgba(98,98,98,0.67)"><svg-icon name="artuser" />{{ noticeInfo.operator }}</span>
          <span style="font-size: 8px;display: flex;align-items: center;margin-left:1vw;color: rgba(98,98,98,0.67)"><svg-icon name="read" />{{ noticeInfo.reader }}</span>
          <span style="font-size: 8px;display: flex;align-items: center;margin-left:1vw;color: rgba(98,98,98,0.67)"><svg-icon name="artreply" />{{ noticeInfo.comment }}</span>
          <span style="font-size: 8px;display: flex;align-items: center;margin-left:1vw;color: rgba(98,98,98,0.67)"><svg-icon name="time" />{{ noticeInfo.createtime }}</span>
        </div>
        <el-divider>
        </el-divider>
        <v-md-preview :text="content"></v-md-preview>
      </el-card>
      <el-card style="border-radius: 10px;margin-top: 2vh">
        <Reply/>
      </el-card>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Reply from '../reply/index.vue'
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetNoticeById, reqRefreshComment} from "@/api/action";

let $router = useRouter();
let $route = useRoute();
const content =ref()
let noticeInfo = ref({
  actionid: 1,
  actionname: "",
  actionstatus: 1,
  actiontype: 2,
  challengeid: "",
  comment: 0,
  createtime: "",
  description:"",
  operator: "",
  reader: 0,

});

onMounted(async ()=>{
  let actionId = $route.query.actionid
  await getActionById(actionId)
  content.value = noticeInfo.value.description
  await refreshComment(actionId)
})

const goBackToNotice = ()=>{
  if ( $route.query.redirect == null){
    $router.push('/h3/notice')
  }else {
    $router.push({
      path:$route.query.redirect
    })
  }

}

const getActionById = async (actionid:any)=>{
  let result = await reqGetNoticeById(actionid);
  console.log(result)
  if (result.code == 200){
    noticeInfo.value = result.data;
  }
}
const refreshComment  = (id) => {
  reqRefreshComment(id)
}

</script>

<style scoped>
.artinfo{
  margin: 2vh 6vw;
}
</style>