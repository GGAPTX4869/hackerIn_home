import request from "@/utils/request.ts";

enum API{
    GET_TEAM_LIST = '/team/team/getlist',
    GET_TEAM_BY_ID = '/team/team/getbyid',
    ADD_TEAM = '/team/team/add',
    GET_TEAM_BY_LIEADERID = '/team/team/getbyleader',
    ADD_TEAMUSER = '/team/teamuser/add',
    Del_TEAMUSER = '/team/teamuser/del',
    ADD_AUDIT_TEAMUSER = '/team/audit/add',
    GET_TEAMINFO_BY_ID = '/team/team/teaminfo/getbyid',

    GET_TEAMUSER_ID_LIST = '/team/teamuser/getidlist',

    UPDATE_TEAM = '/team/team/update',
    UPDATE_TEAMUSER = '/team/teamuser/update',

    DEL_TEAM = '/team/team/del',


    ADD_APPLI_TEAMUSER = '/team/team/appli/add',
    GET_APPLI_TEAMUSER = '/team/team/appli/getbyid',
    CONFIRM_APPLI_TEAMUSER = '/team/team/appli/confirm',
    GET_CONFIRM_APPLI_TEAMUSER = '/team/team/appli/getconf',
}
export const reqGetTeamList = (page: any, limit: any,teamname:any) =>
    request.get<any, any>(API.GET_TEAM_LIST, {
        params: {
            page: page,
            limit: limit,
            teamname:teamname,
        },
    })

export const reqDelTeamUser = (data: any) =>
    request.post<any, any>(API.Del_TEAMUSER, data)
export const reqGetTeamById = (data:any) =>
    request.get<any, any>(API.GET_TEAM_BY_ID, {
        params: {
            teamid:data,
        },
    })

export const reqGetTeamInfoById = (data:any) =>
    request.get<any, any>(API.GET_TEAMINFO_BY_ID, {
        params: {
            teamid:data,
        },
    })

export const reqGetConfTeamUserById = (data:any) =>
    request.get<any, any>(API.GET_CONFIRM_APPLI_TEAMUSER, {
        params: {
            teamid:data,
        },
    })
export const reqAddTeamUserAppli = (data:any) =>
    request.get<any, any>(API.ADD_APPLI_TEAMUSER, {
        params: {
            teamid:data.teamid,
            userid:data.userid,
        },
    })
export const reqGetTeamUserAppli = (data:any) =>
    request.get<any, any>(API.GET_APPLI_TEAMUSER, {
        params: {
            teamid:data.teamid,
            userid:data.userid,
        },
    })
export const reqConfirmTeamUserAppli = (data:any) =>
    request.get<any, any>(API.CONFIRM_APPLI_TEAMUSER, {
        params: {
            teamid:data.teamid,
            userid:data.userid,
        },
    })

export const reqGetTeamByLeaderId = (data:any) =>
    request.get<any, any>(API.GET_TEAM_BY_LIEADERID, {
        params: {
            teamleaderid:data,
        },
    })

export const reqAddTeam = (data:any) =>
    request.post<any, any>(API.ADD_TEAM,data)

export const reqAddTeamUser = (data:any) =>
    request.post<any, any>(API.ADD_TEAMUSER,data)

export const reqAddAduitTeam = (data:any) =>
    request.post<any, any>(API.ADD_AUDIT_TEAMUSER,data)

export const reqGetTeamUserList = (data: any) =>
    request.get<any, any>(API.GET_TEAMUSER_ID_LIST, {
        params: {
            teamid: data,
        },
    })

export const reqUpdateTeam = (data: any) =>
    request.post<any, any>(API.UPDATE_TEAM, data)

export const reqUpdateTeamUser = (data: any) =>
    request.post<any, any>(API.UPDATE_TEAMUSER, data)



export const reqDelTeam = (data: any) =>
    request.get<any, any>(API.DEL_TEAM, {
        params: {
            teamid: data,
        },
    })
