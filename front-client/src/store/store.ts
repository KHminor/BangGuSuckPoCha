// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { createSlice ,configureStore, PayloadAction } from '@reduxjs/toolkit'


//----------------일반데이터---------------------- 
const menuClickCheck = createSlice({
  name: 'menuClick',
  initialState: false,
  reducers: {
    changeMenuState(state) {
      return !state
    }
  }
})

const alarmClickCheck = createSlice({
  name: 'alarmClick',
  initialState: false,
  reducers: {
    changeAlarmState(state) {
      return !state
    }
  }
})

// 메인에서 방생성 버튼 클릭시 보이는 테마선택 캐러셀
const mainCreateRoomCarouselCheck = createSlice({
  name: 'mainCreateRoomCarousel',
  initialState: false,
  reducers: {
    changeCarouselState(state) {
      return !state
    }
  }
})

// 테마 선택 캐러셀에서 클릭한 테마에 따른 state 변경
// 0: 안보이기, 1:소통, 2:게임, 3:헌팅
const createThemeRoomCheck = createSlice({
  name: 'createRoom',
  initialState: 0,
  reducers: {
    changeThemeRoomState(state, action) {
      return state = action.payload
    }
  }
})

const adminreport = createSlice({
  name: 'adminreport',
  initialState: [
    {
      reportnum: 1,
      reporter: "한상현",
      reported: "장꾸",
      type: "욕설/협박",
      reason: "술 마시다가 갑자기 저보고 한상현 닮았다고 함",
      date: "2023-01-18",
      result: "O",
      point: 10,
    },
    {
      reportnum: 1,
      reporter: "한상현",
      reported: "장꾸",
      type: "욕설/협박",
      reason: "술 마시다가 갑자기 저보고 한상현 닮았다고 함",
      date: "2023-01-18",
      result: "X",
      point: 0,
    }

  ],
  reducers: {

  }
})

const adminUser = createSlice({
  name: 'user',
  initialState: [
    {
      nickname: "장난꾸러기",
      age: 28,
      yymmdd: 960418,
      birthday: "0418",
      region: "부산광역시",
      manner: 34,
      report: 3,
      demerit: 3,
      age_group: "20대",
      left_report: 2,
      ban: false,
      admin: false,
    },
  ],
  reducers: {
    findDetail(state, action) {
      const select = state.findIndex((num) => {
        return num.nickname === action.payload;
      });

    },
    deleteUser(state, action) {
      const select = state.findIndex((num) => {
        return num.nickname === action.payload;
      });
      state.pop();
    }
  }
})




//----------------API요청---------------------- 






// 
export const store = configureStore({
  // store에서 만든 state를 전역에서 사용할 수 있도록 등록하기
  reducer: {
    menuClickCheck: menuClickCheck.reducer,
    alarmClickCheck: alarmClickCheck.reducer,
    mainCreateRoomCarouselCheck: mainCreateRoomCarouselCheck.reducer,
    createThemeRoomCheck: createThemeRoomCheck.reducer,
    adminUser: adminUser.reducer,
    adminreport: adminreport.reducer,
  },
})


// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const { changeMenuState } = menuClickCheck.actions
export const { changeAlarmState } = alarmClickCheck.actions
export const { changeCarouselState } = mainCreateRoomCarouselCheck.actions
export const { changeThemeRoomState } = createThemeRoomCheck.actions
export const { findDetail, deleteUser } = adminUser.actions


// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch

