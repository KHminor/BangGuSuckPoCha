// createSlice: store state 생성 (name: state 변수 이름, initialState: 초기 데이터, reducers: state 변경 함수)
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { create } from "domain";

/*
===============================================================================================================================
==========================================================일반데이터===========================================================
===============================================================================================================================
*/
const menuClickCheck = createSlice({
  name: "menuClick",
  initialState: false,
  reducers: {
    changeMenuState(state) {
      return !state;
    },
  },
});

//유저이름 
const userName = createSlice({
  name: "userName",
  initialState: "",
  reducers: {
    changeUserName(state, action) {
      return state = action.payload
    },
  },
});

//myPage 중복확인 삭제예정
const myPageCheck = createSlice({
  name: "myPageCheck",
  initialState: false,
  reducers: {
    changeMyPageCheck(state, action) {
      return state = action.payload;
    }
  },
})



const alarmClickCheck = createSlice({
  name: "alarmClick",
  initialState: false,
  reducers: {
    changeAlarmState(state) {
      return !state;
    },
  },
});

// 메인에서 방생성 버튼 클릭시 보이는 테마선택 캐러셀
const mainCreateRoomCarouselCheck = createSlice({
  name: "mainCreateRoomCarousel",
  initialState: false,
  reducers: {
    changeCarouselState(state) {
      return !state;
    },
  },
});

// 테마 선택 캐러셀에서 클릭한 테마에 따른 state 변경
// 0: 안보이기, 1:소통, 2:게임, 3:헌팅
const createThemeRoomCheck = createSlice({
  name: "createRoom",
  initialState: 0,
  reducers: {
    changeThemeRoomState(state, action) {
      return (state = action.payload);
    },
  },
});

//admin페이지 Reprot 데이터
const adminreport = createSlice({
  name: "adminreport",
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
    },
  ],
  reducers: {},
});

//admin페이지 UserList 데이터

const adminUser = createSlice({
  name: "user",
  initialState: [
    {
      nickname: "장난꾸러기1",
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
    }, {
      nickname: "장난꾸러기2",
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
    }, {
      nickname: "장난꾸러기3",
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
    }, {
      nickname: "장난꾸러기4",
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
    }, {
      nickname: "장난꾸러기5",
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
    }, {
      nickname: "장난꾸러기6",
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
    }, {
      nickname: "장난꾸러기7",
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
    }, {
      nickname: "장난꾸러기8",
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
    }, {
      nickname: "장난꾸러기9",
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
    }, {
      nickname: "장난꾸러기10",
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
    }, {
      nickname: "장난꾸러기11",
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
    }, {
      nickname: "장난꾸러기12",
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
    },
  },
});

const adminRoom = createSlice({
  name: "room",
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
  reducers: {},
});

// Nav의 menu에 있는 friend 클릭 여부
const menuFriendClickCheck = createSlice({
  name: "menuFriendClick",
  initialState: false,
  reducers: {
    changeMenuFriendState(state) {
      return !state;
    },
  },
});

// Nav의 menu에 있는 friend의 친구 목록 클릭 여부
const menuFriendChatClickCheck = createSlice({
  name: "menuFriendChatClick",
  initialState: false,
  reducers: {
    // 추후 action.payload로 채팅방 번호를 받아서 보여줘야 할듯?
    changeMenuFriendChatState(state) {
      return !state;
    },
  },
});

// 룸에있는 유저 프로필 클릭 여부
const RoomUserProfileClickCheck = createSlice({
  name: 'RoomUserProfileCheck',
  initialState: false,
  reducers: {
    showRoomUserProfile(state) {
      return !state
    }
  }
})

// Room에 있는 유저 친구 클릭 여부
const roomAddFriendModalCheck = createSlice({
  name: "roomAddFriendModalState",
  initialState: false,
  reducers: {
    roomAddFriendModalState(state) {
      return !state;
    },
  },
});


// Room에 있는 유저 강퇴 클릭 여부
const RoomUserBanClickCheck = createSlice({
  name: 'RoomUserBanCheck',
  initialState: false,
  reducers: {
    showRoomUserBanModal(state) {
      return !state
    }
  }
})

