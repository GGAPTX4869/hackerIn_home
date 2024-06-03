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
              <el-dropdown>
                <el-button
                    type="primary"
                    size="large"
                    style="font-size: 20px"
                >
                  操作中心<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-badge
                          :value="checkConfirmTotal"
                          class="item"
                          >
                        <el-button type="primary" @click="checkAppli">申请信息</el-button>
                      </el-badge>

                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="warning" @click="editTeam">修改信息</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="danger" @click="delTeam">解散队伍</el-button>
                    </el-dropdown-item>

                  </el-dropdown-menu>
                </template>
              </el-dropdown>

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
  <el-dialog v-model="isCheckVisiable" title="队员审批">
    <el-table
    :data="addConfTeamUserList"
    >
      <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column label="用户名" prop="userInfo" align="center">
        <template #="{ row, $index }">
            <span style="color: #0eb3dc;cursor: pointer" @click="goUserInfo(row)">
              {{ row.userinfo.username }}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="用户排名" prop="userInfo" align="center">
        <template #="{ row, $index }">
            <span>
              {{ row.userrank.ranking }}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="用户积分" prop="userInfo" align="center">
        <template #="{ row, $index }">
            <span>
              {{ row.userrank.rankpoints }}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="解题数量" prop="userInfo" align="center">
        <template #="{ row, $index }">
            <span>
              {{ row.userrank.questionre }}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="userInfo" align="center">
        <template #="{ row, $index }">
          <div style="display: flex;justify-content: space-between">
            <div>
              <el-button size="default" type="success" plain @click="checkUserInfo(row)">
                <el-icon color="green"><Check/></el-icon>
              </el-button>
            </div>
            <div>
              <el-button size="default" type="danger" plain @click="ConfuseUserInfp(row)">
                <el-icon><Close/></el-icon>
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-drawer v-model="isEditTeamVision" title="队伍信息">
    <el-form style="margin-left: 10px" label-width="100px">
      <el-form-item label="队伍名称">
        <el-input
            style="width: 16vw"
            :placeholder="editTeamInfo.teamname"
            v-model="editTeamInfo.teamname"
        ></el-input>
      </el-form-item>
      <el-form-item label="队长" style="margin-top: 6vh">
        <el-input
            style="width: 16vw"
            disabled
            :placeholder="editTeamInfo.teamleader"
            v-model="editTeamInfo.teamleader"
        ></el-input>
      </el-form-item>
      <el-form-item label="队伍标签" style="margin-top: 6vh">
        <el-input
            placeholder="请输入队伍标签"
            v-model="editTeamInfo.teamtag"
            style="width: 16vw"
            maxlength="20"
            :show-word-limit="true"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" style="margin-top: 6vh">
        <el-input
            placeholder="请输入队伍描述"
            v-model="editTeamInfo.descrption"
            style="width: 16vw"
            maxlength="30"
            :show-word-limit="true"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" style="margin-top: 6vh">
        <el-input
            placeholder="请输入备注"
            v-model="editTeamInfo.remark"
            style="width: 16vw"
            maxlength="50"
            :show-word-limit="true"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="队伍成员" style="margin-top: 6vh">
        <el-select
            v-model="editUser"
            multiple
            default-first-option
            :reserve-keyword="false"
            placeholder="请选择队友"
            style="width: 16vw"
        >
          <el-option
              v-for="item in userInfoAllList"
              :key="item.userid"
              :label="item.username"
              :value="item.userid"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto; margin-right: 240px">
        <el-button type="warning" size="large" @click="editCancel">
          取消
        </el-button>
        <el-button type="primary" size="large" @click="editConform">
          确认
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang='ts'>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  reqAddTeamUserAppli,
  reqConfirmTeamUserAppli, reqDelTeam, reqDelTeamUser,
  reqGetConfTeamUserById,
  reqGetTeamById, reqGetTeamInfoById,
  reqGetTeamUserAppli, reqGetTeamUserList, reqUpdateTeam, reqUpdateTeamUser
} from "@/api/team/team.ts";
import {reqActionReByTeamId} from "@/api/action";
import useUserStore from "@/store/modules/user.ts";
import {reqGetAllUser, reqGetUserInfo} from "@/api/user";
import {ElMessage, ElMessageBox} from "element-plus";

let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();

onMounted(async ()=>{
  await getTeamInfo()
  await getActionReByTeamList()
  await getApliTeamUser()
  await getConfTeamUser()

})

let teamId = $route.query.teamid;
let addConfTeamUserList =  ref([]);
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
let checkConfirmTotal = ref();
let isAppliMessage = ref();
let isCheckVisiable = ref<boolean>(false);
let isEditTeamVision = ref<boolean>(false)
let reqAppliTeam = ref({
  userid:'',
  teamid:'',
})
let reqTeamUserInfo = ref();
let appliDisable = ref<boolean>();
let userInfo = ref()
let editUser = ref([])
let userInfoAllList = ref<{
  avatar: ''
  createtime: ''
  email: ''
  ipaddress: ''
  lastlogin: ''
  password: ''
  phonenumber: ''
  realname: ''
  remark: ''
  stunumber: ''
  updatetime: ''
  userid: ''
  username: ''
  userstatus: 1
  usertype: 1
}>([])
let updateTeamUser = ref({
  teamid: '',
  userid: [],
})
let editTeamInfo = ref({
  createtime: '',
  descrption: '',
  description: '',
  operateuser: '',
  remark: '',
  status: 1,
  teamid: '',
  teamleader: '',
  teamleaderid: '',
  teamname: '',
  teamtag: '',
  updatetime: '',
})
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


const getActionReByTeamList= async ()=>{
  let result = await reqActionReByTeamId($route.query.teamid)
  if (result.code == 200){
    actionRe.value = result.data;
  }
}

const getTeamInfo = async ()=>{
  let result = await reqGetTeamById(teamId)
  if(result.code == 200){
    teamInfo.value = result.data.teaminfo;
    teamUserInfo.value = result.data.userinfo
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

const goUserInfo = (row)=>{
  $router.push({path:'/h6/user/info',query:
        {
          userid: row.userinfo.userid,
          teamid: row.teamuser.tcid,
          redirect: $route.path ,
        }}
  )
}
const checkAppli = async ()=>{
  isCheckVisiable.value = true
  await getConfTeamUser()
}

const getConfTeamUser = async ()=>{
  let result = await reqGetConfTeamUserById(teamInfo.value.teamid)
  addConfTeamUserList.value = result.data;
  checkConfirmTotal.value = result.total;
}

const checkUserInfo = async (row)=>{
  let reInfo = ({
    userid: row.userinfo.userid,
    teamid:teamInfo.value.teamid,
  })
  let result = await reqConfirmTeamUserAppli(reInfo)
  if (result.code == 200){
    await getTeamInfo()
    await getActionReByTeamList()
    await getApliTeamUser()
    await getConfTeamUser()
    ElMessage({
      type:'success',
      message:'同意用户加入',
    })
  }
}

const ConfuseUserInfp = async (row)=>{
  let reInfo = ({
    userid: row.userinfo.userid,
    teamid:teamInfo.value.teamid,
  })
  let result = await reqDelTeamUser(reInfo)
  if (result.code == 200){
    await getTeamInfo()
    await getActionReByTeamList()
    await getApliTeamUser()
    await getConfTeamUser()
    ElMessage({
      type:'warning',
      message:'已拒绝用户加入',
    })
  }
}

const editTeam = async (row) => {
  console.log(teamInfo.value.teamid)
  let result = await reqGetTeamInfoById(teamInfo.value.teamid)
  editTeamInfo.value = result.data
  console.log(result)
  let resultUserId = await reqGetTeamUserList(teamInfo.value.teamid)
  console.log(resultUserId)
  editUser.value = resultUserId.data.userid
  isEditTeamVision.value = true
  await getAllUserInfo()
}

const getAllUserInfo = async () => {
  let result = await reqGetAllUser()
  console.log(result)
  userInfoAllList.value = result.data
}

const editCancel = () => {
  isEditTeamVision.value = false
}

const editConform = async () => {
  let result = await reqUpdateTeam(editTeamInfo.value)
  updateTeamUser.value.teamid = editTeamInfo.value.teamid
  updateTeamUser.value.userid = editUser.value
  let resultTeamUser = await reqUpdateTeamUser(updateTeamUser.value)
  if (result.code == 200 && resultTeamUser.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    isEditTeamVision.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '系统异常',
    })
  }
}

const delTeam = async ()=>{
  ElMessageBox.confirm(
      '确认解散队伍吗?',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'error',
      }
  )
      .then(async () => {
        let result = await reqDelTeam(row.teamid)
        if (result.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
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