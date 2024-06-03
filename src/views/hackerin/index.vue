<!--
  Description：
  @date：2024-03-26 0:25
  @author：JokerWang
-->

<template>
  <div class="body">
    <div class="body_left">
      <div class="crouse" >
        <Carouse/>
      </div>
      <div>
        <rank/>
      </div>
      <div class="action">
        <Action/>
      </div>
    </div>
    <div class="body_right">
      <div class="checkin">
        <CheckIn/>
      </div>
      <div class="upload">
        <Upload/>
      </div>
      <div class="action_race">
        <ActionRace/>
      </div>
      <div class="action_wp">
        <ActionWp/>
      </div>
      <div class="thanks">
        <Thanks/>
      </div>
    </div>
  </div>

</template>

<script setup lang='ts'>
import Carouse from './carouse/index.vue'
import Rank from './rank/index.vue'
import Upload from './upload/index.vue'
import CheckIn from './checkin/index.vue'
import ActionRace from './action_race/index.vue'
import ActionWp from './action_wp/index.vue'
import Action from './action/index.vue'
import Thanks from './thanks/index.vue'
import {onMounted} from "vue";
import useRankStore from "@/store/rank/rank.ts";

let rankStore = useRankStore();

onMounted(async () =>{
  await rankStore.getPointList();
  await rankStore.getTeamPointList();
})
</script>

<style scoped lang="scss">
.body{
  display: flex;
  margin-bottom: 5vh;
  .body_left{
    margin-top: 20px;
    .crouse{

      display: flex;
    }
    .action{
      margin-top: 20px;
    }
  }

  .body_right{
    margin-top: 20px;
    .checkin{
      margin-left: 20px;
    }
    .upload{
      margin-top: 20px;
      margin-left: 20px;
    }
    .action_race{
      margin-top: 20px;
      margin-left: 40px;
    }
    .action_wp{
      margin-top: 20px;
      margin-left: 20px;
    }
    .thanks{
      margin-top: 20px;
      margin-left: 20px;
    }
  }

}
</style>