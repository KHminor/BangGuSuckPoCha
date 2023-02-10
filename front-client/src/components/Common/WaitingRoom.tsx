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
  const getPochaInfo = async () => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/${Number(pochaId)}`,
      });
      setPochaInfo(data.data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log("포차 정보 받아오기", error);
    }
  };

  useEffect(() => {
    getPochaInfo();
    socket.on("wait_update", () => {
      getPochaInfo();
    });
    socket.on("wait_end", (time: string) => {
      alert("참여 인원 모집 완료! 30초 후 이동합니다");
      getPochaInfo();
      let goal = new Date(time);

      goal.setSeconds(goal.getSeconds() + 5);
      const waitTime = goal.getTime();
      const startTime = new Date().getTime();

      setTimeout(waitEnd(), waitTime - startTime);
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
          </div>
        </>
      )}
      ;
    </>
  );
}
export default WaitingRoom;
