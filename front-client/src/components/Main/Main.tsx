import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeCarouselState,
  changeMenuState,
  changeAlarmState,
  changeMainCreateRoomList,
} from "../../store/store";
import FriendChat from "../Common/FriendChat";
import FriendList from "../Common/FriendList";
import Navbar from "../Common/Navbar";
import NavbarAlarm from "../Common/NavbarAlarm";
import NavbarMenu from "../Common/NavbarMenu";
import NavUserEmojiClickModal from "../Common/NavUserEmojiClickModal";
import CardInside from "./CardInside";
import styles from "./Main.module.css";
import MainCreateRoom from "./MainCreateRoom";
import MainCreateRoomCarousel from "./MainCreateRoomCarousel";
import Tag from "./Tag";

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const mainCreateRoomList: any = useAppSelector((state) => {
    return state.mainCreateRoomList;
  });

  
  // 메인 페이지 들어올 시 현재 userId가 localStorage에 저장이 안되어있을 경우 axios 요청하여 넣어주기
  useEffect(()=> {
    const userName = localStorage.getItem('Username')
    if (localStorage.getItem('userId') === null) {
      axios.get(`https://i8e201.p.ssafy.io/api/user/myinfo/${userName}`)
      .then((r)=> {
        localStorage.setItem('userId',r.data.data.userId )
      })
    }
  },[])
  
  // 메인에 들어올 시 현재 생성된 방 리스트 state 갱신
  useEffect(() => {
    axios({
      method: "get",
      url: "https://i8e201.p.ssafy.io/api/admin/pocha",
    }).then((r) => {
      dispatch(changeMainCreateRoomList(r.data.data));
    });
  }, []);

  // 방 생성 관련
  const createBtn = useRef<any>(null);
  // 포차 종류 캐러셀
  const mainCreateRoomCarouselCheck: any = useAppSelector(
    (state: any) => state.mainCreateRoomCarouselCheck
  );

  // 선택한 포차 테마 체크
  const createThemeRoomCheck: number = useAppSelector((state) => {
    return state.createThemeRoomCheck;
  });

  const onClickHiddenBtn = () => {
    createBtn.current.classList.toggle("hidden");
  };

  // 메뉴 클릭 상태
  const checkMenuState: any = useAppSelector((state: any) => {
    return state.menuClickCheck;
  });
  // 알람 클릭 상태
  const alarmClickCheck: any = useAppSelector((state: any) => {
    return state.alarmClickCheck;
  });

  //  메뉴 -> 친구 클릭 -> 채팅 상태
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck;
  });

  const navAlarmReviewEmojiUserData: any = useAppSelector((state: any) => {
    return state.navAlarmReviewEmojiUserData;
  });
  const RoomUserProfileClickCheck: any = useAppSelector((state: any) => {
    return state.RoomUserProfileClickCheck;
  });

  // 캐러셀 클릭시 알림&메뉴 컴포넌트 조건분기
  if (mainCreateRoomCarouselCheck) {
    if (checkMenuState) {
      dispatch(changeMenuState());
    } else if (alarmClickCheck) {
      dispatch(changeAlarmState());
    }
  }

  return (
    <>
      {/* nav의 메뉴 => friend 클릭 시 친구 목록 보이기 */}
      <FriendList />

      {menuFriendChatClickCheck ? <FriendChat /> : null}

      {/* 포차+ 클릭에 따른 테마선택 캐러셀 보이기 */}
      {mainCreateRoomCarouselCheck ? (
        <MainCreateRoomCarousel onClickHiddenBtn={onClickHiddenBtn} />
      ) : null}

      {/* 선택한 테마에 따른 방만들기 셋팅 */}
      {createThemeRoomCheck !== 0 ? (
        <MainCreateRoom
          onClickHiddenBtn={onClickHiddenBtn}
          roomTheme={createThemeRoomCheck}
        />
      ) : null}

      {RoomUserProfileClickCheck ? (
        <NavUserEmojiClickModal userData={navAlarmReviewEmojiUserData} />
      ) : null}

      <div
        className={`grid w-screen min-w-[75rem] h-screen ${styles.hideScroll}`}
        style={{
          backgroundColor: "rgb(25, 25, 25)",
          gridTemplateRows: "11rem 1fr",
          overflow: "auto",
        }}
      >
        <Navbar />

        <div
          className="grid"
          style={{ gridTemplateColumns: "12rem 1fr 12rem" }}
        >
          <div></div>
          <div
            className="grid mx-auto min-w-f"
            style={{
              gridTemplateRows: "20rem 1fr 3rem",
              backgroundColor: "rgb(25, 25, 25)",
            }}
          >
            {/* 태그 */}
            <div className="grid" style={{gridTemplateRows: '12rem 8rem'}}>
              <div></div>
              <Tag />
            </div>
            {/* 방 보이기 */}
            <div
              className="grid grid-cols-1 w-full min-w-[75rem]"
              style={{ backgroundColor: "rgb(25, 25, 25)" }}
            >
              <Room mainCreateRoomList={mainCreateRoomList} />
            </div>
          </div>
          <div></div>
        </div>

        {/* 방 생성 버튼 */}
        <div
          ref={createBtn}
          onClick={() => {
            dispatch(changeCarouselState());
            onClickHiddenBtn();
          }}
          className={`w-[6rem] min-w-[6rem] h-[3.5rem] min-h-[3.5rem] rounded-full flex justify-center items-center  fixed bottom-5 right-20 cursor-pointer z-50 bg-black ${styles.cancelBtn}`}
        >
          <span className="mr-1 text-[1.3rem] font-bold text-white">포차</span>
          <img
            src={require("../../assets/roomIcon/plus.png")}
            alt=""
            className="w-1/6 min-w-1/6"
          />
        </div>

        {/* 메뉴 클릭시 보이기 */}
        <NavbarMenu />
        {/* 알림 클릭시 보이기 */}
        <NavbarAlarm />
      </div>
    </>
  );
}
export default Main;


