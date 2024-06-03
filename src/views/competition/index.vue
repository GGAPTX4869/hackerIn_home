<!--
  Description：
  @date：2024-03-26 14:16
  @author：JokerWang
-->

<template>
  <div class="competiton">
    <div class="left">
      <el-card style="border-radius: 10px">
        <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.83)">近期赛事</div>
        <el-collapse v-model="activeName" accordion style="margin-top: 2vh">
          <el-collapse-item :title="item.name" v-for="(item,index) in recentList" :key="index">
            <template #title>
              <div style="font-size: 18px;font-weight: bolder;color: rgba(29,29,29,0.59)">{{ item.competitonname }}</div>
            </template>
            <div>
              赛事类型：{{item.comptypename}}
            </div>
            <div>
              赛事网址：{{item.compurl}}
            </div>
            <div>
              开始时间：{{ item.begintime.slice(0,-3) }}
            </div>
            <div>
              结束时间：{{ item.endtime.slice(0,-3) }}
            </div>
          </el-collapse-item>

        </el-collapse>
      </el-card>
    </div>
    <div class="right">
      <el-card style="border-radius: 10px">
        <div style="text-align: center;font-size: 18px;font-weight: bolder;color: rgba(98,95,95,0.83)">赛事列表</div>
        <el-table
        :data="compList"
        style="margin-top: 2vh"
        >
          <el-table-column type="index" label="序号" width="60px" align="center">
          </el-table-column>
          <el-table-column label="赛事名称" prop="competitonname" align="center" width="100px">
          </el-table-column>
          <el-table-column label="赛事类型" prop="comptypename" align="center" width="80px">
          </el-table-column>
          <el-table-column label="赛事链接" prop="compurl" align="center" width="180px">
            <template #="{ row, $index }">
              <div style="color: #0eb4dd;cursor: pointer" @click="goCompUrl(row)">
                {{row.compurl}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="赛程信息" prop="data.begintime" align="center" width="200px">
            <template #="{ row, $index }">
              <div>
                Begin:{{ row.begintime.slice(0,-3) }}
              </div>
              <div>
                End:{{ row.endtime.slice(0,-3) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="赛事状态" align="center" width="100px">
            <template #="{ row, $index }">
              <el-tag
                  :type="getCompType(row)"
              >
                {{ row.typemessage }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 2vh"
            v-model:current-page="pageCurrent"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper,"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
        />
      </el-card>

    </div>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, reactive, ref} from "vue";
import {reqGetCompByDesc, reqGetCompListByGroup} from "@/api/comp/comp.ts";
import {useRouter} from "vue-router";


onMounted(async ()=>{
  await getCompListByDsec();
  await getCompListByGroup();
})

let $router = useRouter();

// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)

// ——————————————————————————————————————————————————————————————————————————————————
// 信息栏
let recentList = ref([{
  begintime: "",
  competitonid: 0,
  competitonname: "",
  comptypeid: "",
  comptypename: "",
  compurl: "",
  createtime: "",
  description: "",
  duration: "",
  endtime: "",
  operator: "",
  status: 0,
  typemessage:'',
}]);
let compList = ref([{
  begintime: "",
  competitonid: 0,
  competitonname: "",
  comptypeid: "",
  comptypename: "",
  compurl: "",
  createtime: "",
  description: "",
  duration: "",
  endtime: "",
  operator: "",
  status: 0,
  typemessage:'',
}]);

const getCompListByDsec = async () =>{
  let result = await reqGetCompByDesc(1,5)
  if(result.code == 200){
    recentList.value = result.data;
  }
}

const getCompListByGroup = async ()=>{
  let result = await reqGetCompListByGroup(pageCurrent.value,pageSize.value)
  if (result.code == 200){
    compList.value = result.data;
    total.value = result.total;
  }
}

const getCompType = (row) => {
  let nowDate = new Date();
  let beginDate = new Date(row.begintime);
  let endDate =  new Date(row.endtime);
  if (nowDate - beginDate < 0){
    row.typemessage = '即将开始'
    return 'warning'
  }else if(nowDate - endDate > 0){
    row.typemessage = '已经结束'
    return 'danger'
  }else{
    row.typemessage = '正在进行'
    return 'success'
  }
  return 'success'
}
const goCompUrl = (row)=>{
  window.location.href = row.compurl
}

</script>

<style scoped lang="scss">
.competiton{
  display: flex;
  margin: 4vh 4vw;
  .left{
    width: 20vw;

  }
  .right{
    width: 50vw;
    margin-left: 2vw;
  }
}
</style>