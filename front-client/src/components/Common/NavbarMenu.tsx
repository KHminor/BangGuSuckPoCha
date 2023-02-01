import axios from "axios";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeAlarmState, changeMenuFriendListApiDataState, changeMenuFriendState, changeMenuState } from "../../store/store";

function NavbarMenu(): JSX.Element {
  let dispatch = useAppDispatch();
  // username (현재는 내꺼)
  const username = `1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI`

  const menuIcon = useRef<any>(null);
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
    return state.menuFriendClickCheck
  })
    
  // console.log('친구 클릭 해따',menuFriendClickCheck);
  // 메뉴 클릭시 조건 분기
  useEffect(()=> {
    if ((checkMenuState)&&(alarmClickCheck)) {
      dispatch(changeAlarmState())
      menuIcon.current.classList.remove("hidden");
    } else if (checkMenuState) {
      menuIcon.current.classList.remove("hidden");
    } else if (!(checkMenuState)) {
      menuIcon.current.classList.add("hidden");
    }
  }, [checkMenuState])

  // 메뉴 -> 친구 클릭시 메뉴 버튼 사라지기
  useEffect(()=> {
    if (menuFriendClickCheck) {
      dispatch(changeMenuState())
      menuIcon.current.classList.remove("hidden");
    }
  },[menuFriendClickCheck])

  return (
    <div
      ref={menuIcon}
      className={`absolute rounded-full w-48 min-w-[12rem] h-16 min-h-[4rem] hidden`}
      style={{ right: "6rem", top: "11.1rem" }}
    >
      <img
        src={require("../../assets/logoIcon/menuBground.png")}
        className="bg-inherit h-full w-full"
        alt=""
      />
      <div
        className="flex justify-center items-center absolute   w-48 h-16"
        style={{ right: "-1%", top: "-9%" }}
      >
        <div className="ml-5 cursor-pointer" style={{ height: "52%" }}>
          <img
            src={require("../../assets/logoIcon/mypage.png")}
            alt=""
            className="bg-white bg-cover rounded-full"
            style={{ height: "90%", border: "solid 1px white" }}
          />
          <p className="text-stone-200 text-xs">My</p>
        </div>
        <div className="mx-5 cursor-pointer" style={{ height: "52%" }} onClick={()=> {
          axios({
            method: 'get',
            url:`https://i8e201.p.ssafy.io/api/user/friend/${username}`
          })
          .then((r)=> {            
            dispatch(changeMenuFriendState())
            dispatch(changeMenuFriendListApiDataState(r.data.data))
          })
          
        }}>
          <img
            src={require("../../assets/logoIcon/friend.png")}
            alt=""
            className="bg-white bg-cover rounded-full"
            style={{ height: "90%" }}
          />
          <p className="text-stone-200 text-xs">friend</p>
        </div>
        <div className="mr-5 cursor-pointer" style={{ height: "52%" }}>
          <img
            src={require("../../assets/logoIcon/logout.png")}
            alt=""
            className="bg-white bg-cover rounded-full"
            style={{ height: "90%" }}
          />
          <p className="text-stone-200 text-xs">logout</p>
        </div>
      </div>
    </div>
  );
}
export default NavbarMenu;
