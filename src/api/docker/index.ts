import request from '@/utils/request.ts'
import {GET_CONTAINER_ID, GET_DOCKERURL} from "../../utils/challenge.ts";

enum API {
    OPEN_DOCKER = '/docker/containers/add',
    DEL_DOCKER = '/docker/containers/rmcontainer',
}

export const reqOpenDocker = (data:any) =>
    request.post<any, any>(API.OPEN_DOCKER,data)

export const reqDelDocker = () =>
    request.get<any, any>(API.DEL_DOCKER,{
        params: {
            containerid:GET_CONTAINER_ID()
        },
    })
