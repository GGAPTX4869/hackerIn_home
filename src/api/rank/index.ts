import request from '@/utils/request.ts'

enum API {
  GET_RANK_POINT_LIST = '/public/rank/getpoint',
  GET_TEAM_RANK_POINT_LIST = '/public/rank/team/getpoint',
  GET_RANK_INFO_LIST = '/rank/rank/getlist',
}

export const reqGetRankPointList = () =>
  request.get<any, any>(API.GET_RANK_POINT_LIST)

export const reqGetTeamRankPointList = () =>
  request.get<any, any>(API.GET_TEAM_RANK_POINT_LIST)

export const reqGetRankInfoList = (page:any,limit:any) =>
    request.get<any, any>(API.GET_RANK_INFO_LIST,{
      params: {
        page: page,
        limit: limit,
      },
    })