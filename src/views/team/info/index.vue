<!--
  Description：
  @date：2024-03-29 21:38
  @author：JokerWang
-->

<template>
  <div class="teaminfo">
    <div>
      <el-button type="primary" plain round style="font-size: 16px" size="large" icon="ArrowLeft" @click="goBackToTeam">返回</el-button>
    </div>
    <div style="display: flex;margin-top: 4vh;margin-left: 2vh">
      <div class="left">
        <el-card style="width: 40vw;border-radius: 10px">
          <div style="display:flex;justify-content: space-between;align-items: center">
            <div style="display:flex;">
              <img src="@/assets/images/login_background.jpg" style="width: 80px;height: 80px;border-radius: 50%"/>
              <div style="margin-left: 1vw;font-size: 20px;margin-top: 8px;color: rgba(52,50,50,0.67);font-weight: bolder">
                <div>{{ teamInfo.teamname }}</div>
                <div style="margin-top: 4vh;font-size: 14px;font-weight: bolder;color: rgba(97,94,94,0.56)">{{ teamInfo.teamtag }}</div>
              </div>
            </div>
            <div>
              <el-button
                  type="primary"
                  size="large"
                  style="font-size: 20px"
                  @click="addTeam"
                  :disabled="appliDisable"

              >
                {{ isAppliMessage }}
              </el-button>
            </div>
          </div>
          <div style="margin-top: 4vh;margin-left: 1vw;font-size: 18px;color: rgba(57,57,57,0.64)">
            <div>
              队伍介绍:&emsp;
              <span>
              {{ teamInfo.description }}
            </span>
            </div>
            <div style="margin-top: 4vh">
              队&emsp;&emsp;长:&emsp;
              <span>
              {{ teamInfo.teamleader }}
            </span>
            </div>
            <div style="margin-top: 4vh">
              创建时间:&emsp;
              <span>
              {{ teamInfo.createtime }}
            </span>
            </div>
            <div style="margin-top: 4vh">
              队伍排名:&emsp;
              <span>
              1
            </span>
            </div>
            <div style="margin-top: 4vh">
              队伍积分:&emsp;
              <span>
              2031
            </span>
            </div>
          </div>
          <el-divider></el-divider>
          <div style="font-size: 14px;font-weight: bolder;color: rgba(90,89,89,0.69)">战队成员</div>
          <div v-for="item in teamUserInfo" style="margin-top: 2vh">
            <img :src="getSrc(item)"
                 class="imguser" alt="" @click="goUser(item)">
          </div>
        </el-card>
        <el-card style="margin-top: 2vh;border-radius: 10px">
          <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.83)">解题动态</div>
          <el-timeline style="max-width: 600px;margin-top: 4vh;margin-left: 2vh">
            <el-timeline-item
                v-for="(activity, index) in actionRe"
                :key="index"
                :type="'success'"
                :size="'large'"
                style="font-size: 18px;margin-top: 1vh"
            >
              <div style="color: rgba(86,88,88,0.69);display: flex;justify-content: space-between;align-items: center">
                <div>
                  <span style="font-weight: bolder;color: #0eb4dd;cursor: pointer" @click="goUserAct(activity)">{{ activity.username }}</span>
                  解开了<span style="font-weight: bolder;color: #0eb4dd;cursor: pointer" @click="goChallenge(activity)">{{ activity.actionname }}</span>题
                </div>
                <div style="font-size: 12px">
                  {{ activity.createtime }}
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
      <div class="right">
        <el-card style="width: 30vw;border-radius: 10px;margin-left: 1vw">
          <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.83)">队伍成员</div>
          <div v-for="item in teamUserInfo">
            <div style="margin-top: 4vh;display: flex;justify-content: space-between;align-items: center">
              <div style="display:flex;">
                <img :src="getSrc(item)" style="width: 50px;height: 50px;border-radius: 50%;cursor: pointer" @click="goUser(item)">
                <div style="margin-left: 1vw;margin-top: 0.5vh;font-size: 14px;font-weight: bolder;color: rgba(63,63,63,0.76)">
                  <div style="cursor: pointer;color: #0eb3dc;" @click="goUser(item)">{{ item.user[0].username}}</div>
                  <el-tag
                      style="margin-top: 1vh"
                      :type="item.userinfo == '队长'?'primary':'warning'">
                    {{ item.userinfo }}
                  </el-tag>
                </div>
              </div>
              <div style="width: 8vw">
                <div style="color: #b14adf">
                  积分:&emsp;{{ item.solorank[0].rankpoints}}
                </div>
                <div style="margin-top: 2vh;color: #ebb047">
                  排行:&emsp;{{ item.solorank[0].ranking}}
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {reqAddTeamUserAppli, reqGetTeamById, reqGetTeamUserAppli} from "@/api/team/team.ts";
import {reqActionReByTeamId} from "@/api/action";
import useUserStore from "@/store/modules/user.ts";
import {reqGetUserInfo} from "@/api/user";

