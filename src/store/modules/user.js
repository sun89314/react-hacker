import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { getToken, setToken as _setToken } from '@/utils/token'
const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.token = action.payload
            _setToken(action.payload)
            state.userInfo = action.payload
        }
    }
})

// 解构出actionCreater
const { setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations', loginForm)
        dispatch(setUserInfo(res.data.token))
    }
}

export { fetchLogin }

export default userReducer