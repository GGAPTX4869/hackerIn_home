<!--
  Description：
  @date：2024-03-29 2:19
  @author：JokerWang
-->

<template>
  <div class="notice">
    <div>
      <div class="right">
        <div v-for="item in actionStore.noticeList">
          <el-card class="article" @click="goArticleInfo(item.actionid)">
            <div style="font-size: 20px;font-weight: bolder">
              {{ item.actionname }}
              <span style="font-size: 12px;color: rgba(69,68,68,0.65)">{{ item.createtime }}</span>
            </div>
            <div style="display:flex;margin-top: 2vh">
              <img src="@/assets/images/notice.png" style="width: 100px;">
              <div>
                <div class="description">
                  {{ item.description }}
                </div>
                <div style="display:flex;">
                  <span style="font-size: 6px;display: flex;margin-top: 5vh;margin-left: 1vw;align-items: center;color: rgba(98,98,98,0.67)"><svg-icon name="read" />{{ item.reader }}</span>
                  <span style="font-size: 6px;display: flex;margin-top: 5vh;margin-left: 1vw;align-items: center;color: rgba(98,98,98,0.67)"><svg-icon name="artreply" />{{ item.comment}}</span>
                </div>
              </div>
            </div>

          </el-card>
        </div>
      </div>
      <div style="margin-left: 1vw">
        <el-pagination
            v-model:current-page="pageCurrent"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper,"
            :total="actionStore.noticeTotal"
            @current-change="currentChange"
            @size-change="sizeChange"
        />
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>

import {useRouter} from "vue-router";
import useActionStore from "@/store/action/action.ts";
import {onMounted, ref} from "vue";
import useUserStore from "@/store/modules/user.ts";

onMounted(()=>{
  getAllowNoticeList()
})


let $router = useRouter();
let userStore = useUserStore();
let actionStore = useActionStore();

// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(10)



const getAllowNoticeList = ()=>{
  actionStore.GetAllowNoticeList()
}

const goArticleInfo = (str)=>{
  $router.push(
      {
        path:'/h11/notice/info',
        query:
            {
              userid:userStore.userId,
              actionid: str,
            }
      }
  )
}

const currentChange = ()=> {
  getAllowNoticeList()
}

const sizeChange = ()=> {
  getAllowNoticeList()
}


</script>

<style scoped lang="scss">
.notice{
  margin: 5vh 8vw;
  display: flex;
  justify-content: center;
  .right{
    .article{
      width: 40vw;
      margin-bottom: 4vh;
      border-radius: 10px;
      cursor:pointer;
      .description{
      margin-left: 1vw;
      display: -webkit-box;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 22px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 14px;
      color: rgba(73, 73, 73, 0.69);
      }

    }
    .article:hover{
      transition: 0.5s; //动画过渡的更加顺滑
      transform: scale(1.04); //放大倍数
    }

  }
}
</style>