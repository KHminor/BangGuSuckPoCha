import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";
import styles from "./Main.module.css";
import MainCreateRoom from "./MainCreateRoom";
import Tag from "./Tag";

function Main(): JSX.Element {
  // 방 생성 관련
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const menuIcon = useRef<any>(null);
  const alarmIcon = useRef<any>(null);
  // 방 생성 관련
  const createBtn = useRef<any>(null);

  const onClickCreateRoom = () => {
    createBtn.current.classList.toggle("hidden");
    setIsCreateRoom((prev) => !prev);
  };

  const checkMenuState: any = useSelector((state: any) => {
    return state.menuClickCheck;
  });
  const alarmClickCheck: any = useSelector((state: any) => {
    return state.alarmClickCheck;
  });

  // 알림, 메뉴 버튼 클릭 로직
  useEffect(() => {
    menuIcon.current.classList.toggle("hidden");
    alarmIcon.current.classList.add("hidden");
  }, [checkMenuState]);

  useEffect(() => {
    alarmIcon.current.classList.toggle("hidden");
    menuIcon.current.classList.add("hidden");
  }, [alarmClickCheck]);

  useEffect(() => {
    menuIcon.current.classList.add("hidden");
    alarmIcon.current.classList.add("hidden");
  }, []);

  return (
    <>
      {isCreateRoom ? (
        <MainCreateRoom onClickCreateRoom={onClickCreateRoom} />
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
          className="grid container mx-auto min-w-[75rem] "
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
            <Room />
          </div>
        </div>
        {/* 방 생성 버튼 */}

        <div
          ref={createBtn}
          onClick={onClickCreateRoom}
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
        <div
          ref={menuIcon}
          className={`absolute rounded-full w-48 min-w-[12rem] h-16 min-h-[4rem] hidden ${styles.neonDefault}`}
          style={{ right: "6.5rem", top: "11.7rem" }}
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
            <div className="mx-5 cursor-pointer" style={{ height: "52%" }}>
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
        {/* 알림 클릭시 보이기 */}
        <div
          ref={alarmIcon}
          className={`absolute w-56 bg-black rounded-3xl hidden ${styles.neonDefault}`}
          style={{ right: "5rem", top: "11.5rem", height: "22rem" }}
        >
          <div className={`grid grid-rows-12 w-56 `}>
            <div className="grid grid-cols-12 row-span-1 items-center">
              <div className="col-span-5"></div>
              <div className="col-span-2 opacity-50 text-white">알림</div>
              <div className="col-span-5"></div>
            </div>
            <div className="grid grid-cols-12 row-span-1 items-start">
              <div className="col-span-1"></div>
              <div className="col-span-3 text-xl text-white">요청</div>
              <div className="col-span-4"></div>
              <div className="col-span-3 text-xl opacity-50 text-white">
                리뷰
              </div>
              <div className="col-span-1"></div>
            </div>
            <div className="row-span-6 hideScroll" style={{ overflow: "auto" }}>
              <div
                className="my-2 cursor-pointer text-white"
                style={{ height: "20%" }}
                onClick={() => {}}
              >
                한상현 바보
              </div>
              <div
                className="my-2 cursor-pointer text-white"
                style={{ height: "20%" }}
              >
                한상현 바보
              </div>
              <div
                className="my-2 cursor-pointer text-white"
                style={{ height: "20%" }}
              >
                한상현 바보
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;

function Room(): JSX.Element {
  let [hoverCheck, setHoverCheck] = useState(false);
  let cards: JSX.Element[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
    (e, idx) => {
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
              className={`grid grid-rows-2 h-full min-h-[100%] w-full min-w-[100%] border-blue-300 ${styles.neon}`}
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
                      #20대 #경남 #포차 #주정뱅이
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
