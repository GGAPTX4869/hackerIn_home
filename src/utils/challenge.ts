// 封装本地存储数据
export const SET_TIME_LEFT = (data: any) => {
    localStorage.setItem('timeleft', data)
}

// 获取本地存储token
export const GET_TIME_LEFT = () => {
    return localStorage.getItem('timeleft')
}

// 本地存储删除数据
export const DEL_TIME_LEFT = () => {
    localStorage.removeItem('timeleft')
}

// ——————————————————————————————————————————————————————————————————————————————————
// 封装本地存储数据
export const SET_CHALLENGEID = (data: any) => {
    localStorage.setItem('challengeid', data)
}

// 获取本地存储token
export const GET_CHALLENGEID = () => {
    return localStorage.getItem('challengeid')
}

// 本地存储删除数据
export const DEL_CHALLENGEID = () => {
    localStorage.removeItem('challengeid')
}


// ——————————————————————————————————————————————————————————————————————————————————
// 封装本地存储数据
export const SET_DOCKERURL = (data: any) => {
    localStorage.setItem('dockerurl', data)
}

// 获取本地存储token
export const GET_DOCKERURL = () => {
    return localStorage.getItem('dockerurl')
}

// 本地存储删除数据
export const DEL_DOCKERURL = () => {
    localStorage.removeItem('dockerurl')
}

// ——————————————————————————————————————————————————————————————————————————————————

export const SET_CONTAINER_ID = (data: any) => {
    localStorage.setItem('containerid', data)
}

// 获取本地存储token
export const GET_CONTAINER_ID = () => {
    return localStorage.getItem('containerid')
}

// 本地存储删除数据
export const DEL_CONTAINER_ID = () => {
    localStorage.removeItem('containerid')
}

// ——————————————————————————————————————————————————————————————————————————————————

export const SET_ATTACHMENT_URL = (data: any) => {
    localStorage.setItem('attachment', data)
}

// 获取本地存储token
export const GET_ATTACHMENT_URL = () => {
    return localStorage.getItem('attachment')
}

// 本地存储删除数据
export const DEL_ATTACHMENT_URL = () => {
    localStorage.removeItem('attachment')
}

