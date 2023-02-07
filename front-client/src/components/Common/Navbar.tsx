import {
  changeAlarmApiDataState,
  changeAlarmClickState,
  changeAlarmState,
  changeMenuFriendChatState,
  changeMenuFriendState,
  changeMenuState,
} from "../../store/store";
import styles from "../Main/Main.module.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function Navbar(): JSX.Element {
  return (
    // <div className="h-[11rem] min-w-[75rem] sticky top-0 w-full" >
    <div className="h-[11rem] min-w-[75rem] fixed w-full">
      <div className="flex justify-center bg-black h-full">
        <div style={{ width: "34%" }}></div>
        <img
          src={require("src/assets/logo/Logo.png")}
          alt="logo"
          className=" object-contain w-[32%]"
        />
        <div className="" style={{ width: "16%" }}></div>
        <div className="grid grid-cols-1 " style={{ width: "18%" }}>
          <div></div>
          <div></div>
          <MenuOption />
        </div>
      </div>
    </div>
  );
}

// menu component
function MenuOption(): JSX.Element {
  let dispatch = useAppDispatch();
  const username = localStorage.getItem("Username");
  const menuFriendClickCheck = useAppSelector((state) => {
    return state.menuFriendClickCheck;
  });
  const menuFriendChatClickCheck = useAppSelector((state) => {
    return state.menuFriendChatClickCheck;
  });
  return (
    <div className="flex w-full">
      <div style={{ width: "20%" }}></div>
      <div className="flex justify-evenly" style={{ width: "70%" }}>
        <div className="flex justify-center items-end mb-2">
          <div className="cursor-pointer ">
            <img
              className="object-contain"
              style={{ width: "1.5rem", height: "1.5rem" }}
              src={require("src/assets/logoIcon/shop.png")}
              alt="shop"
            />
            <p
              className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}
            >
              상점
            </p>
          </div>
        </div>
        {/* 알림 */}
        <div className="flex justify-center items-end mb-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              axios({
                method: "get",
                url: `https://i8e201.p.ssafy.io/api/user/friend/request/${username}`,
              }).then((r) => {
                const checkFrom_id: number[] = [];
                const setData: (number | string)[] = [];
                const data: (number | string)[] = r.data.data;
                data.forEach((e: any) => {
                  if (checkFrom_id.includes(e.from_id) !== true) {
                    checkFrom_id.push(e.from_id);
                    setData.push(e);
                  }
                });
                dispatch(changeAlarmState());
                dispatch(changeAlarmClickState(0));
                dispatch(changeAlarmApiDataState(setData));
                if (menuFriendClickCheck) {
                  dispatch(changeMenuFriendState());
                }
                if (menuFriendChatClickCheck) {
                  dispatch(changeMenuFriendChatState(false));
                }
              });
            }}
          >
            <img
              className="object-contain"
              style={{ width: "1.5rem", height: "1.5rem" }}
              src={require("../../assets/logoIcon/alarm.png")}
              alt="alarm"
            />
            <p
              className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}
            >
              알림
            </p>
          </div>
        </div>
        {/* 메뉴 */}
        <div className="flex justify-center items-end mb-2 ">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (menuFriendClickCheck) {
                dispatch(changeMenuFriendState());
              }
              if (menuFriendChatClickCheck) {
                dispatch(changeMenuFriendChatState(false));
              }
              dispatch(changeMenuState());
            }}
          >
            <img
              className="object-contain"
              style={{ width: "1.5rem", height: "1.5rem" }}
              src={require("../../assets/logoIcon/menu.png")}
              alt="menu"
            />
            <p
              className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}
            >
              메뉴
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "20%" }}></div>
    </div>
  );
}

export default Navbar;
