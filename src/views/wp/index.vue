<!--
  Description：
  @date：2024-03-29 16:04
  @author：JokerWang
-->

<template>
  <div class="wp">
    <el-card style="border-radius: 10px;margin-top: 2vh">
      <div style="display: flex;justify-content: space-between;align-items: center">
        <div style="display: flex">
          <el-select
              style="width: 6vw;"
              placeholder="类型"
              v-model="getListGroup.challengetype"
              @change="selectChallengeByType"
          >
            <el-option
                v-for="item in challengeTypeAll"
                :key="item.challengetypeid"
                :label="item.typename"
                :value="item.challengetypeid"
            >
            </el-option>
          </el-select>
          <el-input
              v-model="getListGroup.challengename"
              style="width: 9vw;"
              size="default"
              placeholder="Search"
          >
            <template #append>
              <el-button :icon="Search" @click="selectWpByName"/>
            </template>
          </el-input>
        </div>
        <span style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">WP库</span>
        <span>
          <el-button type="primary" style="margin-left: 9vw" @click="goAddWp">上传WP</el-button>
        </span>
      </div>
      <el-table
          style="margin: 10px 0"
          border
          :data="wpList"
          :default-sort="{ prop: 'createtime', order: 'descending' }"
      >
        <el-table-column type="index" label="序号" align="center" width="60px">
        </el-table-column>
        <el-table-column label="题目名称" align="center" prop="challengename" width="120px" >
        </el-table-column>
        <el-table-column label="题目类型" align="center" prop="typename" width="100px" >
        </el-table-column>
        <el-table-column label="WP描述" align="center" prop="flag" width="180px">
          <template #="{ row, $index }">
            <div style="
      display: -webkit-box;
      word-break: break-all;
      word-wrap: break-word;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;">
              {{ row.description }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建人" align="center" prop="operator" width="100px">
        </el-table-column>
        <el-table-column label="上传时间" align="center" prop="createtime" width="180px">
        </el-table-column>
        <el-table-column label="下载量" align="center" prop="downloading" width="100px" sortable>
        </el-table-column>
        <el-table-column label="金币量" align="center" prop="golden" width="100px" sortable>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row, $index }">
            <el-button
                type="primary"
                size="default"
                @click="downLoad(row)"
            >下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="pageCurrent"
          v-model:page-size="pageSize"
          :page-sizes="[20, 40, 60, 80]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper,"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
      />
    </el-card>
  </div>
</template>

<script setup lang='ts'>


import {reqGetWpListByGroup, reqRefreshDownLoad} from "@/api/wp";
import {onMounted, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import { reqGetChallengeTypeAll} from "@/api/challenge";
import useLayoutSettingStore from "@/store/setting.ts";
import {useRoute, useRouter} from "vue-router";
import useUserStore from "@/store/modules/user.ts";

let layoutSeettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
onMounted(async ()=>{
  await getWpList();
  await getChallengeAll();
})

// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(20)
let total = ref<number>();


// ——————————————————————————————————————————————————————————————————————————————————
// 信息栏收集
let getListGroup = ref({
  page:pageCurrent.value,
  limit:pageSize.value,
  writeupname:'',
  challengename:'',
})
let wpList = ref([])
let challengeTypeAll = ref([])
const getWpList = async () =>{
  let result = await reqGetWpListByGroup(getListGroup.value)
  if (result.code == 200){
    wpList.value = result.data;
    total.value = result.total;
  }
}

const selectChallengeByType = () => {
  getWpList();
}

const getChallengeAll = async ()=>{
  let result = await reqGetChallengeTypeAll()

  if (result.code == 200){
    challengeTypeAll.value.push({
      challengetypeid:"",
      typename:"全部"
    });
    for (let i = 0;i < result.data.length;i++){
      challengeTypeAll.value.push(result.data[i]);
    }

  }
}

const currentChange = ()=>{
  getWpList();
}
const sizeChange = ()=>{
  getWpList();
}

const selectWpByName = ()=>{
  getWpList();
}

const downLoad = async (row)=>{
  await reqRefreshDownLoad(row.challengename)
  window.location.href = row.writeupurl
  layoutSeettingStore.refresh = !layoutSeettingStore.refresh
}


const  goAddWp = ()=>{
  $router.push({
    path:'/h8/wp/add',
    query:{
      redirect:$route.path,
      userid:userStore.userId,
    }
  })
}
</script>

<style scoped>
.wp{
  margin: 2vh 4vw;
}
</style>