<!--
  Description：
  @date：2024-03-26 9:51
  @author：JokerWang
-->

<template>
  <el-card style="border-radius: 10px">
    <div style="display: flex;justify-content: space-between;align-items: center">
      <el-select style="width: 12vw;">
      </el-select>
      <span style="font-size: 30px;font-weight: bolder;color: rgba(99,99,99,0.84)">xx榜单</span>
      <span>2024-3-31 10:00</span>
    </div>
    <el-table
        :data="soloList "
        style="
        margin-top: 20px;
        width: 75vw"
    >
      <el-table-column type="index" label="序号" align="center" width="80px">
      </el-table-column>
      <el-table-column label="用户" align="center" width="140px" prop="username">
      </el-table-column>
      <el-table-column label="签名" align="center" width="340px" prop="signature">
      </el-table-column>
      <el-table-column label="积分" align="center" width="100px" prop="solopoints">
      </el-table-column>
      <el-table-column label="解题数量" align="center"  width="100px" prop="solveqs">
      </el-table-column>
      <el-table-column label="所属战队" align="center"  width="140px" prop="teamname">
      </el-table-column>
      <el-table-column label="最后活跃时间" align="center" width="260px" prop="lastlogintime">
      </el-table-column>
    </el-table>


  </el-card>
</template>

<script setup lang='ts'>
import {ref} from "vue";

let rankMessage

let soloList = ref([
  {
    username:'ddd',
    signature:'this a test',
    solopoints:131223,
    solveqs:133,
    teamname:'teamname',
    lastlogintime:'2024-3-30 14:30:22',
  },
  {
    username:'ddd',
    signature:'this a test',
    solopoints:131223,
    solveqs:133,
    teamname:'teamname',
    lastlogintime:'2024-3-30 14:30:22',
  },
  {
    username:'ddd',
    signature:'this a test',
    solopoints:131223,
    solveqs:133,
    teamname:'teamname',
    lastlogintime:'2024-3-30 14:30:22',
  },



])
</script>

<style scoped>

</style>