let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();

onMounted(async ()=>{
  await getTeamInfo()
  await getActionReByTeamList()
  await getApliTeamUser()
})

let teamId = $route.query.teamid;

let teamInfo = ref({
  createtime: "",
  description: "",
  operateuser: "",
  remark: "",
  status: 1,
  teamid: "",
  teamleader: "",
  teamleaderid: "",
  teamname: "",
  teamtag: "",
  updatetime: "",
});
let teamUserInfo = ref([]);
let actionRe = ref([]);
let isAppliMessage = ref();
let reqAppliTeam = ref({
  userid:'',
  teamid:'',
})
let reqTeamUserInfo = ref();
let appliDisable = ref<boolean>();
let userInfo = ref()
const goBackToTeam = ()=>{
  if(!$route.query.redirect){
    $route.query.redirect = '/h9/team'
  }
  $router.push({
    path:$route.query.redirect,
    query:{
      userid:$route.query.userid,
      challengeid:$route.query.challengeid,
    }
  })
}
const getApliTeamUser = async ()=>{
  reqAppliTeam.value.teamid = teamInfo.value.teamid
  reqAppliTeam.value.userid = userStore.userId
  let result = await reqGetTeamUserAppli(reqAppliTeam.value)
  reqTeamUserInfo.value = result.data;
  if(reqTeamUserInfo.value.status == 2){
    appliDisable.value = true;
    isAppliMessage.value = '已经申请'
  }else if(userStore.userId == teamInfo.value.teamleaderid){
    appliDisable.value = true;
    isAppliMessage.value = '我的队伍'
  }else  {
      appliDisable.value = false;
      isAppliMessage.value = '申请加入'
    }
  for (let i in teamUserInfo.value){
    if (teamUserInfo.value[i].user[0].userid == userStore.userId){
      appliDisable.value = true;
      isAppliMessage.value = '我的队伍'
    }
  }
}

const addTeam = async()=>{
  reqAppliTeam.value.teamid = teamInfo.value.teamid
  reqAppliTeam.value.userid = userStore.userId
  let result = await reqAddTeamUserAppli(reqAppliTeam.value)
  await getApliTeamUser()
}

const getActionReByTeamList= async ()=>{
  let result = await reqActionReByTeamId($route.query.teamid)
  if (result.code == 200){
    actionRe.value = result.data;
  }
}

const getTeamInfo = async ()=>{
  let result = await reqGetTeamById(teamId)
  console.log(result)
  if(result.code == 200){
    teamInfo.value = result.data.teaminfo;
    teamUserInfo.value = result.data.userinfo;
  }
  for (let i in teamUserInfo.value){
    if (teamInfo.value.teamleaderid == teamUserInfo.value[i].user[0].userid){
      teamUserInfo.value[i].userinfo = '队长'
    }else {
      teamUserInfo.value[i].userinfo = '成员'
    }
  }


}

const getSrc = (item) =>{
  if(!item.user[0].avatar){
    return "https://jokerwwt.oss-cn-hangzhou.aliyuncs.com/sakuraj/avatar/login_background.jpg"
  }else {
    return item.user[0].avatar

  }
}

const goUser = (item)=>{
  $router.push({path:'/h6/user/info',query:
        {
          userid:item.user[0].userid,
          teamid: teamInfo.value.teamid,
          redirect: $route.path ,
        }}
  )
}

const goUserAct = (activity)=>{
  $router.push({path:'/h6/user/info',query:
        {
          userid: activity.userid,
          teamid: teamInfo.value.teamid,
          redirect: $route.path ,
        }}
  )
}

const goChallenge = (activity)=>{
  $router.push({path:'/h7/challenge/info',query:
        {
          userid: userStore.userId,
          teamid: teamInfo.value.teamid,
          challengeid: activity.challengeid,
          redirect: $route.path ,
        }}
  )
}


</script>

<style scoped lang="scss">
.teaminfo{
  margin: 3vh 4vw;

  .left{
    .imguser{
      width: 40px;
      height:40px;
      border-radius: 50%;
      float: left;
      margin-left: 0.5vw;
      margin-bottom: 4vh;
      cursor: pointer;
      z-index: 10;
    }
    .imguser:hover{
      transition: 0.5s; //动画过渡的更加顺滑
      transform: scale(1.3); //放大倍数
    }
  }
}
</style>