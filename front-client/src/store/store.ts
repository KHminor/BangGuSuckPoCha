// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'


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

//admin페이지 Reprot 데이터
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
      result: "",
      point: 0,
    }

  ],
  reducers: {

  }
})

//admin페이지 UserList 데이터
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

const adminRoom = createSlice({
  name: 'room',
  initialState: [
    {
      num: 1,
      theme: "소통",
      lock: "X",
      sull: "O",
      title: "나는 이런것까지 먹어본적 있다",
      startdate: "2023-01-18",
      starttime: "20:22:08",
    },
    {
      num: 2,
      theme: "게임",
      lock: "O",
      sull: "X",
      title: "",
      startdate: "2023-01-18",
      starttime: "20:25:08",
    },
    {
      num: 3,
      theme: "게임",
      lock: "O",
      sull: "X",
      title: "",
      startdate: "2023-01-18",
      starttime: "20:25:08",
    },
    {
      num: 4,
      theme: "게임",
      lock: "X",
      sull: "X",
      title: "",
      startdate: "2023-01-18",
      starttime: "20:25:08",
    },
    {
      num: 5,
      theme: "소통",
      lock: "O",
      sull: "O",
      title: "니가 그렇게 싸움을 잘해?",
      startdate: "2023-01-18",
      starttime: "20:25:08",
    },
  ],
  reducers: {

  }
})

// Nav의 menu에 있는 friend 클릭 여부
const menuFriendClickCheck = createSlice({
  name: 'menuFriendClick',
  initialState: false,
  reducers: {
    changeMenuFriendState(state) {
      return !state
    }
  }
})

// Nav의 menu에 있는 friend의 친구 목록 클릭 여부
const menuFriendChatClickCheck = createSlice({
  name: 'menuFriendChatClick',
  initialState: false,
  reducers: {
    // 추후 action.payload로 채팅방 번호를 받아서 보여줘야 할듯?
    changeMenuFriendChatState(state) {
      return !state
    }
  }
})

// Nav의 alarm에 있는 요청, 초대, 리뷰 클릭 상태
// 요청:0(default), 초대:1, 리뷰:2
const alarmClickState = createSlice({
  name: 'alarmClickState',
  initialState: 0,
  reducers: {
    changeAlarmClickState(state, action) {
      return state = action.payload
    }
  }
})


// Nav의 alarm을 클릭 후 요청, 초대, 리뷰에 따른 api 데이터 변경
const alarmApiData = createSlice({
  name: 'alarmApiData',
  initialState: [],
  reducers: {
    changeAlarmApiDataState(state, action) {
      return state = action.payload
    }
  }
})

// Nav의 menu 클릭 후 friend list 요청 api 데이터
const menuFriendListApiData = createSlice({
  name: 'enuFriendListApiData',
  initialState: [],
  reducers: {
    changeMenuFriendListApiDataState(state, action) {
      return state = action.payload
    }
  }
})

// Room에 있는 유저들 프로필 클릭 여부
  const RoomUserProfileClickCheck = createSlice({
  name: 'RoomUserProfileCheck',
  initialState: false,
  reducers: {
    showRoomUserProfile(state) {
      return !state
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
    adminRoom: adminRoom.reducer,
    menuFriendClickCheck: menuFriendClickCheck.reducer,
    menuFriendChatClickCheck: menuFriendChatClickCheck.reducer,
    alarmClickState: alarmClickState.reducer,
    alarmApiData: alarmApiData.reducer,
    menuFriendListApiData: menuFriendListApiData.reducer,
    RoomUserProfileClickCheck: RoomUserProfileClickCheck.reducer,
  },
})


// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const { changeMenuState } = menuClickCheck.actions
export const { changeAlarmState } = alarmClickCheck.actions
export const { changeCarouselState } = mainCreateRoomCarouselCheck.actions
export const { changeThemeRoomState } = createThemeRoomCheck.actions
export const { findDetail, deleteUser } = adminUser.actions
export const { changeMenuFriendState } = menuFriendClickCheck.actions
export const { changeMenuFriendChatState } = menuFriendChatClickCheck.actions
export const { changeAlarmApiDataState } = alarmApiData.actions
export const { changeAlarmClickState } = alarmClickState.actions
export const { changeMenuFriendListApiDataState } = menuFriendListApiData.actions
export const { showRoomUserProfile } = RoomUserProfileClickCheck.actions


// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;