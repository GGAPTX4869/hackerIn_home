<!--
  Description：
  @date：2024-04-07 21:03
  @author：JokerWang
-->

<template>
  <div style="margin: 3vh 6vw;">
    <el-button
        type="primary"
        plain round
        style="font-size: 16px"
        size="large" icon="ArrowLeft"
        @click="goBack">返回</el-button>

    <el-card style="border-radius: 10px;margin: 2vh 2vw;">
      <div style="display: flex;justify-content: center">
        <div style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">题目投稿</div>
      </div >
      <div style="margin-left: 8vw;margin-top: 6vh">
        <el-steps style="max-width: 44vw" :active="active" finish-status="success" align-center>
          <el-step title="基本信息" />
          <el-step title="额外信息" />
          <el-step title="附件上传" />
        </el-steps>
      </div>
      <div >
        <div v-show="stepOneShow" style="margin-left: 10vw;margin-top: 2vh;">
          <el-form>
            <el-form-item label="题目名称" size="large" style="margin-top: 6vh">
              <el-input
                  v-model="addChallenge.challengename"
                  style="margin-right: 10vw"
              ></el-input>
            </el-form-item>
            <el-form-item label="作者名称" size="large" style="margin-top: 6vh">
              <el-input
                  :placeholder="userInfo.username"
                  disabled
                  style="margin-right: 10vw"
              ></el-input>
            </el-form-item>
            <el-form-item label="题目类型" size="large" style="margin-top: 6vh">
              <el-radio-group v-model="addChallenge.challengetypeid" v-for="item in challengeTypeInfo">
                <el-radio :value="item.challengetypeid" style="margin-left: 2vw">{{ item.typename }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="题目描述" size="large" style="margin-top: 6vh">
              <el-input
                  placeholder="请输入题目描述"
                  v-model="addChallenge.description"
                  style="width: 20vw"
                  maxlength="50"
                  :show-word-limit="true"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否有镜像" size="large" style="margin-top: 6vh">
              <el-radio-group v-model="isImageUrlShow" v-for="item in isImageUrl">
                <el-radio :value="item.value" style="margin-left: 2vw">{{ item.lable }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="isImageUrlShow" label="镜像链接" size="large" style="margin-top: 6vh">
              <el-input
                  :disabled="isImageUrlCanUse"
                  v-model="addChallenge.imageurl"
                  style="margin-right: 10vw"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="题目Flag" size="large" style="margin-top: 6vh">
              <el-input
                  v-model="addChallenge.flag"
                  style="margin-right: 10vw"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepTwoShow"
             style="display: flex;
             justify-content: center;
             margin-top: 2vh;
             font-size: 16px;
             font-weight: bolder;color: #0eb3dc">此页面信息选填</div>
        <div v-show="stepTwoShow" style="margin-left: 11vw;margin-top: 2vh">
          <el-form label-width="140px">
            <el-form-item label="题目提示" size="large" style="margin-top: 2vh">
              <el-input
                  placeholder="请输入题目提示"
                  v-model="addChallenge.tips"
                  style="width: 20vw"
                  maxlength="30"
                  :show-word-limit="true"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="题目来源" size="large" style="margin-top: 6vh">
              <el-select
                  style="width: 20vw"
                  placeholder="请选择赛事类型"
                  v-model="addChallenge.comptypeid"
              >
                <el-option
                    v-for="item in challengeCompTypeInfo"
                    :key="item.challengetypeid"
                    :label="item.typename"
                    :value="item.challengetypeid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分数" size="large" style="margin-top: 6vh">
              <el-input-number
                  v-model="addChallenge.points"
                  style="width: 20vw"
                  :min="1"
                  :max="10"
              />
            </el-form-item>
            <el-form-item label="所需金币数" size="large" style="margin-top: 6vh">
              <el-input-number
                  v-model="addChallenge.golden"
                  style="width: 20vw"
                  :min="1"
                  :max="10"
              />
            </el-form-item>
            <el-form-item label="一血积分" size="large" style="margin-top: 6vh">
              <el-input-number
                  v-model="addChallenge.fbreward"
                  style="width: 20vw"
                  :min="1"
                  :max="10"
              />
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepThreeShow" style="margin-left: 6vw;margin-top: 2vh;">
          <el-form label-width="140px">
            <el-form-item label="是否有附件" size="large" style="margin-top: 6vh">
              <el-radio-group v-model="isAttachmentShow" v-for="item in isAttachment">
                <el-radio :value="item.value" style="margin-left: 2vw">{{ item.lable }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-show="isAttachmentShow">
              <el-form-item label="附件类型" size="large" style="margin-top: 6vh">
                <el-radio-group v-model="isAttachmentTypeUrlShow" v-for="item in isAttachmentUrlType">
                  <el-radio :value="item.value" style="margin-left: 2vw">{{ item.lable }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-show="isAttachmentTypeUrlShow">
                <el-form-item label="附件链接" size="large" style="margin-top: 6vh">
                  <el-input
                      v-model="addChallenge.attachmenturl"
                      style="margin-right: 10vw"
                  ></el-input>
                </el-form-item>
              </div>
              <div v-show="!isAttachmentTypeUrlShow">
                <el-form-item label="上传附件" size="large" style="margin-top: 6vh">
                  <el-upload
                      style="margin-left: 2vw"
                      :data="{challengename:addChallenge.challengename}"
                      ref="upload"
                      class="upload-demo"
                      action="http://localhost:8080/public/challenge/challenge/attachment/update"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :auto-upload="false"
                      :before-upload="beforeWPUpload"
                  >
                    <template #trigger>
                      <el-button type="primary">选择文件</el-button>
                    </template>
                    <template #tip>
                      <div class="el-upload__tip text-red">
                        限制上传一个文件，且文件大小不大于5MB，且文件类型为.zip
                      </div>
                    </template>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="备注" size="large" style="margin-top: 6vh">
              <el-input
                  placeholder="请输入备注"
                  v-model="addChallenge.remark"
                  style="width: 25vw;"
                  maxlength="100"
                  :show-word-limit="true"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                  type="textarea"
              ></el-input>
            </el-form-item>

          </el-form>
        </div>
      </div>

      <template #footer>
          <div style="display: flex;justify-content: right">
            <el-button size="large" type="warning" v-show="isButtonShow" @click="back">返回</el-button>
            <el-button  size="large" type="primary" @click="next">{{ nextMessage }}</el-button>
          </div>
        </template>
    </el-card>
  </div>
</template>

<script setup lang='ts'>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqGetUserInfo} from "@/api/user";
import {reqAddChallengeAudit, reqGetChallengeCompTypeAll, reqGetChallengeTypeAll} from "@/api/challenge";
import {ElMessage, genFileId} from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import useLayoutSettingStore from "@/store/setting.ts";

const upload = ref<UploadInstance>()
let $router = useRouter();
let $route = useRoute();
let layoutSettingStore = useLayoutSettingStore();


onMounted(async ()=>{
  await getUserInfo();
  await getChallengeTypeAll();
  await getChallengeCompTypeAll();
})

// ——————————————————————————————————————————————————————————————————————————————
// 信息收集栏
let userInfo = ref({
  avatar: "",
  createtime: "",
  email: "",
  ipaddress: "",
  lastlogin: "",
  password: "",
  phonenumber: "",
  realname: "",
  remark: "",
  stunumber: "",
  updatetime: "",
  userid: "",
  username: "",
  userstatus: 1,
  usertype: 1,
});
let challengeTypeInfo = ref<{
  challengetypeid: ""
  typename: ""
}>([]);
let addChallenge = ref({
  description:'',
  attachmenturl:'',
  comptypeid:'',
  remark:'',
  points:1,
  imageurl:'',
  flag:'',
  fbreward:1,
  golden:1,
  tips:'',
  challengename:'',
  operator:'',
  challengeid:'',
  challengetypeid:'',
})
let isImageUrl = ref([
  {
    lable:'是',
    value:true,
  },
  {
    lable:'否',
    value:false,
  }
])
let isAttachment = ref([
  {
    lable:'是',
    value:true,
  },
  {
    lable:'否',
    value:false,
  }
])
let isAttachmentUrlType = ref([
  {
    lable:'链接',
    value:true,
  },
  {
    lable:'上传文件',
    value:false,
  }
])
let challengeCompTypeInfo = ref([])

// ——————————————————————————————————————————————————————————————————————————————
// 状态判断栏
let isImageUrlShow = ref<boolean>(false)
let isAttachmentShow = ref<boolean>(false)
let isAttachmentTypeUrlShow = ref<boolean>(false)
let isImageUrlCanUse = ref<boolean>(false)
let isButtonShow = ref<boolean>(false)
let stepOneShow = ref<boolean>(true)
let stepTwoShow = ref<boolean>(false)
let stepThreeShow = ref<boolean>(false)
let active = ref(0)
let nextMessage = ref<string>("下一步")

// ——————————————————————————————————————————————————————————————————————————————
// 方法栏
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const beforeWPUpload: UploadProps['beforeUpload'] = (rawFile) =>  {
  console.log(rawFile);
  // application/vnd.openxmlformats-officedocument.wordprocessingml.document
  // application/pdf
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('文件大小不超过5MB!')
    return false
  }
  return true
}


const getChallengeTypeAll = async () =>{
  let result = await reqGetChallengeTypeAll();
  if (result.code == 200){
    challengeTypeInfo.value = result.data;
  }
  console.log(result)
}
const getChallengeCompTypeAll = async () =>{
  let result = await reqGetChallengeCompTypeAll();
  if (result.code == 200){
    challengeCompTypeInfo.value = result.data;
  }
  console.log(result)
}
const getUserInfo = async ()=>{
  let result = await reqGetUserInfo();
  if (result.code == 200){
    userInfo.value = result.data;
  }
  console.log(userInfo.value)

}

const goBack = ()=>{
  if ($route.query.redirect){
    $router.push($route.query.redirect)
  }else {
    $router.push('/h1/challenge')
  }

}

const next = ()=>{
  if (active.value++ > 2) {
    active.value = 3
  }
  if(stepOneShow.value == true){
    stepOneShow.value = false;
    stepTwoShow.value = true
    isButtonShow.value = true
  }else if(stepTwoShow.value == true){
    isButtonShow.value = true
    nextMessage.value = "完成"
    stepTwoShow.value = false;
    stepThreeShow.value = true
  }else if(stepThreeShow.value == true){
    upLoadChallenge()
  }

}

const upLoadChallenge = async ()=>{
  addChallenge.value.operator = userInfo.value.username
  if(isAttachmentTypeUrlShow.value){
    console.log("upfile")
    let result = await reqAddChallengeAudit(addChallenge.value)
    if(result.code == 200){
      ElMessage({
        type:'success',
        message:'上传成功'
      })
      layoutSettingStore.refresh = !layoutSettingStore.refresh;
    }
  }else {
    console.log(addChallenge.value)
    // 有附件
    console.log("ddddddd")
    let result = await reqAddChallengeAudit(addChallenge.value);
    if (result.code == 200){
      ElMessage({
        type:'success',
        message:'题目添加成功',
      })
      await upload.value!.submit();
      layoutSettingStore.refresh = !layoutSettingStore.refresh;
    }else {
      ElMessage({
        type:'error',
        message:'题目提交失败，请检查',
      })
    }


  }
}

const back = ()=>{
  if(active.value == 3){
    active.value = 2
  }
  if (active.value-- < 1) {
    active.value = 0
  }
  if(stepTwoShow.value == true){
    nextMessage.value = '下一步'
    isButtonShow.value = false
    stepOneShow.value = true;
    stepTwoShow.value = false;
  }else if(stepThreeShow.value == true){
    nextMessage.value = '下一步'
    stepTwoShow.value = true;
    stepThreeShow.value = false;
  }
}


</script>

<style scoped>

</style>