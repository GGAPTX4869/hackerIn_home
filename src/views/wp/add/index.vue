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
        <div style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">WP投稿</div>
      </div >
      <el-form style="margin: 6vh 8vw" label-width="100px">
        <el-form-item label="WP名称">
          <el-input
              placeholder="请输入WP名称"
          v-model="addWPForm.writeupname"
          ></el-input>
        </el-form-item>
        <div style="display:flex;">
          <el-form-item label="题目类型" style="margin-top: 4vh">
            <el-select
                style="width: 15vw"
                placeholder="请选择题目类型"
                v-model="selectChallengeTypeId"
                @change="selectChallengeByType"
            >
              <el-option
                  v-for="item in challengeTypeListAll"
                  :key="item.challengetypeid"
                  :label="item.typename"
                  :value="item.challengetypeid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目名称" style="margin-top: 4vh">
            <el-select
                style="width: 15vw;"
                placeholder="请选择题目"
                filterable
                v-model="addWPForm.challengeid"
            >
              <el-option
                  v-for="item in challengeListByType"
                  :key="item.challengeid"
                  :label="item.challengename"
                  :value="item.challengeid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="价值金币" style="margin-top: 2vw;">
          <el-input-number
              v-model="addWPForm.golden"
              style="width: 20vw"
              :min="1"
              :max="10"
          />
        </el-form-item>
        <el-form-item label="题目描述" size="large" style="margin-top: 6vh">
          <el-input
              placeholder="请输入题目描述"
              v-model="addWPForm.description"
              style="width: 20vw"
              maxlength="50"
              :show-word-limit="true"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
          ></el-input>
        </el-form-item>
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
                  v-model="addWPForm.writeupurl"
                  style="margin-right: 10vw"
              ></el-input>
            </el-form-item>
          </div>
          <div v-show="!isAttachmentTypeUrlShow">
            <el-form-item label="上传附件" size="large" style="margin-top: 6vh">
              <el-upload
                  style="margin-left: 2vw"
                  :data="{writeupname:addWPForm.writeupname}"
                  ref="upload"
                  class="upload-demo"
                  action="http://localhost:8080/public/writeup/wp/file/upload"
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
      </el-form>

      <template #footer>
        <div style="display: flex;justify-content: right">
          <el-button size="large" type="warning" @click="refresh">重置</el-button>
          <el-button  size="large" type="primary" @click="upLoad">提交</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang='ts'>

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqAddChallengeAudit, reqGetChallengeTypeAll} from "@/api/challenge";
import {ElMessage, genFileId} from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import useLayoutSettingStore from "@/store/setting.ts";
import {reqAddAuditWp, reqGetChallengeByType} from "@/api/wp";
import useUserStore from "@/store/modules/user.ts";


const upload = ref<UploadInstance>()
let $router = useRouter();
let $route = useRoute();
let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();

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

onMounted(async ()=>{
  await getChallengeTypeList()
})

// ——————————————————————————————————————————————————————————————————————————————
// 信息收集栏
let selectChallengeTypeId = ref('');
let challengeListByType = ref([]);
let challengeTypeListAll = ref([]);
let addWPForm = ref({
  writeupname:'',
  writeupurl:'',
  challengeid:'',
  description:'',
  golden:1  ,
  userid: userStore.userId,
})
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
// ——————————————————————————————————————————————————————————————————————————————
// 状态判断栏
let isAttachmentShow = ref<boolean>(false)
let isAttachmentTypeUrlShow = ref<boolean>(false)


// ——————————————————————————————————————————————————————————————————————————————
// 方法栏

const getChallengeTypeList = async ()=>{
  let result = await reqGetChallengeTypeAll();
  console.log(result)
  challengeTypeListAll.value = result.data;
}
const selectChallengeByType = async ()=>{
  let result = await reqGetChallengeByType(selectChallengeTypeId.value);
  challengeListByType.value = result.data;
  console.log(result)
}

const refresh = ()=>{
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const upLoad = async ()=>{
  if(isAttachmentTypeUrlShow.value){
    console.log("upfile")
    let result = await reqAddAuditWp(addWPForm.value)
    if(result.code == 200){
      ElMessage({
        type:'success',
        message:'上传成功'
      })
      layoutSettingStore.refresh = !layoutSettingStore.refresh;
    }
  }else {
    console.log(addWPForm.value)
    // 有附件

    let result = await reqAddAuditWp(addWPForm.value);
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

const goBack = ()=>{
  $router.push({
    path:$route.query.redirect
  })
}


</script>

<style scoped>

</style>