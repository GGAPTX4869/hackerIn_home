import request from "@/utils/request.ts";

enum API{
    GET_COMMENT_BY_TYPEID = '/comment/comment/getbyid',
    ADD_COMMENT = '/comment/comment/add',
}

export const reqAddComment = (data:any) => request.post<any, any>(API.ADD_COMMENT,data)
export const reqGetComment = (data:any) => request.post<any, any>(API.GET_COMMENT_BY_TYPEID,data)

