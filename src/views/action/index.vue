<!--
  Description：
  @date：2024-03-26 9:45
  @author：JokerWang
-->

<template>
  <div class="action">
    <el-card>
      <div style="text-align: center">
        <span style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">最新动态</span>
      </div>
      <el-timeline style="max-width: 42vw;margin-top: 5vh;margin-left: 3vw">
        <el-timeline-item
            v-for="(activity, index) in actionList"
            :key="index"
            :type="'success'"
            :size="'large'"
        >
          <div style="display: flex;
          justify-content:space-between;align-items:center;font-size: 16px;margin-bottom: 2vh">
                <span >上新了一道新题：
                  <span @click="goChallenge(activity.challengeid)" style="cursor:pointer;color: #0eb4dd" >{{activity.actionname}}</span>
                </span>
            <span style="font-size: 12px;color: rgba(99,98,98,0.83)">{{ activity.createtime }}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div>
        <el-pagination
            v-model:current-page="pageCurrent"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper,"
            :total="actionStore.actionTotal"
            @current-change="currentChange"
            @size-change="sizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import useActionStore from "@/store/action/action.ts";
import useChallengeStore from "@/store/challenge/challenge.ts";
import {useRoute, useRouter} from "vue-router";
import {reqGetActionList} from "@/api/action";

let $router = useRouter();
let $route = useRoute();

let actionStore = useActionStore();

let challengeStore = useChallengeStore();
// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(10)

onMounted(()=>{
  getActionList();
})
let actionList = ref([]);
const currentChange = ()=>{
  getActionList();
}
const sizeChange = ()=>{
  getActionList();
}

const getActionList = async ()=>{
  let result = await reqGetActionList(pageCurrent.value,pageSize.value);
  actionList.value = result.data;
}

const goChallenge = (str)=>{
  challengeStore.challengeChangeId = str;
  $router.push(
      {
        path:'/h7/challenge/info',
        query:
            {
              redirect:$route.path,
              userid:"userid",
              challengeid: str,
            }
      }
  )
}

</script>

<style scoped>
.action{
  margin: 3vh 15vw;
}
</style>