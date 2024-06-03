<!--
  Description：
  @date：2024-03-28 12:47
  @author：JokerWang
-->

<template>
  <div class="select">
    <div class="select_race" >
      <div style="display:flex;">
        <div style="align-items: center;display: flex">赛事类型：</div>
        <el-radio-group fill="#69c3f2"
                        v-model="selectCompType"
                        size="large"
                        text-color="rgba(62,45,45,0.69)"
                        @change="getChallengeList"
        >
          <el-radio-button style="margin-left: 1vw;" >
            全部
          </el-radio-button>
          <div v-for="item in challengeStore.challengeCompTypeAll ">
            <el-radio-button
                size="large"
                style="margin-left: 1.5vw;"
                :label="item.typename"
                :value="item.challengetypeid"
            />
          </div>
        </el-radio-group>
      </div>
      <div>
        <el-button style="margin-left: 22vw;font-size: 18px" size="large" type="primary" round @click="goAddChallenge">赛题投稿</el-button>
      </div>
    </div>
    <div class="select_type" style="align-items: center;display: flex;justify-content: space-between">
      <div style="display:flex;align-items: center">
        <div style="color: rgba(62,45,45,0.69)">赛题类型：</div>
        <el-radio-group
            fill="#a1b2e6"
            v-model="selectType"
            size="large"
            text-color="rgba(62,45,45,0.69)"
            @change="getChallengeList"
        >
          <el-radio-button style="margin-left: 1vw;" >
            全部
          </el-radio-button>
          <div v-for="item in challengeStore.challengeTypeAll ">
            <el-radio-button
                size="large"
                style="margin-left: 1.5vw;"
                :label="item.typename"
                :value="item.challengetypeid"

            />
          </div>
        </el-radio-group>
      </div>
      <div>
        <el-input
            v-model="selectName"
            style="width: 9vw;"
            size="default"
            placeholder="Search"
        >
          <template #append>
            <el-button :icon="Search" @click="getChallengeList"/>
          </template>
        </el-input>
      </div>
    </div>
    <div class="challenge">
      <div v-for="item in challengeList">
        <el-card class="card_challenge" :style="{'background':item.back}" @click="goChallenge(item.challengeid)">
          <div style="font-size: 16px;font-weight: bolder;text-align: center;color: rgba(94,92,92,0.76)">{{ item.challengename }}</div>
          <div
              style="
                display:flex;
                justify-content:space-between;
                margin-left: 1vh;
                margin-right: 1vh;
                margin-top: 3vh;
                font-size: 15px;
                text-align: center;"

          >
            <div style="color: #0eb4dd">
              <div style="font-size: 20px;font-weight: bolder">
                {{ item.golden }}
              </div>
              <div style="margin-top: 2vh">
                金币
              </div>
            </div>
            <div style="color:rgba(136,76,168,0.8);">
              <div style="font-size: 20px;font-weight: bolder">
                {{ item.points }}
              </div>
              <div style="margin-top: 2vh">
                积分
              </div>
            </div>
            <div style="color: rgb(40,198,110)">
              <div style="font-size: 20px;font-weight: bolder">
                {{ item.solved }}
              </div>
              <div style="margin-top: 2vh">
                解决
              </div>
            </div>
          </div>
          <div style="margin-top: 3vh;display: flex;justify-content: space-between">
            <el-tag type="primary" size="default">{{ item.comptype }}</el-tag>
            <el-tag type="warning" style="margin-left: 1vw" size="default">{{ item.challengetype }}</el-tag>
            <el-tag :type="item.back == '#aff1c5'?'success':'danger'" style="margin-left: 1vw" size="default">{{ item.back == '#aff1c5'?'已解决':'未解决' }}</el-tag>
          </div>
        </el-card>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
          v-model:current-page="pageCurrent"
          v-model:page-size="pageSize"
          :page-sizes="[16, 32, 48]"
          :small="small"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper,"
          :total="total"
          @current-change="findUser"
          @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Search } from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import useChallengeStore from "@/store/challenge/challenge.ts";
import {onMounted, ref} from "vue";
import useUserStore from "@/store/modules/user.ts";
import {reqGetChallengeByGroup, reqGetChallengeList} from "@/api/challenge";
import {reqGetActionReAllById} from "@/api/action";
let challengeStore = useChallengeStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(16)
let total = ref<number>(0)

