import request from '@/utils/request.ts'
import { loginForm, loginResData, userInfoResData } from './type.ts'
import { commonRedData } from '../commonres/type.ts'

enum API {
  LOGIN_URL = '/public/user/login',
  // GETUSERLIST_URL = '/user/getlist'
  GET_USERINFO_URL = '/user/getuser',
  USER_LOGOUT_URL = '/public/user/logout',


  UPLOAD_USER_AVATAR = '/user/upload/avatar',

    GET_USER_INFO_BY_ID = '/user/userinfo/getbyid',
    CHECK_USER_LOGIN = '/user/checklogin/checklogin',
    CHECK_GET_USER_LOGIN_INFO = '/user/checklogin/getinfo',

  USER_GET_ALL = '/user/userinfo/getall',


}

export const reqLogin = (data: any) =>
  request.post<any, loginResData>(API.LOGIN_URL, data)

export const reqCheckUser = (data: any) =>
  request.get<any, any>(API.CHECK_USER_LOGIN, data)

export const reqGetCheckInfo = (data: any) =>
  request.get<any, any>(API.CHECK_GET_USER_LOGIN_INFO, data)

// export const reqGetUserList = () => request.get<any,userListResData>(API.GETUSERLIST_URL,data)

export const reqGetUserInfo = () =>
  request.get<any, userInfoResData>(API.GET_USERINFO_URL)

export const reqUserLogout = (data: string) =>
  request.get<any, commonRedData>(API.USER_LOGOUT_URL, {
    params: {
      userid: data,
    },
  })

export const reqUploadAvatar = () =>request.post<any,any>(API.UPLOAD_USER_AVATAR)

export const reqGetUserInfoById = (data:any)=>request.get<any,any>(API.GET_USER_INFO_BY_ID,{
    params:{
        userid:data,
    }
})

export const reqGetAllUser = () =>
    request.get<any, userInfoResData>(API.USER_GET_ALL)
