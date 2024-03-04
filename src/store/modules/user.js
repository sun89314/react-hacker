import { createSlice } from '@reduxjs/toolkit'
import { http, request } from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/token'
import { loginAPI, getUserInfoAPI } from '@/apis/user'
const userStore = createSlice({
    name: 'user',
    // 数据
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setUserToken(state, action) {
            state.token = action.payload
            // 存入本地
            setToken(state.token)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

// 解构出actionCreater
const { setUserToken, setUserInfo, clearUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setUserToken(res.data.token))
    }
}


const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfoAPI()
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer