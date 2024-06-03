<!--
  Description：
  @date：2024-03-26 9:51
  @author：JokerWang
-->

<template>
  <div>
    <el-card style="border-radius: 10px">
      <div style="display: flex;justify-content: space-between;align-items: center">
        <el-select style="width: 12vw;"
                   v-model="rankTable"
                   @change="selectTable"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.table"
              :value="item.value"
          />
        </el-select>
        <span style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">{{rankMessage}}</span>
        <span style="font-weight: bolder;font-size: 12px;color: rgba(27,31,31,0.56);margin-left: 2vw">
          {{ time.toLocaleDateString()}}
          {{time.toLocaleTimeString() }}
        </span>
      </div>
      <el-table
          :data="rankInfoSolo "
          style="
        margin-top: 20px;
        "
          v-show="isSoloShowVisile"
      >
        <el-table-column type="index" label="序号" align="center" width="80px">

        </el-table-column>
        <el-table-column label="用户" align="center" width="140px" prop="username">
          <template #="{ row, $index }">
            <span style="color: #0eb3dc;cursor: pointer" @click="goUser(row.user)">
              {{ row.user.username }}
            </span>

          </template>
        </el-table-column>
        <el-table-column label="签名" align="center" width="240px" prop="signature">
          <template #="{ row, $index }">
            {{ row.user.remark }}
          </template>
        </el-table-column>
        <el-table-column label="积分" align="center" width="160px" prop="solopoints">
          <template #="{ row, $index }">
            {{ row.userrank.rankpoints }}
          </template>
        </el-table-column>
        <el-table-column label="解题数量" align="center"  width="125px" prop="solveqs">
          <template #="{ row, $index }">
            {{ row.userrank.questionre }}
          </template>
        </el-table-column>
        <el-table-column label="所属战队" align="center"  width="160px" prop="teamname">
          <template #="{ row, $index }">
            <span style="color: #0eb3dc;cursor: pointer"  @click="goTeam(row)">
            {{ row.userteam.teamname }}

            </span>
          </template>
        </el-table-column>
        <el-table-column label="最后活跃时间" align="center" prop="lastlogintime">
          <template #="{ row, $index }">
            {{ row.user.lastlogin }}
          </template>
        </el-table-column>
      </el-table>
      <el-table
          :data="rankInfoTeam "
          style="
        margin-top: 20px;"
          v-show="isTeamShowVisile"
      >
        <el-table-column type="index" label="序号" align="center" width="80px">
        </el-table-column>
        <el-table-column label="队伍名称" align="center" width="120px" prop="username">
          <template #="{ row, $index }">
            <span >
              <span style="color: #0eb3dc;cursor: pointer" @click="goTeamInTeamList(row)">
                {{ row.teaminfo.teamname }}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="队长" align="center" width="120px" prop="username">
          <template #="{ row, $index }">
            <span >
              <span style="color: #0eb3dc;cursor: pointer" @click="goUserInTeamList(row)">
                {{ row.teaminfo.teamleader }}
              </span>

            </span>
          </template>
        </el-table-column>
        <el-table-column label="队伍签名" align="center" width="180px" prop="signature">
          <template #="{ row, $index }">
            <span>
              {{ row.teaminfo.teamtag }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="队伍描述" align="center" width="180px" prop="solopoints">
          <template #="{ row, $index }">
            <span>
              {{ row.teaminfo.description }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="队伍积分" align="center"  width="100px" prop="solveqs">
          <template #="{ row, $index }">
            <span>
              {{ row.teamrank.teampoints }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="队伍成员" align="center"  width="160px" prop="teamname">
          <template #="{ row, $index }">
            <div style="display: flex;margin-top: 1vh;flex-wrap: wrap">
              <div v-for="item in row.teamuserinfo" >
                <div>
                  <el-avatar :size="26" :src="item.avatar" style="margin-left: 4px" class="imgAvatar" @click="goAvatarUser(item)"/>
                </div>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="lastlogintime">
          <template #="{ row, $index }">
            <span>
              {{ row.teaminfo.createtime }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            v-model:current-page="pageCurrent"
            v-model:page-size="pageSize"
            :page-sizes="[50, 100]"
            :small="small"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper,"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
        />
      </div>


    </el-card>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import {reqGetRankInfoList} from "@/api/rank";
import {useRoute, useRouter} from "vue-router";

let $route = useRoute();
let $router = useRouter();
onMounted(async ()=>{
  await getInfoList()
})


let pageCurrent = ref<number>(1)
let pageSize = ref<number>(50)
let total = ref<number>(0)


let rankMessage = ref('个人榜单')
let rankTable = ref(1)
let rankInfoSolo = ref([])
let rankInfoTeam = ref([])
let options = ref([
  {
    table:'个人榜单',
    value:1,
  },
  {
    table:'团队榜单',
    value:2,
  },
])
let isSoloShowVisile = ref<boolean>(true);
let isTeamShowVisile = ref<boolean>(false);
let isAllShowVisile = ref<boolean>(false);
let time = new Date()

const getInfoList =async ()=>{
  let result = await reqGetRankInfoList(pageCurrent.value,pageSize.value)
  console.log(result);
  rankInfoSolo.value = result.data.solo;
  rankInfoTeam.value = result.data.team;
  if (isSoloShowVisile){
    total.value = result.total;
  }else {
    total.value = result.totalall;
  }

}

const currentChange = ()=>{
  getInfoList()
}
const sizeChange = ()=>{
  getInfoList()
}
const selectTable = ()=>{
  if(rankTable.value == 1){
    rankMessage.value = '个人榜单'
    isSoloShowVisile.value = true
    isTeamShowVisile.value = false
    isAllShowVisile.value = false
  }else if(rankTable.value == 2){
    rankMessage.value = '团队榜单'
    isSoloShowVisile.value = false
    isTeamShowVisile.value = true
    isAllShowVisile.value = false
  }
}

const goUser = (row)=>{
  console.log(row.userid)
  $router.push({path:'/h6/user/info',query:
        {
          userid:row.userid,
          redirect: $route.path ,
        }}
  )
}
const goAvatarUser = (item) =>{
  $router.push({path:'/h6/user/info',query:
        {
          userid:item.userid,
          redirect: $route.path ,
        }}
  )
}
const goUserInTeamList =(item)=>{
  $router.push({path:'/h6/user/info',query:
        {
          userid:item.teaminfo.teamleaderid,
          redirect: $route.path ,
        }}
  )
}

const goTeam = (row) =>{
  $router.push(
      {path:'/h10/team/info',
        query:{
          teamid: row.userteam.teamid,
          redirect: $route.path,
        }})
}
const goTeamInTeamList = (item) =>{
  $router.push(
      {path:'/h10/team/info',
        query:{
          teamid: item.teaminfo.teamid,
          redirect: $route.path,
        }})
}

</script>

<style scoped lang="scss">
.imgAvatar{
  cursor: pointer;
}
.imgAvatar:hover{
  transition: 0.5s; //动画过渡的更加顺滑
  transform: scale(1.3); //放大倍数
}
</style>