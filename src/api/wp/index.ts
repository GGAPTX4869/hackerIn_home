import request from "@/utils/request.ts";

enum API{
    GET_LIST_BY_GROUP ='/writeup/wp/getlistbg',
    REFRESH_DOWNLOAD ='/writeup/wp/download/refresh',
    ADD_AUDIT_WP ='/writeup/wp/audit/add',
    UPLOAD_WP_FILE ='/public/writeup/wp/file/upload',

    GET_CHALLENGE_BY_TYPE = '/challenge/challenge/getbytype',

}

export const reqGetWpListByGroup = (data: any) => request.post<any, any>(API.GET_LIST_BY_GROUP, data)
export const reqAddAuditWp = (data: any) => request.post<any, any>(API.ADD_AUDIT_WP, data)
export const reqUploadWpFile = (data: any) => request.post<any, any>(API.UPLOAD_WP_FILE, data)
export const reqRefreshDownLoad = (data:any) => request.get<any,any>(API.REFRESH_DOWNLOAD,{
    params:{
        challengename:data,
    }
})

export const reqGetChallengeByType = (data:string) =>
    request.get<any, any>(API.GET_CHALLENGE_BY_TYPE,{
        params: {
            challengetypeid: data
        },
    })