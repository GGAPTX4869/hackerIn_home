<!--
  Description：
  @date：2024-03-27 16:58
  @author：JokerWang
-->

<template>
  <div class="checkin">
    <el-card class="card">
      <span style="font-weight: bolder;font-size: 20px;width: 10vw">
        已连续签到{{ checkUserInfo.checktimes }}天
      </span>
      <span style="font-weight: bolder;font-size: 16px;margin-top: 5vh;margin-left: 4vw">
        累计签到{{ checkTotal }}天
      </span>
     <div style="margin-top: 3vh">

       <el-button type="primary"
                  plain
                  :disabled="isDisabled"
                  style="
                 border: none;
                 color: rgba(8,8,8,0.51);
                 font-weight: bolder;
                 border-radius: 10px;"
                  :style="{'background':backColor}"
                  size="large"
                  @click="checkLogin"
       >
         {{ checkUserInfo.checkstatus == 1?'已签到':'签到'}}
       </el-button>
       <span style="margin-left: 8vw;font-weight: bolder" >
         查看签到规则
       </span>
     </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>


import {reqCheckUser, reqGetCheckInfo} from "@/api/user";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

let checkUserInfo = ref({
  checktimes: 0,
  logintime: "",
  remisc: 0,
  rerypto: 0,
  reverse: 0,
  reweb: 0,
  rewn: 0,
  checkstatus:0,
  userid: "",
  username: "",
});
let checkTotal = ref();
let backColor = ref();
let isDisabled = ref();

onMounted(async ()=>{
  await getCheckUserInfo()
})

const getCheckUserInfo = async ()=>{
  let result = await reqGetCheckInfo()
  console.log(result);
  checkUserInfo.value = result.data;

  if (result.total == null){
    checkTotal.value = 0
  }else {
    checkTotal.value = result.total;
  }
  console.log(checkUserInfo.value.checkstatus)
  if (checkUserInfo.value.checkstatus == 1){
    backColor.value = 'rgba(71,228,145,0.89)'
    isDisabled.value = true
  }else {
    backColor.value = '#674fe2'
    isDisabled.value = false
  }
}

const checkLogin = async () => {
  let result = await reqCheckUser()
  if( result.code == 200){
    await getCheckUserInfo()
    ElMessage({
      type:'success',
      message:'签到成功'
    })
  }
}

</script>

<style scoped lang="scss">
.checkin{

  .card{
    display: flex;
    border-radius: 10px;
    height: 15vh;
    background-image: url("@/assets/images/sakura.jpg");

  }

}
</style>