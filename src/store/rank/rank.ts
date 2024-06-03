import {defineStore} from "pinia";
import {reqGetRankPointList, reqGetTeamRankPointList} from "../../api/rank";


const useRankStore = defineStore('Rank',{
    state:() =>{
        return{
            pointsList:[],
            teamPointsList:[],
        }

    },
    actions:{
        async getPointList(){
            let result = await reqGetRankPointList();
            this.pointsList = result.data;
        },
        async getTeamPointList(){
            let result = await reqGetTeamRankPointList();
            this.teamPointsList = result.data;
        }
    },
    getters:{

    }
})

export default useRankStore