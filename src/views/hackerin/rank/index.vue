<!--
  Description：
  @date：2024-03-26 16:05
  @author：JokerWang
-->

<template>
  <div class="rank">
    <el-card class="card_left">
        <span class="rank_titile">个人排行榜</span>
      <el-table
          :data="rankStore.pointsList"
          style="margin-top: 10px"
      >
        <el-table-column type="index" label="排名" align="center" width="60" />
        <el-table-column prop="username" label="姓名" align="center" width="130">
          <template #="{ row, $index }">
            <el-button type="text" @click="goUser(row)">
              {{row.username}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="rankpoints" label="积分" align="center" width="120" />
      </el-table>
    </el-card>
    <el-card class="card_right">
      <span class="rank_titile">队伍排行榜</span>
      <el-table
          :data="rankStore.teamPointsList"
          style="margin-top: 10px"
      >
        <el-table-column type="index" label="排名" align="center" width="60" />
        <el-table-column prop="teamname" label="队伍" align="center" width="130">
          <template #="{ row, $index }">
            <el-button type="text" @click="goTeam(row)">
              {{row.teamname}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="teampoints" label="积分" align="center" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang='ts'>


import {reqGetRankPointList} from "@/api/rank";
import {onMounted, reactive} from "vue";
import useRankStore from "@/store/rank/rank.ts";
import {useRoute, useRouter} from "vue-router";
import useUserStore from "@/store/modules/user.ts";


let rankStore = useRankStore();
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
onMounted(()=>{

})
const goUser = (row)=>{
  $router.push({path:'/h6/user/info',query:
        {
          userid:row.userid,
          redirect: $route.path ,
        }}
  )
}

const goTeam = (row) =>{
  $router.push(
      {path:'/h10/team/info',
        query:{
        userid:userStore.userId,
          teamid: row.teamid,
          redirect: $route.path,
      }})
}

</script>

<style scoped lang="scss">
.rank{
  margin-top: 20px;
  display: flex;
  .card_left{

    .rank_titile{
      text-align: center;
      display: block;
      font-size: 16px;
      font-family: Microsoft YaHei;
    }
    border-radius: 10px;
    width: 45vh;
  }
  .card_right{
    width: 45vh;
    border-radius: 10px;
    margin-left: 5vh;
    .rank_titile{
      text-align: center;
      display: block;
      font-size: 16px;
      font-family: Microsoft YaHei;
    }
  }
}

</style>