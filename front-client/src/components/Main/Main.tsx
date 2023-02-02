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
import styles from "./Main.module.css";
import MainCreateRoom from "./MainCreateRoom";
import MainCreateRoomCarousel from "./MainCreateRoomCarousel";
import Tag from "./Tag";

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const mainCreateRoomList:any = useAppSelector((state)=> {return state.mainCreateRoomList})
  // 메인에 들어올 시 현재 생성된 방 리스트 state 갱신
  useEffect(()=> {
    axios({
      method: 'get',
      url: 'https://i8e201.p.ssafy.io/api/admin/pocha'
    })
    .then((r)=> {
      dispatch(changeMainCreateRoomList(r.data.data))
    })
  },[])

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
  //  메뉴 -> 친구 클릭 상태
  const menuFriendClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendClickCheck;
  });
  //  메뉴 -> 친구 클릭 상태
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck;
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
      <FriendList/>
      {/* nav의 메뉴 -> friend 클릭 시 채팅 보이기 : 지금은 우선 띄우는 거만 해놓음 코드 수정해야함
          같은 유저 클릭 시 채팅 닫고 이런식으로?
      */}
      {/* {menuFriendChatClickCheck ? <FriendChat /> : null} */}
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
          className="grid container mx-auto min-w-[75rem]"
          style={{
            gridTemplateRows: "8rem 1fr 3rem",
            backgroundColor: "rgb(25, 25, 25)",
          }}
        >
          {/* 태그 */}
          <Tag />
          {/* 방 보이기 */}
          <div
            className="grid grid-cols-1 w-full min-w-[75rem] "
            style={{ backgroundColor: "rgb(25, 25, 25)" }}
          >
            <Room  mainCreateRoomList={mainCreateRoomList}/>
          </div>
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

function Room({mainCreateRoomList}:any): JSX.Element {
  let [hoverCheck, setHoverCheck] = useState(false);
  // console.log('방 목록: ',mainCreateRoomList);
  
  let cards: JSX.Element[] = mainCreateRoomList.map((e:any, idx:any) => {
    // 태그 정렬하기
    const TagList = e.tagList.map((tag:any)=> {
      return `#${tag} `
    })
      return (
        <div className="w-full h-[30rem] min-h-[30rem] min-w-[100%] max-w-[100%] my-8">
          <div
            className="grid grid-cols-2 h-full rounded-2xl w-full min-w-[100%]"
            style={{ gridTemplateColumns: "2.5rem 1fr 2.5rem" }}
          >
            <div
              className=""
              style={{ backgroundColor: "rgb(25, 25, 25)" }}
            ></div>
            {/* 카드 내부 */}
            <div
              className={`grid grid-rows-2 h-full min-h-[100%] w-full min-w-[100%]  ${styles.neon}`}
              style={{ gridTemplateRows: "7fr 3fr" }}
            >
              <div className="h-full min-h-[100%] w-full min-w-[100%] ">
                <img
                  src="https://images.pexels.com/photos/5220092/pexels-photo-5220092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  className="h-full min-h-[100%] w-full min-w-[] object-cover"
                />
              </div>
              <div
                className={`grid grid-rows-3 h-full min-h-[100%] w-full min-w-[100%] bg-black text-white ${styles.radiusbottom}`}
              >
                <div className="w-full min-w-[100%] max-w-[100%] grid grid-cols-12 items-center overflow-hidden ">
                  <div className="col-span-1 "></div>
                  <div
                    className="w-full h-full col-span-4 rounded-full flex justify-center items-center text-base font-medium"
                    style={{
                      backgroundColor: "rgb(227, 114, 0)",
                      height: "60%",
                    }}
                  >
                    Talk
                  </div>
                  <div className="col-span-7 "></div>
                </div>
                <div className="w-full min-w-[100%] max-w-[100%] grid grid-rows-1 items-center overflow-hidden">
                  <div className="w-full min-w-[100%] max-w-[100%] grid grid-cols-12 items-center overflow-hidden ">
                    <div className="col-span-1 "></div>
                    <div className="w-full h-full col-span-11 flex justify-start items-center text-base font-medium">
                      즐겁게 웃으며 한잔😛
                    </div>
                  </div>
                </div>
                <div className="w-full min-w-[100%] max-w-[100%] grid grid-rows-1 items-center overflow-hidden">
                  <div className="w-full min-w-[100%] max-w-[100%] grid grid-cols-12 items-center overflow-hidden ">
                    <div className="col-span-1 "></div>
                    <div className="w-full h-full col-span-11 flex justify-start items-center text-base font-medium">
                      {
                        TagList
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              style={{ backgroundColor: "rgb(25, 25, 25)" }}
            ></div>
          </div>
        </div>
      );
    }
  );
  return (
    <div className="grid w-full min-w-[75rem] grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 ">
      {cards}
    </div>
  );
}
