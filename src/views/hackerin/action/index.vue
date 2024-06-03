<!--
  Description：
  @date：2024-03-27 20:19
  @author：JokerWang
-->

<template>
  <el-card class="action">
    <div style="text-align: center;font-size: 20px;font-family: 微软雅黑">
      最新公告与动态
    </div>
    <div style="margin-top: 20px">
      <div style="margin-top: 2vh;margin-left: 1vw">
        <el-divider style="margin-top: 4vh">
          <span style="font-size: 18px">公告栏</span>
        </el-divider>
        <div  v-for="item in noticeList">
          <div style="display: flex;justify-content: space-between;margin-top: 4vh">
            <div style="display: flex">
              <svg-icon name="notice"></svg-icon>
              <span style="margin-left: 1vw">{{item.actionname}}</span>
            </div>
            <span style="margin-left: 2vw;color: #cac2c2">{{ item.createtime }}</span>
          </div>
          <div class="description">
            <div class="descriptions_body">
              {{item.description}}
            </div>
            <el-button type="text" @click="goNotice(item)">查看详情</el-button>
          </div>

        </div>
      </div>
    </div>
    <div>
      <div style="margin-top: 2vh;margin-left: 1vw">
        <el-divider style="margin-top: 4vh">
          <span style="font-size: 18px">动态栏</span>
        </el-divider>
          <el-timeline style="max-width: 42vw;margin-top: 5vh">
            <el-timeline-item
                v-for="(activity, index) in actionStore.actionList"
                :key="index"
                :type="'success'"
                :size="'large'"
                :timestamp="activity.createtime"
            >
              <div style="display: flex;justify-content:align-items: center;font-size: 20px;margin-bottom: 2vh">
                <span >上新了一道新题：
                  <span @click="goChallenge(activity.challengeid)" style="cursor:pointer;color: #0eb4dd" >{{activity.actionname}}</span>
                </span>
              </div>
            </el-timeline-item>
          </el-timeline>
      </div>
    </div>
  </el-card>
</template>

<script setup lang='ts'>

import {onMounted, ref} from "vue";
import useActionStore from "@/store/action/action.ts";
import {useRoute, useRouter} from "vue-router";
import useChallengeStore from "@/store/challenge/challenge.ts";
import useUserStore from "@/store/modules/user.ts";
import {reqGetAllowNoticeList} from "@/api/action";

let actionStore = useActionStore();
let challengeStore = useChallengeStore();
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();

let noticeList = ref([])

onMounted(()=>{
  getActionList();
  getNoticeList();
})

const getActionList = async () =>{
  await actionStore.GetActionList(1,10);
}

const getNoticeList = async () =>{
  let result =  await reqGetAllowNoticeList(1,5)
  noticeList.value = result.data;
}


const goChallenge = (str)=>{
  challengeStore.challengeChangeId = str;
  $router.push(
      {
        path:'/h7/challenge/info',
        query:
            {
              userid:userStore.userId,
              challengeid: str,
              redirect:$route.path
            }
      }
  )
}

const goNotice = (item)=>{
  $router.push(
      {
        path:'/h11/notice/info',
        query:
            {
              userid:userStore.userId,
              actionid: item.actionid,
              redirect:$route.path
            }
      }
  )
}


</script>

<style scoped lang="scss">
.action{
  border-radius: 10px;
  .description{
    margin-top: 2vh;
    margin-left: 3vw;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: rgba(178, 173, 174, 0.52);
    height: auto;
    width: 40vw;
    padding: 10px;

    .descriptions_body{
      line-height: 30px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: auto;
    }
  }
}
</style>