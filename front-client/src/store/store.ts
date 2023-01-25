// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { createSlice ,configureStore, PayloadAction } from '@reduxjs/toolkit'

const menuClickCheck = createSlice({
  name: 'menuClick',
  initialState: false,
  reducers: {
    changeMenuState(state) {
      if (state === false) {
        return state = true
      } else {
        return state = false
      }
    } 
  }
})

const alarmClickCheck = createSlice({
  name: 'alarmClick',
  initialState: false,
  reducers: {
    changeAlarmState(state) {
      if (state === false) {
        return state = true
      } else {
        return state = false
      }
    } 
  }
})


export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    menuClickCheck: menuClickCheck.reducer,
    alarmClickCheck: alarmClickCheck.reducer
  },
})

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {changeMenuState} = menuClickCheck.actions
export const {changeAlarmState} = alarmClickCheck.actions

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch

