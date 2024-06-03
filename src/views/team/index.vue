<!--
  Description：
  @date：2024-03-29 16:05
  @author：JokerWang
-->

<template>
  <div class="team">
    <div style="display: flex;justify-content: space-between;">
      <div style="display: flex;align-items: center">
        <div style="font-size: 22px;font-weight: bolder;color: rgba(89,91,91,0.86);">
         队伍列表
        </div>
        <div>
          <el-input style="width: 12vw;margin-left: 3vw" placeholder="输入队伍名称"  v-model="selectTeamName">

          </el-input>
          <el-button type="primary" style="margin-left: 2px" @click="getTeamList">
            搜索
          </el-button>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="goMyTeam">
          我的战队
        </el-button>
        <el-button type="primary" @click="goAddMyTeam">
          创建战队
        </el-button>
      </div>
    </div>
    <div style="display: flex;flex-wrap: wrap;">
      <div v-for="item in teamList">
        <el-card class="teamcard" @click="goTeamInfo(item)">
          <div style="display:flex;">
            <div>
              <img src="@/assets/images/login_background.jpg" style="width: 60px;height:60px;border-radius: 50%">
            </div>
            <div>
              <div style="margin-left: 1vw;">
                {{ item.teaminfo.teamname}}
              </div>
              <div style="margin-left: 1vw;margin-top: 1vh;font-size: 12px;color: rgba(116,115,115,0.84)">
                RankList:1
              </div>
              <div style="margin-left: 1vw;margin-top: 1vh;font-size: 12px;color: rgba(116,115,115,0.84)">
                {{ item.teaminfo.createtime }}
              </div>
            </div>
          </div>
          <div style="margin-top: 3vh;">
            <div style="font-size: 14px;font-weight: bolder;color: rgba(90,89,89,0.69)">
              战队简介:
            </div>
          <div
              style="
              width: 20vw;
              font-size: 14px;
              color: rgba(98,97,97,0.71);
              display: -webkit-box;
              word-break: break-all;
              word-wrap: break-word;
              margin-left: 1vw;
              margin-top: 1vh;
              line-height: 18px;
               height: 8vh;"
          >
            {{ item.teaminfo.description}}
          </div>
          </div>
          <el-divider></el-divider>
          <div style="font-size: 14px;font-weight: bolder;color: rgba(90,89,89,0.69)">战队成员</div>
          <div v-for="userItem in item.userinfo">
              <img :src="getSrc(userItem)"
                    class="imguser" alt="" >
          </div>
        </el-card>
      </div>
    </div>
    <div style="margin-top: 5vh;margin-left: 2vw">
      <el-pagination
          v-model:current-page="pageCurrent"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 36, 48]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper,"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>

import {useRoute, useRouter} from "vue-router";
import {reqGetTeamByLeaderId, reqGetTeamList} from "@/api/team/team.ts";
import {onMounted, ref} from "vue";
import useUserStore from "@/store/modules/user.ts";

let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
onMounted(async ()=>{
  await getTeamList();
  await getTeamByLeaderId();
})

// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(12)
let total = ref(0)

// ——————————————————————————————————————————————————————————————————————————————————
// 信息收集栏
let teamList = ref([])
let myTeamId = ref()
let selectTeamName = ref('')
const getTeamList = async ()=>{
  console.log(selectTeamName.value)
  let result = await reqGetTeamList(pageCurrent.value,pageSize.value,selectTeamName.value);
  if (result.code == 200){
    teamList.value = result.data;
    total.value = result.total;
  }
}
const getTeamByLeaderId = async ()=>{
  let result = await reqGetTeamByLeaderId(userStore.userId)
  if (result.code == 200){
    myTeamId.value = result.data.teamid;
  }
}


const goTeamInfo = (item)=>{
  $router.push(
      {
        path:'/h10/team/info',
        query:
            {
              redirect:$route.path,
              userid: userStore.userId,
              teamid: item.teaminfo.teamid,
            }
      }
  )
}
const goMyTeam = () =>{
  $router.push(
      {
        path:'/h10/myteam/info',
        query:
            {
              redirect:$route.path,
              userid: userStore.userId,
              teamid: myTeamId.value,
            }
      }
  )
}

const getSrc = (item) =>{
  if(!item.user[0].avatar){
    return "https://jokerwwt.oss-cn-hangzhou.aliyuncs.com/sakuraj/avatar/login_background.jpg"
  }else {
    return item.user[0].avatar

  }
}

const currentChange = ()=>{
  getTeamList();
}
const sizeChange = ()=>{
  getTeamList();
}

const goAddMyTeam = ()=>{
  $router.push(
      {
        path:'/h9/team/add',
        query:
            {
              redirect:$route.path,
              userid: userStore.userId,
            }
      }
  )
}

</script>

<style scoped lang="scss">
.team{
  margin: 4vh 5vw;
  .teamcard{
    width: 20vw;
    margin-left: 2vw;
    margin-top: 5vh;
    height: 48vh;
    border-radius: 10px;
    cursor: pointer;
    .imguser{
      margin-top: 10px;
      width: 40px;
      height:40px;
      border-radius: 50%;
      float: left;
      margin-left: 1vw;

      cursor: pointer;
      z-index: 10;
    }
    .imguser:hover{
      transition: 0.5s; //动画过渡的更加顺滑
      transform: scale(1.3); //放大倍数
    }
  }
  .teamcard:hover{
    transition: 0.5s; //动画过渡的更加顺滑
    transform: scale(1.05); //放大倍数
  }


}
</style>