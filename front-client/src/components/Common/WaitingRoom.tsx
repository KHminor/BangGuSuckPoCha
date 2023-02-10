import axios from "axios";
import { FaStar } from "react-icons/fa";
import styles from "./Waiting.module.css";
import { useState, useRef, useEffect } from "react";
import { changeAlarmApiDataState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";

function WaitingRoom({
  pochaId,
  socket,
  waitEnd,
}: {
  pochaId: string;
  socket: any;
  waitEnd: Function;
}): JSX.Element {
  // 처음에 받아오는 포차 정보
  const [pochaInfo, setPochaInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [introduce, setIntroduce] = useState<string>("");

  const ChangeIntroduce = (event: any) => {
    console.log(event.target.value);
    setIntroduce(event.target.value);
  };

  const getPochaInfo = async (flag : boolean) => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/${Number(pochaId)}`,
      });
      setPochaInfo(data.data);
      
      if(flag){
        setIsLoading(false);
        socket.emit('wait', { roomName: pochaId, limit: data.data.limitUser });
      }
      console.log(data);
    } catch (error) {
      console.log("포차 정보 받아오기", error);
    }
  };

  const setMyIntroduce = async () => {
    if (introduce === "" || introduce == null || introduce == undefined) return;
    let myIntroduce = [];
    let localIntroduce = localStorage.getItem("MyIntroduce");
    if (localIntroduce != null && localIntroduce != undefined) {
      myIntroduce = JSON.parse(localIntroduce);
    }

    myIntroduce.push(introduce);
    localStorage.setItem("MyIntroduce", JSON.stringify(myIntroduce));

    setIntroduce("");
  }

  useEffect(() => {
    getPochaInfo(true);

    socket.on("wait_update", () => {
      getPochaInfo(false);
    });
    socket.on("wait_end", (time: string) => {
      alert("참여 인원 모집 완료! 30초 후 이동합니다");
      getPochaInfo(false);
      let goal = new Date(time);

      goal.setSeconds(goal.getSeconds() + 30);
      const waitTime = goal.getTime();
      const startTime = new Date().getTime();
      console.log("시간 비교!!!!!");
      console.log(waitTime);
      console.log(startTime);

      const diff = waitTime - startTime;

      setTimeout(waitEnd, diff);
    });

    // ------------ 연결 해제 --------------
    return () => {
      socket.off("wait_update");
      socket.off("wait_end");
    };
    ////////////////////////////////////////////
  }, []);

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="text-white">
            <h2>헌팅 포차 대기방!!!!!!!!</h2>
            <h3>
              {pochaInfo.totalCount} / {pochaInfo.limitUser}
            </h3>
            <div className="text-center pl-5 text-3xl ">Introduce :</div>
            <input
              type="text"
              className="col-span-4 bg-black border-2 caret-white"
              placeholder="소개할 정보를 입력하세요"
              value={introduce}
              onChange={ChangeIntroduce}
              />
            <div
              className="right-7 w-[100%] border-white border-2 text-white cursor-pointer"
              onClick={setMyIntroduce}
            >
              입력
            </div>
            <div>
              {localStorage.getItem("MyIntroduce")}  
            </div>
          </div>
        </>
      )}
      ;
    </>
  );
}
export default WaitingRoom;
