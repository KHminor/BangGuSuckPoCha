import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "src/store/hooks";
import FriendChat from "../Common/FriendChat";
import FriendList from "../Common/FriendList";
import Navbar from "../Common/Navbar";
import NavbarAlarm from "../Common/NavbarAlarm";
import NavbarMenu from "../Common/NavbarMenu";

const PointHistory = () => {
  const Username = localStorage.getItem("Username");
  const [History, setHistory] = useState();
  //  메뉴 -> 친구 클릭 -> 채팅 상태
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck;
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://i8e201.p.ssafy.io/api/user/point/${Username}`,
    }).then((r) => {
      console.log(r.data.data);
      setHistory(r.data.data);
    });
  }, []);

  return (
    <>
      {/* nav의 메뉴 => friend 클릭 시 친구 목록 보이기 */}
      <FriendList />
      {menuFriendChatClickCheck ? <FriendChat /> : null}
      {/* 메뉴 클릭시 보이기 */}
      <NavbarMenu />
      {/* 알림 클릭시 보이기 */}
      <NavbarAlarm />
      <div
        className="grid grid-rows-4 w-screen h-screen font-nanum text-white bg-neutral-800"
        style={{ gridTemplateRows: "11rem" }}
      >
        <Navbar />
        {History ? (
          <>
            <div className="h-full"></div>
            <div className="flex flex-col h-full ">
              <div className="flex flex-row h-[45%] ">
                <div className="w-[30%] border-b-2 "></div>
                <div className="w-[40%] pt-16 pl-12 pr-12 border-b-2">
                  <div className="flex flex-col w-[18rem] h-[7rem]">
                    <div className="h-[50%] text-justify text-4xl font-extrabold">
                      포인트
                    </div>
                    <div className="h-[50%] text-justify text-[20px]">
                      (이름)님 환영합니다.
                    </div>
                  </div>
                  <div className="h-[2rem] text-2xl ">현재 포인트</div>
                  <div className="h-[4rem] text-5xl font-extrabold text-sky-500 ">
                    10000p
                  </div>
                  <div className="h-[4rem] w-[13rem] text-base font-extrabold border-2">
                    포인트 내역
                  </div>
                </div>
                <div className="w-[30%] border-b-2"> </div>
              </div>
              <div className="flex flex-row h-[55%] ">
                <div className="w-[30%] "></div>
                <div className="w-[40%] ">가운데</div>
                <div className="w-[30%] "></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-[30%]">없음</div>
            <div className="h-[30%]">없음</div>
            <div className="h-[30%]">없음</div>
          </>
        )}
      </div>
    </>
  );
};

export default PointHistory;
