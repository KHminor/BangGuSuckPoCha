// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { createSlice ,configureStore, PayloadAction } from '@reduxjs/toolkit'
// 

// 아래가 basic store state 생성, 물론 reducers를 작성하지 않아도 가능
// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: {count: 0, user: 'kim'},
//   reducers: {
//     increment(state) {
//       state.count += 1
//     },
//     incrementByAmount(state, action: PayloadAction<number>) {
//       state.count += action.payload
//     }
//   }
// })



export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    // counter1: counterSlice.reducer,
  },
})

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
// export const {increment, incrementByAmount} = counterSlice.actions

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch

