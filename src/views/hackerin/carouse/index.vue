<!--
  Description：
  @date：2024-03-26 15:57
  @author：JokerWang
-->

<template>
    <el-carousel height="200px" class="carouse">
      <el-carousel-item v-for="item in 2" :key="item">
        <img src="@/assets/images/login_background.jpg" alt="" class="pic">
      </el-carousel-item>
    </el-carousel>
</template>

<script setup lang='ts'>

</script>

<style scoped>
.carouse{
  width: 95vh;
  border-radius: 10px;
}
</style>