import request from '@/utils/request.ts'

enum API {

    GET_ACTION_BY_ID= '/action/getbyid',

    GET_ACTION_LIST = '/public/action/action/getlist',

    GET_NOTICE_ALLOW_LIST = '/action/notice/allow/getlist',

    CHECKUP_FLAG = '/action/actionre/checkup',
    GET_ACTIONRE_LIST = '/action/actionre/getlist',
    GET_ACTIONRE_LIST_BY_TEAMID = '/action/actionre/getbyteam',

    GET_ACTIONRE_ALL_BY_USERID = '/action/actionre/getallbyid',
    REFRESH_COMMENT_READER = '/action/action/rc',
}

export const reqGetActionList = (page:any,limit:any) =>
    request.get<any, any>(API.GET_ACTION_LIST,{
        params: {
            page:page,
            limit:limit,
        },
    })
export const reqGetAllowNoticeList = (page:any,limit:any) =>
    request.get<any, any>(API.GET_NOTICE_ALLOW_LIST,{
        params: {
            page:page,
            limit:limit,
        },
    })

export const reqGetNoticeById = (data:any) =>
    request.get<any, any>(API.GET_ACTION_BY_ID,{
        params: {
            actionid:data,
        },
    })
export const reqGetActionReAllById = (data:any) =>
    request.get<any, any>(API.GET_ACTIONRE_ALL_BY_USERID,{
        params: {
            userid:data,
        },
    })

export const reqCheckUpFlag = (data:any) =>
    request.get<any,any>(API.CHECKUP_FLAG,{
        params:{
            challengeid:data,
        }
    })

export const reqActionReByTeamId = (data:any) =>
    request.get<any,any>(API.GET_ACTIONRE_LIST_BY_TEAMID,{
        params:{
            teamid:data,
        }
    })
export const reqRefreshComment = (data:any) =>
    request.get<any,any>(API.REFRESH_COMMENT_READER,{
        params:{
            actionid:data,
        }
    })
export const reqGetActionReList = (data:any) =>
    request.post<any,any>(API.GET_ACTIONRE_LIST,data)