// Room에 있는 유저 신고 클릭 여부
const RoomUserReportClickCheck = createSlice({
  name: 'RoomUserReportCheck',
  initialState: false,
  reducers: {
    showRoomUserReportModal(state) {
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

// 방 만들때 인원 체크 
const createRoomChoicePeople = createSlice({
  name: 'createRoomChoicePeople',
  initialState: 2,
  reducers: {
    changeCreateRoomChoicePeople(state, action) {
      return state = action.payload
    }
  }
})

// 방 만들때 나이 체크 
const createRoomChoiceAge = createSlice({
  name: 'createRoomChoiceAge',
  initialState: 'ALL',
  reducers: {
    changeCreateRoomChoiceAge(state, action) {
      return state = action.payload
    }
  }
})

// 방 만들때 지역 체크 
const createRoomChoiceRegion = createSlice({
  name: 'createRoomChoiceAge',
  initialState: '전국',
  reducers: {
    changeCreateRoomChoiceRegion(state, action) {
      return state = action.payload
    }
  }
})

// 방 만들때 태그 체크 
const createRoomChoiceTag = createSlice({
  name: 'createRoomChoiceTag',
  initialState: [],
  reducers: {
    // 클릭 후 추가하는 함수
    changeCreateRoomChoiceAddTag(state: any, action: any): any {
      state.push(action.payload)
    },
    changeCreateRoomChoiceRemoveTag(state: any, action: any): any {
      const newState = state.filter((e: any) => {
        return e != action.payload
      })
      return state = newState
    },
    // 태그 초기화하는 함수
    changeCreateRoomChoiceTagReset(state: any): any {
      return state = []
    },
  }
})

// 방 만들때 테마Id 체크 
const createRoomThemeCheck = createSlice({
  name: 'createRoomThemeCheck',
  initialState: 'T0B0',
  reducers: {
    changeCreateRoomThemeCheck(state, action) {
      return state = action.payload
    }
  }
})

// 만들어진 방 리스트 (관리자 controller Api) 
const mainCreateRoomList = createSlice({
  name: 'mainCreateRoomList',
  initialState: [],
  reducers: {
    changeMainCreateRoomList(state, action) {
      return state = action.payload
    }
  }
})

// PublicModal 끄고 켜는 함수
const PublicModal = createSlice({
  name: 'PublicModal',
  initialState: false,
  reducers: {
    showPublicModal(state) {
      return !state
    }
  }
})

// nav -> alarm -> review에 있는 리뷰 목록에 있는 클릭한 유저 데이터
const navAlarmReviewEmojiUserData = createSlice({
  name: 'navAlarmReviewEmojiUserData',
  initialState: 0,
  reducers: {
    changeNavAlarmReviewEmojiUserData(state,action) {
      return state = action.payload
    }
  }
})

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
    createRoomChoicePeople: createRoomChoicePeople.reducer,
    createRoomChoiceAge: createRoomChoiceAge.reducer,
    createRoomChoiceRegion: createRoomChoiceRegion.reducer,
    createRoomChoiceTag: createRoomChoiceTag.reducer,
    createRoomThemeCheck: createRoomThemeCheck.reducer,
    roomAddFriendModalCheck: roomAddFriendModalCheck.reducer,
    RoomUserBanClickCheck: RoomUserBanClickCheck.reducer,
    RoomUserReportClickCheck: RoomUserReportClickCheck.reducer,
    PublicModal: PublicModal.reducer,
    // 관리자
    mainCreateRoomList: mainCreateRoomList.reducer,
    // username
    userName: userName.reducer,
    // EmojiClickUserData
    navAlarmReviewEmojiUserData: navAlarmReviewEmojiUserData.reducer,

    myPageCheck: myPageCheck.reducer,
  },
});
//주석추가

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
export const { changeCreateRoomChoicePeople } = createRoomChoicePeople.actions
export const { changeCreateRoomChoiceAge } = createRoomChoiceAge.actions
export const { changeCreateRoomChoiceRegion } = createRoomChoiceRegion.actions
export const { changeCreateRoomChoiceAddTag, changeCreateRoomChoiceRemoveTag, changeCreateRoomChoiceTagReset } = createRoomChoiceTag.actions
export const { changeCreateRoomThemeCheck } = createRoomThemeCheck.actions
export const { roomAddFriendModalState } = roomAddFriendModalCheck.actions
export const { showRoomUserBanModal } = RoomUserBanClickCheck.actions
export const { showRoomUserReportModal } = RoomUserReportClickCheck.actions
export const { showPublicModal } = PublicModal.actions
// 관리자
export const { changeMainCreateRoomList } = mainCreateRoomList.actions
// username
export const { changeUserName } = userName.actions
// EmojiClickUserData
export const { changeNavAlarmReviewEmojiUserData } = navAlarmReviewEmojiUserData.actions
export const { changeMyPageCheck } = myPageCheck.actions

// store의 타입 미리 export 해둔 것.
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입을 store에서 가져와서 export해주기
export type AppDispatch = typeof store.dispatch;