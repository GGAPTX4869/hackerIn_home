<!--
  Description：
  @date：2024-03-28 18:47
  @author：JokerWang
-->

<template>
  <div class="challengeinfo_container">
    <el-button type="primary" plain round style="font-size: 16px" size="large" icon="ArrowLeft" @click="goBackToChallenge">返回</el-button>
    <div class="card">
      <div class="left">
        <el-card style="margin-top: 2vh;margin-left: 1vw;border-radius: 10px;width: 50vw">
          <div style="display: flex;align-items: center;justify-content: space-between">
            <div style="display:flex; align-items: center">
              <div style="margin: 1vh;font-size: 22px;font-weight: bolder;color: rgba(91,91,91,0.68)">{{ challengeInfo.challengename }}</div>
              <el-tag type="warning" size="small">{{ challengeInfo.comptype }}</el-tag>
              <el-tag type="primary" style="margin-left: 1vw" size="small">{{ challengeInfo.challengetype }}</el-tag>
              <el-tag :type="challengeInfo.back=='已解决'?'success':'danger'" style="margin-left: 1vw" size="small">{{ challengeInfo.back=='已解决'?'已解决':'未解决' }}</el-tag>
            </div>
            <div>
        <span style="font-size: 16px;color: #0eb4dd">
          金币:
          <span style="font-size: 18px">
            {{ challengeInfo.golden }}
          </span>
        </span>
              <span style="margin-left: 2vw;color:rgba(136,76,168,0.8);">
          积分:
          <span  style="font-size: 18px">
            {{ challengeInfo.points }}
          </span>
        </span>
            </div>
          </div>
          <div style="margin-left: 1vw;margin-top: 2vh;font-size: 16px;font-weight: bolder;color: rgba(97,97,97,0.55)">
            <div>
              出题作者：{{ challengeInfo.operator }}
            </div>
            <div style="margin-top: 3vh">
              一&emsp;&emsp;血：{{ challengeInfo.fbname }}
            </div>
            <div style="margin-top: 3vh">
              一血奖励：额外积分{{ challengeInfo.fbreward }}
            </div>
            <div style="margin-top: 3vh">
              解决人数：{{ challengeInfo.solved }}
            </div>
            <div style="margin-top: 3vh">
              结题提示：{{ challengeInfo.tips }}
            </div>
            <div style="margin-top: 3vh;display: flex;height: auto;">
              <div>
                题目描述：
              </div>
              <div style="
        width: 30vw;
        display: -webkit-box;
        word-break: break-all;
        word-wrap: break-word;
        line-height: 18px;
        height: 10vh;">
                {{ challengeInfo.description }}
              </div>
            </div>

          </div>
          <div style="margin-left: 1vw;margin-top: 4vh;">
            <div style="text-align: center">
              <el-button :type="isOpenChallengeType" size="large" @click="openTheChallenge"
                         :Loading="isLoading"
              >{{ isOpenChallengeMessage }}</el-button>
              <el-countdown
                  v-show="isTimeLeftShow"
                  title="容器剩余时长"
                  format="HH:mm:ss"

                  :value="timeLeft"
              />
              <div v-show="GET_DOCKERURL()&&isTimeLeftShow" style="margin-top: 2vh">
                环境地址:<span
                  style="cursor: pointer;color: #0eb3dc"
                  @click="goUrl"
              >http://{{ GET_DOCKERURL() }}/</span>
              </div>
              <div style="margin-top: 2vh;color: #0eb4dd;cursor: pointer" v-show="GET_ATTACHMENT_URL()&&isTimeLeftShow" @click="getAttachMent">
                点击下载附件
              </div>
            </div>
            <div style="margin-top: 6vh;text-align: center">
              <el-input placeholder="提交flag" style="width: 300px" v-model="inputFlag"/>
              <el-button type="primary" style="margin-left: 1vw" @click="CheckFlag">提交</el-button>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 2vh;margin-left: 1vw;border-radius: 10px;width: 50vw">

          <Reply/>

        </el-card>
      </div>
      <div class="right">
        <el-card style="width: 25vw;margin-top: 2vh;border-radius:10px;margin-left: 1vw;">
          <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.6)">WP题解</div>
          <el-table
              :data="wpList"
          >
            <el-table-column label="下载量" prop="downloading" width="80px" align="center">
            </el-table-column>
            <el-table-column label="提供人" prop="operator" align="center">
            </el-table-column>
            <el-table-column label="价值金币" prop="golden" align="center">
            </el-table-column>
            <el-table-column label="下载链接"  align="center">
              <template  #="{ row, $index }">
                <el-button type="primary" >下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card style="width: 25vw;margin-top: 2vh;border-radius:10px;margin-left: 1vw;">
          <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.6)">解题动态</div>
          <el-timeline style="max-width: 600px;margin-top: 4vh;margin-left: 2vh">
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :type="'success'"
                :size="'large'"
                :timestamp="activity.createtime"
                style="font-size: 18px;margin-top: 1vh"
            >
              <span style="color: rgba(86,88,88,0.69)">
                <span style="font-weight: bolder;color: #0eb4dd;cursor: pointer" @click="goUser(activity.userid)">{{ activity.username }}</span>
                解开了这道题
              </span>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
    </div>
  </div>


</template>

<script setup lang='ts'>
import Reply from '../reply/index.vue'
import {onMounted, ref} from "vue";
import {reqGetChallengeById} from "@/api/challenge";
import useChallengeStore from "@/store/challenge/challenge.ts";
import {useRoute, useRouter} from "vue-router";
import {reqGetWpListByGroup} from "@/api/wp";
import useUserStore from "@/store/modules/user.ts";
import {
  DEL_ATTACHMENT_URL,
  DEL_CHALLENGEID, DEL_CONTAINER_ID, DEL_DOCKERURL,
  DEL_TIME_LEFT, GET_ATTACHMENT_URL,
  GET_CHALLENGEID, GET_CONTAINER_ID, GET_DOCKERURL,
  GET_TIME_LEFT, SET_ATTACHMENT_URL,
  SET_CHALLENGEID, SET_CONTAINER_ID, SET_DOCKERURL,
  SET_TIME_LEFT
} from "@/utils/challenge.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {reqDelDocker, reqOpenDocker} from "@/api/docker";
import {reqCheckUpFlag, reqGetActionReAllById, reqGetActionReList} from "@/api/action";
import useLayoutSettingStore from "@/store/setting.ts";

let $router = useRouter();
let userStore = useUserStore();
let $route = useRoute();
let layoutSeettingStore = useLayoutSettingStore()

onMounted(async ()=>{
  await getActionRe();
  await getChallengeInfo();
  await getWpList();
  await getActionReList();
  await isTimeLeft();

})
// ——————————————————————————————————————————————————————————————
// 信息栏
let actionReList = ref([]);
let challengeInfo  = ref<any>({
  challengeid:'',
  challengename:'',
  challengetype:'',
  challengetypeid:'',
  comptype:'',
  comptypeid:'',
  createtime:'',
  description:'',
  fbname:'',
  fbreward:0,
  flag:'',
  golden:0,
  imageid:'',
  imagename:'',
  imageurl:'',
  points:0,
  remark:'',
  solved:0,
  status:0,
  tips:'',
  back:'',
  updatetime:'',
});
let timeLeft = ref(Date.now() + 1000 * 60 * 60 * 2)
let isTimeLeftShow = ref(false)
let isOpenChallengeMessage = ref("开启环境")
let isLoading = ref<boolean>(false)
let isOpenChallengeType = ref("primary")
let openContainerInfo = ref({
  containername:"",
  port:80,
  imageid:""
})

const getActionRe = async ()=>{
  let result = await reqGetActionReAllById(userStore.userId)
  actionReList.value = result.data;
}
const getWpList = async ()=>{
  let resData = ref({
    page:1,
    limit:8,
    challengename:challengeInfo.value.challengename,
  })

  let result = await reqGetWpListByGroup(resData.value)
  wpList.value = result.data;
}

let wpList = ref([])
let inputFlag = ref('');
let activities = ref([])
const getChallengeInfo = async ()=>{
  let challengeid = $route.query.challengeid
  let result = await reqGetChallengeById(challengeid)
  challengeInfo.value = result.data;
  for (let i in actionReList.value){
    if (challengeInfo.value.challengeid == actionReList.value[i].challengeid){
      challengeInfo.value.back = '已解决'
    }
  }
}
const goBackToChallenge = () =>{
  if(!$route.query.redirect){
    $route.query.redirect = '/h1/challenge'
  }
  $router.push({
    path:$route.query.redirect,
    query:{
      userid:$route.query.userid,
      teamid:$route.query.teamid,
    }
  })
}
const isTimeLeft = ()=>{
  if(GET_CHALLENGEID() == challengeInfo.value.challengeid){
    isTimeLeftShow.value = true
    timeLeft.value = GET_TIME_LEFT()
    isOpenChallengeMessage.value = "关闭容器"
    isOpenChallengeType.value = "warning"
  }else {
    isOpenChallengeMessage.value = "开启容器"
    isOpenChallengeType.value = "primary"
    isTimeLeftShow.value = false
  }
}
const goUrl = ()=>{
  window.open("http://" + GET_DOCKERURL() + "/", '_blank')
}
const getAttachMent = ()=>{
  window.open(challengeInfo.value.attachmenturl, '_blank')
}
const getDockerUrl = async ()=>{
  openContainerInfo.value.containername = challengeInfo.value.challengename + "—" + userStore.username
  openContainerInfo.value.imageid =  challengeInfo.value.imageid
  if(openContainerInfo.value.imageid != ""){
    let result = await reqOpenDocker(openContainerInfo.value)
    if(result.code == 200){
      SET_DOCKERURL(result.data.ipport)
      SET_CONTAINER_ID(result.data.containerid)
      SET_ATTACHMENT_URL(result.data.attachmenturl)
    }
    return true
  }
  return false
}
const openTheChallenge = ()=>{
  if(isTimeLeftShow.value == false){
    if(GET_CHALLENGEID() != challengeInfo.value.challengeid && GET_CHALLENGEID() != null){
      ElMessageBox.confirm(
          '目前有其他容器正在启用中，是否关闭已开启容器',
          'Warning',
          {
            type: 'warning',
          }
      ).then(async ()=>{
        isLoading.value = true
        isOpenChallengeMessage.value = "正在关闭"
        if(GET_CONTAINER_ID() != "" && GET_CONTAINER_ID() != null){
          await reqDelDocker()
        }
        isLoading.value = true
        isOpenChallengeMessage.value = "正在启动"
        await getDockerUrl();
        isLoading.value = false;
        isOpenChallengeMessage.value = "关闭容器";
        isOpenChallengeType.value = "warning";
        isTimeLeftShow.value = true;
        await SET_TIME_LEFT(timeLeft.value)
        await SET_CHALLENGEID(challengeInfo.value.challengeid)
        layoutSeettingStore.refresh = !layoutSeettingStore.refresh

          }
      )
    }else {
      ElMessageBox.confirm(
          '是否开启容器',
          'Warning',
          {
            type: 'warning',
          }
      ).then(async ()=>{
        isLoading.value = true
        isOpenChallengeMessage.value = "正在启动"
        await getDockerUrl()
        isLoading.value = false
        isOpenChallengeMessage.value = "关闭容器";
        isOpenChallengeType.value = "warning";
        isTimeLeftShow.value = true;
        SET_TIME_LEFT(timeLeft.value)
        SET_CHALLENGEID(challengeInfo.value.challengeid)
          }
      )
    }
  }else {
    ElMessageBox.confirm(
        '是否关闭容器',
        'Warning',
        {
          type: 'warning',
        }
    ).then(async ()=>{
      isLoading.value = true
      isOpenChallengeMessage.value = "正在关闭";
      if(GET_CONTAINER_ID() != "" && GET_CONTAINER_ID() != null){
        await reqDelDocker()
      }
        isLoading.value = false
        isOpenChallengeType.value = "primary";
        isOpenChallengeMessage.value = "开启容器";

      DEL_TIME_LEFT()
      DEL_CHALLENGEID()
      DEL_CONTAINER_ID()
      DEL_ATTACHMENT_URL()
      DEL_DOCKERURL()

      isTimeLeftShow.value = false;

        }
    )
  }
}
const CheckFlag =async ()=>{
  if(inputFlag.value == challengeInfo.value.flag){
    await reqCheckUpFlag(challengeInfo.value.challengeid)
    ElMessage({
      type:'success',
      message:'Flag正确,提交成功'
    })
    layoutSeettingStore.refresh = !layoutSeettingStore.refresh
  }else {
    ElMessage({
      type:'error',
      message:'Flag错误'
    })
  }
}
const getActionReList = async ()=>{
  let result  = await reqGetActionReList({
    page:1,
    limit:10,
    challengeid:challengeInfo.value.challengeid,
  })
  activities.value = result.data;
}

const goUser = (item)=>{
  $router.push({path:'/h6/user/info',query:{
    userid:item,
      challengeid: $route.query.challengeid,
      redirect: $route.path,
  }})
}

</script>

<style scoped>
.challengeinfo_container{
  margin-top: 2vh;
  padding: 10px;
  .card{
    display: flex;

  }
}
</style>