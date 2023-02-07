import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import PublicModal from "./PublicModal";

function RoomFooterNav({ pochaId }: { pochaId: string }): JSX.Element {
  const socket = io("https://pocha.online");
  const navigate = useNavigate();
  // 룸 이름
  const roomName = pochaId;
  // 나가기 관련
  const modalData = {
    type: "exit",
    msg: "방에서 나가시겠습니까?",
  };

  // 현재 시간 관련
  const [currentDate, setCurrentDate] = useState();
  setInterval(() => {
    const date = new Date();
    // console.log(date.toLocaleTimeString('ko-kr').slice(0,7));
    let hour = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    setCurrentDate((hour + ":" + minutes) as any);
  }, 1000);

  //  axios 요청
  const api = axios.create({
    baseURL: "https://i8e201.p.ssafy.io/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  // ----- 소켓 관련 썰 변경 이벤트 ------
  function handleSsulClick() {
    let input = prompt("Ssul을 입력하세요!", "새로운 타이틀!");
    if (input == null) return;

    // 썰 변경.
    socket.emit("ssul_change", roomName, input);
  }
  // 포차 설정 변경 이벤트
  async function handlePochaUpdate() {
    // 설정값 입력.
    let pocha_config = {};

    // axios를 통해 포차 설정 변경. (await 사용해야할 듯?)

    socket.emit("pocha_change", roomName);
  }
  // 포차 시간 추가 이벤트
  async function handlePochaExtension() {
    // axios를 통해 포차 시간 연장. (await 사용해야할 듯?)
    try {
      await api.put("/pocha/extension/3");
      socket.emit("pocha_extension", roomName);
    } catch (error) {
      console.log("시간추가 error", error);
    }
  }
  // 포차 짠!! 이벤트
  async function handlePochaCheers() {
    // axios를 통해 포차 짠 실행.
    try {
      await api.put("/pocha/alcohol/3");
      socket.emit("pocha_cheers", roomName);
    } catch (error) {
      console.log("짠 error", error);
    }
  }

  // 포차 나가기 이벤트
  async function handlePochaExit() {
    try {
      await api.put("/pocha/exit", {
        isHost: false,
        pochaId: 3,
        username: "1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI",
        waiting: false,
      });
      navigate(`/main`);
    } catch (error) {
      console.log("포차나가기 error", error);
    }
  }

  return (
    <>
      <PublicModal data={modalData} />
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.8fr 1fr" }}>
        <div></div>
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: "0.6fr 8fr 0.6fr" }}
        >
          <div></div>
          <div className="grid" style={{ gridTemplateRows: "0.2fr 0.8fr" }}>
            <div></div>
            <div
              className="grid  text-white p-2"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                border: "solid 2px white",
                borderBottom: "solid 0px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div className="flex justify-center items-center text-[2rem] ">
                {currentDate}
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  onClick={handlePochaExtension}
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/time.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">시간추가</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  onClick={handlePochaCheers}
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/cheers.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">짠</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/add-user.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">친구초대</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  onClick={handleSsulClick}
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/communication.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">썰</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/exclamation-mark.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">포차정보</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img
                  onClick={handlePochaExit}
                  className="h-[2.2rem] py-auto transition-all duration-300 hover:scale-110"
                  src={require("src/assets/roomIcon/cancel.png")}
                  alt=""
                />
                <span className="text-[0.8rem] mt-1">나가기</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </>
  );
}
export default RoomFooterNav;
