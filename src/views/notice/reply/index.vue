<!--
  Description：
  @date：2024-03-29 1:48
  @author：JokerWang
-->

<template>
  <u-comment :config="config" @submit="submit">
    <!-- <template>导航栏卡槽</template> -->
    <!-- <template #header>头部卡槽</template> -->
    <!-- <template #info>信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #func>功能区域卡槽</template> -->
  </u-comment>
  <div>
    <el-pagination
        v-model:current-page="pageCurrent"
        v-model:page-size="pageSize"
        :page-sizes="[15, 30, 45, 60]"
        :small="small"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper,"
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
    />
  </div>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '@/assets/emoji/emoji.ts'
import {onMounted, reactive, ref} from 'vue'
import { CommentApi, ConfigApi, SubmitParamApi, UToast } from 'undraw-ui'
import useUserStore from "@/store/modules/user.ts";
import {ElMessage} from "element-plus";
import {reqAddComment, reqGetComment} from "@/api/reply";
import {useRoute} from "vue-router";
import {reqGetUserInfo} from "@/api/user";

let userStore = useUserStore();
let $route = useRoute()

onMounted(async ()=>{
  await getComment();
  await getUserInfo()

})

defineOptions({
  name: 'comment'
})
// ——————————————————————————————————————————————————————————————————————————————————
// 分页栏设置
let pageCurrent = ref<number>(1)
let pageSize = ref<number>(15)
let total = ref<number>();
let totalAll = ref<number>();
let resComment = ref([]);
const config = reactive<ConfigApi>({
  user: {} as any,
  emoji: emoji,
  comments: [],
  showLevel: false,
  showHomeLink: false,
  showAddress: false,
  showLikes: false
})
let userInfo = ref({
  avatar: "",
  createtime: "",
  userid: "",
  username: "",
});
let addComment = ref({
  commentid:0,
  commenttypeid:'',
  parentid:'',
  uid:'',
  content:'',
})
let getCommentInfo = ref({
  page:pageCurrent.value,
  limit:pageSize.value,
  commenttypeid:<string>$route.query.actionid,
})

// 评论数据
setTimeout(() => {
  config.user = {
    id: 1,
    username: userInfo.value.username,
    avatar: userInfo.value.avatar,
  }
  config.comments = resComment.value
}, 500)

const getComment = async ()=>{
  let result = await reqGetComment(getCommentInfo.value)
  total.value = result.total
  totalAll.value = result.totalall
  resComment.value = result.data;
  console.log(result)
  for (let i in resComment.value){
    if(resComment.value[i].reply.total == 0){
      resComment.value[i].reply = null;
    }
  }
  console.log(result)
}
const currentChange =()=>{
  getComment()
}
const sizeChange =()=>{
  getComment()

}

const getUserInfo = async ()=>{
  let result = await reqGetUserInfo();
  userInfo.value = result.data;
}
const  padTo2Digits = (num: number) =>{
  return num.toString().padStart(2, '0');
}
const  formatDate = (date: Date) =>{
  return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
  );
}

// 评论提交事件
// 提交评论事件
const submit = async ({ content, parentId, files, finish }: SubmitParamApi) => {
  let nowData = formatDate(new Date())
  const comment: CommentApi = {
    parentId: parentId,
    uid: userInfo.value.userid,
    content: content,
    createTime:nowData,
    user: {
      username: config.user.username,
      avatar: config.user.avatar
    }
  }
  addComment.value.commentid = totalAll.value + 1;
  addComment.value.commenttypeid = <string>$route.query.actionid
  addComment.value.uid = <string>comment.uid
  addComment.value.parentid = Number(comment.parentId)
  addComment.value.content = comment.content
  await reqAddComment(addComment.value)
  await getComment()
  setTimeout(() => {
    finish(comment)

    ElMessage({
      type:'success',
      message:'评论成功'
    })
  }, 200)
}
</script>


<style scoped>

</style>