let challengeList = ref([]);
let actionReList = ref([]);
let selectType = ref()
let selectCompType = ref()
let selectName = ref()
let getChallengeByGroupInfo = ref({
  page:pageCurrent.value,
  limit:pageSize.value,
  challengetypeid:'',
  comptypeid:'',
  challengename:'',
})
onMounted(async ()=>{
  await getActionRe();
  await getChallengeTypeAll();
  await getChallengeCompTypeAll();
  await getChallengeList();

})
const getChallengeList = async () =>{
  getChallengeByGroupInfo.value.challengetypeid = selectType.value
  getChallengeByGroupInfo.value.comptypeid = selectCompType.value
  if (getChallengeByGroupInfo.value.challengetypeid == null || getChallengeByGroupInfo.value.comptypeid == null){
    selectName.value = ''
  }
  getChallengeByGroupInfo.value.challengename = selectName.value

  let result = await reqGetChallengeByGroup(getChallengeByGroupInfo.value)
  if (result.code == 200){
    challengeList.value = result.data;
    total.value = result.total;
  }
  console.log(challengeList.value)
  console.log(actionReList.value)
  for (let i in challengeList.value){
    for (let j in actionReList.value){
      if  (actionReList.value[j].challengeid == challengeList.value[i].challengeid){
        challengeList.value[i].back = '#aff1c5'
      }
    }
  }
  console.log(challengeList.value)
}

const getActionRe = async ()=>{
  let result = await reqGetActionReAllById(userStore.userId)
  actionReList.value = result.data;
}

const getChallengeTypeAll = async () =>{
  await challengeStore.GetChallengeTypeAll()
}
const getChallengeCompTypeAll = async () =>{
  await challengeStore.GetChallengeCompTypeAll()
}

const findUser = async () =>{
  await challengeStore.GetChallengeList(pageCurrent.value,pageSize.value)
}
const sizeChange = async () =>{
  await challengeStore.GetChallengeList(pageCurrent.value,pageSize.value)
}


const goChallenge = (str:any)=>{
  challengeStore.challengeChangeId = str;

  $router.push(

      {
        path:'/h7/challenge/info',
        query:
            {
              redirect:$route.path,
              userid:userStore.userId,
              challengeid: str,
            }
      }
  )
}


const goAddChallenge = ()=>{
  $router.push({
    path:'/h7/challenge/add',
    query:{
      userid:userStore.userId,
      redirect:$route.path,
    }
  })
}

</script>

<style scoped lang="scss">
.select{
  .select_race{
    display: flex;
    font-size: 18px;
    margin-left: 4vw;
    justify-content: space-between;
    align-items: center;
    color: rgba(80, 79, 79, 0.72);
    ::v-deep .el-radio-button__inner{
      font-size: 18px;
      color: rgba(80, 79, 79, 0.72);
      width: 6vw;
      display: flex;
      justify-content: center;
      border: 0 !important;
      border-radius: 20px;
      background-color: rgb(246, 248, 249);
    }
  }
  .select_type{
    margin-top: 2vh;
    display: flex;
    margin-left: 4vw;
    font-size: 18px;
    color: rgba(80, 79, 79, 0.72);
    ::v-deep .el-radio-button__inner{
      font-size: 18px;
      color: rgba(80, 79, 79, 0.72);
      width: 6vw;
      display: flex;
      justify-content: center;
      border-radius: 20px;
      border: 0 !important;
      background-color: rgb(246, 248, 249);
    }
  }
  .select_status{
    margin-top: 3vh;
    display: flex;
    justify-content: space-between;
    margin-left: 4vw;
    font-size: 18px;
    align-items: center;
    color: rgba(80, 79, 79, 0.72);
  }
  .challenge{
    margin-top: 1vh;
    display: flex;
    flex-wrap: wrap;
    .card_challenge{
      width: 17vw;
      height: 22vh;
      margin-left: 2vw;
      margin-top: 4vh;

      cursor:pointer;
      border-radius: 10px;
    }
    .card_challenge:hover{
      transition: 0.5s; //动画过渡的更加顺滑
      transform: scale(1.1); //放大倍数
    }
  }
  .pagination{
    margin-top: 4vh;
    margin-left: 4vw;
  }

}


</style>

