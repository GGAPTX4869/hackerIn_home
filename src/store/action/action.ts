import {defineStore} from "pinia";
import {reqGetActionList, reqGetAllowNoticeList} from "../../api/action";



const useActionStore = defineStore('action',{
    state:()=>{
        return{
            actionList:[],
            actionTotal:0,
            noticeList:[],
            noticeTotal:0,
        }
    },
    actions:{
        async GetActionList(page:any,limit:any){
            let result = await reqGetActionList(page,limit);
            if (result.code == 200){
                this.actionList = result.data;
                this.actionTotal = result.total;
            }
            console.log(result)
        },
        async GetAllowNoticeList(page:any,limit:any){
            let result = await reqGetAllowNoticeList(page,limit)
            if (result.code == 200){
                this.noticeList = result.data;
                this.noticeTotal = result.total;
            }
        },

    },
    getters:{

    }
})

export default useActionStore