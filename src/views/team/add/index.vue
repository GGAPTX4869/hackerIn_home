<!--
  Description：
  @date：2024-04-07 21:03
  @author：JokerWang
-->

<template>
  <div style="margin: 3vh 6vw;">
    <el-button
        type="primary"
        plain round
        style="font-size: 16px"
        size="large" icon="ArrowLeft"
        @click="goBack">返回</el-button>

    <el-card style="border-radius: 10px;margin: 2vh 2vw;">
      <div style="display: flex;justify-content: center">
        <div style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">创建队伍</div>
      </div >
      <el-form style="margin: 6vh 15vw" label-width="100px">
        <el-form-item label="队伍名称"
        >
          <el-input
          placeholder="请输入队伍名称"
          style="width: 20vw"
          v-model="addTeamInfo.teamname"
          >
          </el-input>
        </el-form-item >
        <el-form-item label="队长" style="margin-top: 6vh">
          <el-input
              :placeholder="userInfo.username"
              style="width: 20vw"
              disabled
              v-model="userInfo.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="队伍标签" style="margin-top: 6vh">
          <el-input
              placeholder="请输入队伍标签"
              v-model="addTeamInfo.teamtag"
              style="width: 20vw"
              maxlength="20"
              :show-word-limit="true"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" style="margin-top: 6vh">
          <el-input
              placeholder="请输入队伍描述"
              v-model="addTeamInfo.description"
              style="width: 20vw"
              maxlength="30"
              :show-word-limit="true"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" style="margin-top: 6vh">
          <el-input
              placeholder="请输入备注"
              v-model="addTeamInfo.remark"
              style="width: 20vw"
              maxlength="50"
              :show-word-limit="true"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="display: flex;justify-content: right">
          <el-button size="large" type="warning" @click="refresh">重置</el-button>
          <el-button  size="large" type="primary" @click="upLoad">提交</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang='ts'>


import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetUserInfo} from "@/api/user";
import {reqAddAduitTeam} from "@/api/team/team.ts";
import {ElMessage} from "element-plus";

let $route = useRoute();
let $router = useRouter();
onMounted(async ()=>{
  await getUserInfo()
})

let userInfo = ref({
  avatar: "",
  createtime: "",
  email: "",
  ipaddress: "",
  lastlogin: "",
  password: "",
  phonenumber: "",
  realname: "",
  remark: "",
  stunumber: "",
  updatetime: "",
  userid: "",
  username: "",
  userstatus: 1,
  usertype: 1,
});
let addTeamInfo = ref({
  teamname:'',
  teamleader:'',
  teamleaderid:'',
  description:'',
  status:1,
  remark:'',
  teamtag:'',
});


const getUserInfo = async ()=>{
  let result = await reqGetUserInfo();
  if (result.code == 200){
    userInfo.value = result.data;
  }
  console.log(userInfo.value)

}
const goBack = ()=>{
  if ($route.query.redirect){
    $router.push({
      path:$route.query.redirect
    })
  }else {
    $router.push({
      path:'/h9/team'
    })
  }

}

const refresh = ()=>{
  addTeamInfo.value.teamname= ''
  addTeamInfo.value.teamleader = ''
  addTeamInfo.value.teamleaderid = ''
  addTeamInfo.value.description = ''
  addTeamInfo.value.status = 1
  addTeamInfo.value.remark = ''
  addTeamInfo.value. teamtag = ''
}
const upLoad = async ()=>{
  let result = await reqAddAduitTeam(addTeamInfo.value)
  if (result.code == 200){
    ElMessage({
      type:'success',
      message:'上传成功'
    })
    await $router.push({
      path:'/tips/success',
      query:{
        redirect:$route.path
      }
    })
  }else {
    ElMessage({
      type:'error',
      message:'系统错误'
    })
  }
}
</script>

<style scoped>

</style>