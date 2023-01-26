import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";
import styles from "./Main.module.css";
import MainCreateRoom from "./MainCreateRoom";
import Tag from "./Tag";

function Main(): JSX.Element {
  const [isCreateRoom, setIsCreateRoom] = useState(false);

  const checkMenuState: any = useSelector((state: any) => {
    return state.menuClickCheck;
  });
  const alarmClickCheck: any = useSelector((state: any) => {
    return state.alarmClickCheck;
  });

  if (checkMenuState === true) {
    document.getElementById("menu")?.classList.remove("hidden");
  } else {
    document.getElementById("menu")?.classList.add("hidden");
  }

  if (alarmClickCheck === true) {
    document.getElementById("alarm")?.classList.remove("hidden");
  } else {
    document.getElementById("alarm")?.classList.add("hidden");
  }
  return (
    <div
      className={`grid screen min-w-[75rem] h-screen ${styles.hideScroll}`}
      style={{
        backgroundColor: "rgb(25, 25, 25)",
        gridTemplateRows: "11rem 1fr",
        overflow: "auto",
      }}
    >
      <Navbar />

      <div
        className="grid container mx-auto min-w-[75rem]  bg-green-800"
        style={{ gridTemplateRows: "8rem 1fr" }}
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
    </div>
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
