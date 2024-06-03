<!--
  Description：
  @date：2024-03-26 23:06
  @author：JokerWang
-->

<template>
  <div style="margin-top: 2vh">
    <el-button type="primary" plain round style="font-size: 16px" size="large" icon="ArrowLeft" @click="goBack">返回</el-button>

  </div>
  <div class="userinfo_container">
    <div class="img">
      <img src="@/assets/images/login_background.jpg" alt=""/>
    </div>


    <div class="username">
      {{ userInfo.user.username }}
    </div>
    <div class="description">
     `
      {{ userInfo.user.remark }}
      `
    </div>
    <div class="rank" style="margin-top:6vh">
      <div style="text-align: center">
        <div class="math" style="color:#bd5050;">{{ userInfo.userrank.rankpoints }}</div>
        <div class="font" style="color:#bd5050;">积分</div>
      </div>
      <div style="text-align: center">
        <div class="math" style="color:#50c3bf;">{{ userInfo.userrank.ranking }}</div>
        <div class="font" style="color:#50c3bf;">总排名</div>
      </div>
      <div style="text-align: center">
        <div class="math" style="color:#7622d2;">{{ userInfo.userrank.questionre }}</div>
        <div class="font" style="color:#7622d2;">解题数</div>
      </div>
    </div>
    <br>
  </div>
  <div class="userwp_container">

    <div style="padding-top: 30px;text-align: center">
      <UserInfoChart/>
    </div>
    <el-divider ></el-divider>
    <div style="margin-top: 30px;margin-left: 70px;font-size: 20px">
      个人信息
    </div>
    <div style="margin-top: 30px;margin-left: 60px;margin-right: 60px">
      <el-descriptions
          title="With border"
          :column="3"
          size="large"
          border
      >
        <el-descriptions-item label="用户名" >
          {{ userInfo.user.username }}
        </el-descriptions-item>
        <el-descriptions-item label="学号">
          {{ userInfo.user.stunumber }}
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          {{ userInfo.user.phonenumber }}
        </el-descriptions-item>
        <el-descriptions-item label="队伍名称" >
          {{ userInfo.teamrank.teamname }}
        </el-descriptions-item>
        <el-descriptions-item label="队伍积分">
          {{ userInfo.teamrank.teampoints }}
        </el-descriptions-item>
        <el-descriptions-item label="队伍排名">
          {{ userInfo.teamrank.ranking }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div style="margin-top: 30px;margin-left: 70px;font-size: 20px">
      上传题目
    </div>
    <div style="margin-top: 30px;margin-left: 60px">
      <el-table :data="userInfo.challenge"
                style="width: 95%;"
      >
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column prop="challengename" label="题目名称" width="160" align="center"/>
        <el-table-column prop="description" label="题目描述" width="340" align="center"/>
        <el-table-column prop="challengetype" label="题目类型"  width="160" align="center"/>
        <el-table-column prop="createtime" label="上传时间"  width="200" align="center"/>
        <el-table-column prop="solved" label="当前解题人数" align="center"/>
      </el-table>
    </div>
    <div style="margin-top: 30px;margin-left: 70px;font-size: 20px">
      上传WP
    </div>
    <div style="margin-top: 30px;margin-left: 60px">
      <el-table :data="userInfo.writeup"
                style="width: 95%;"
      >
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column prop="writeupname" label="WP名称" width="100" align="center"/>
        <el-table-column prop="description" label="WP描述" width="160" align="center"/>
        <el-table-column prop="challengename" label="题目名称"  width="120" align="center"/>
        <el-table-column prop="typename" label="题目类型"  width="120" align="center"/>
        <el-table-column prop="createtime" label="上传时间"  width="200" align="center"/>
        <el-table-column prop="golden" label="金币量"  width="80" align="center"/>
        <el-table-column prop="downloading" label="下载量"  width="120" align="center"/>
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
    </div>
    <div style="margin-top: 30px;margin-left: 70px;font-size: 20px">
      解题记录
    </div>
    <div style="margin-top: 30px;margin-left: 60px;">
      <el-table :data="userInfo.actionre"
                style="width: 95%;"
      >
        <el-table-column type="index" label="序号" width="280" align="center"/>
        <el-table-column prop="actionname" label="题目名称" width="240" align="center"/>
        <el-table-column prop="createtime" label="完成时间" align="center"/>
      </el-table>
    </div>
  </div>

</template>

<script setup lang='ts'>
import UserInfoChart from '@/views/user/chart/userinfo/index.vue'
import {onMounted, reactive, ref} from "vue";
import {reqGetUserInfoById} from "@/api/user";
import {useRoute, useRouter} from "vue-router";
import {reqRefreshDownLoad} from "@/api/wp";
import useLayoutSettingStore from "@/store/setting.ts";
let layoutSeettingStore = useLayoutSettingStore();
let $route = useRoute();
onMounted(()=>{
  getUserInfoById();
})

let $router = useRouter();

let userInfo = ref({
  user:{
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
  },
  actionre:<{
    actionid: 0
    actionname: ""
    challengeid: ""
    createtime: ""
    userid: ""
    username: ""
  }>[],
  challenge:<{
    attachmenturl: "",
    challengeid: "",
    challengename: "",
    challengetype: "",
    challengetypeid: "",
    comptype: "",
    comptypeid: "",
    createtime: "",
    description: "",
    fbname: "",
    fbreward: 1,
    flag: "",
    golden: 1,
    imageid: "",
    imagename: "",
    imageurl: "",
    operator: "",
    points: 1,
    remark: "",
    solved: 0,
    status: 1,
    tips: "",
    updatetime: "",
  }>[],
  team:{
    createtime: "",
    description: "",
    operateuser: "",
    remark: "",
    status: 1,
    teamid: "",
    teamleader: "",
    teamleaderid: "",
    teamname: "",
    teamtag: "",
    updatetime: "",
  },
  userrank:{
    questionre: 0,
    ranking: 0,
    rankpoints: 0,
    resolvere: 0,
  },
  teamrank:{
    teamid: "",
    teamname: "",
    teampoints: 0,
    ranking:0,
  },
  writeup:<{
    challengeid: ""
    challengename: ""
    challengetype: ""
    createtime: ""
    description: ""
    downloading: 0
    golden: 0
    operator: ""
    status: 0
    typename: ""
    writeupid: ""
    writeupname: ""
    writeupurl: ""
  }>[]
});


const getUserInfoById = async ()=>{

  let result = await reqGetUserInfoById($route.query.userid)
  userInfo.value = result.data;
  console.log(result);
}

const downLoad = async (row)=>{
    await reqRefreshDownLoad(row.challengename)
    window.location.href = row.writeupurl
    layoutSeettingStore.refresh = !layoutSeettingStore.refresh
}
const goBack = ()=>{
  $router.push({

    path:$route.query.redirect,
    query:{
      challengeid: $route.query.challengeid,
      teamid:$route.query.teamid,
    }
  });
}

</script>

<style scoped lang="scss">
.userinfo_container{
  margin-top: 20px;
  border-radius: 10px;
  background: white;
  el-divider{

  }
  .img{
    text-align: center;
    img{
      margin-top: 30px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .username{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    font-family: Microsoft YaHei;
  }
  .description{
    margin-top: 20px;
    text-align: center;

  }
  .rank{
    margin: 20px 20vh;
    display: flex;
    justify-content: space-between;
    .math{
      font-size: 30px;
    }
    .font{
      margin-top: 20px;

    }
  }

}
.userwp_container{
  margin-top: 20px;
  background-color: white;
  border-radius: 10px;
  padding-bottom: 50px;
  margin-bottom: 30px;
}

</style>