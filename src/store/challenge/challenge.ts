import {defineStore} from "pinia";
import {
    reqGetChallengeByGroup,
    reqGetChallengeCompTypeAll,
    reqGetChallengeList,
    reqGetChallengeTypeAll,
    reqGetChallengeTypeList
} from "../../api/challenge";


const useChallengeStore = defineStore('challenge',{
    state:()=>{
        return{
            challengeTypeList:[],
            challengeTypeTotal:0,
            challengeList:[],
            challengeTotal:0,
            challengeTypeAll:[],
            challengeCompTypeAll:[],
            challengeChangeId:'',
        }
    },
    actions:{
        async GetChallengeTypeList(page:any,limit:any){
            let result = await reqGetChallengeTypeList(page,limit);
            if (result.code == 200){
                this.challengeTypeList = result.data;
                this.challengeTypeTotal = result.total;
            }
        },
        async GetChallengeTypeAll(page:any,limit:any){
            let result = await reqGetChallengeTypeAll();
            if (result.code == 200){
                this.challengeTypeAll = result.data;
            }
        },
        async GetChallengeCompTypeAll(){
            let result = await reqGetChallengeCompTypeAll();
            if (result.code == 200){
                this.challengeCompTypeAll = result.data;
            }
        },
        async GetChallengeList(page:any,limit:any){
            let result = await reqGetChallengeList(page,limit);
            if (result.code == 200){
                this.challengeList = result.data;
                this.challengeTotal = result.total;
            }
        },
        async GetChallengeByGroup(data:any){
            let result = await reqGetChallengeByGroup(data);

            if (result.code == 200){
                this.challengeList = result.data;
                this.challengeTotal = result.total;
                console.log(result)
                if (result.data == []){
                    this.challengeList = [];
                    this.challengeTotal = 0;
                }
            }
        },
    },
    getters:{

    }
})

export default useChallengeStore;