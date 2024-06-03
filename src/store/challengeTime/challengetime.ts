import {defineStore} from "pinia";
import {
    reqGetChallengeCompTypeAll,
    reqGetChallengeList,
    reqGetChallengeTypeAll,
    reqGetChallengeTypeList
} from "../../api/challenge";


const useChallengeTimeStore = defineStore('challengetime',{
    state:()=>{
        return{

        }
    },
    actions:{

    },
    getters:{

    }
})

export default useChallengeTimeStore;