function Room({ mainCreateRoomList }: any): JSX.Element {
  // ssulTitle가 null일 경우 랜덤하게 넣어줄 문구
  const randomTitleList = [
    '즐겁게 웃으며 한잔😛',
    '이거 마시면 나랑 사귀는거다?😏',
    '오늘 여기 오길 참 잘 해따😵',
    '술이 달아서 네 생각이 나🤬',
    '흥청망청 취해보자👾',
    '즐겁게 웃으며 한잔😛',
    '이거 마시면 나랑 사귀는거다?😏',
    '오늘 여기 오길 참 잘 해따😵',
    '술이 달아서 네 생각이 나🤬',
    '흥청망청 취해보자👾'
  ]
  

  let cards: JSX.Element[] = mainCreateRoomList.map((e: any, idx: any) => {
    // console.log(e)
    // 포차 종류
    let themeType;
    if (e.themeId.substr(0, 2) === "T0") {
      themeType = "Talk";
    } else if (e.themeId.substr(0, 2) === "T1") {
      themeType = "Game";
    } else {
      themeType = "Meeting";
    }

    // 태그 정렬하기
    const TagList = e.tagList.map((tag: any) => {
      return `#${tag} `;
    });

    // 썰 타이틀 없을 시 랜덤 타이틀
    let SSulTitle = randomTitleList[e.pochaId%10]
    if (typeof e.ssulTitle !== 'object') {
      SSulTitle = e.ssulTitle
    }
    
    return (
      <div className="w-full h-[30rem] min-h-[30rem] min-w-[100%] max-w-[100%] my-8">
        <div
          className="grid grid-cols-2 h-full rounded-2xl w-full min-w-[100%]"
          style={{ gridTemplateColumns: "2.5rem 1fr 2.5rem" }}
        >
          <div></div>
          {/* 카드 내부 */}
          <div>
            <CardInside
              TagList={TagList}
              themeType={themeType}
              themeId={e.themeId}
              femaleCount={e.femaleCount}
              maleCount={e.maleCount}
              ssulTitle={SSulTitle}
              isPrivate={e.isPrivate}
              alcohol={e.alcohol}
            />
          </div>
          <div></div>
        </div>
      </div>
    );
  });
  return (
    <div className="grid w-full min-w-[75rem] grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
      {cards}
    </div>
  );
}

