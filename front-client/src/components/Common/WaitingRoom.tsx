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
  myInfo,
}: {
  pochaId: string;
  socket: any;
  waitEnd: Function;
  myInfo: any;
}): JSX.Element {
  // 처음에 받아오는 포차 정보
  const [pochaInfo, setPochaInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [introduce, setIntroduce] = useState<string>("");
  const [myIntroduce, setMyIntroduce] = useState<Array<string>>([]);

  const ChangeIntroduce = (event: any) => {
    setIntroduce(event.target.value);
  };

  const getPochaInfo = async (flag: boolean) => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/${Number(pochaId)}`,
      });
      setPochaInfo(data.data);

      if (flag) {
        setIsLoading(false);
        socket.emit("wait", {
          roomName: pochaId,
          username: myInfo.username,
          nickname: myInfo.nickname,
          limit: data.data.limitUser,
        });
      }
      console.log(data);
    } catch (error) {
      console.log("포차 정보 받아오기", error);
    }
  };

  const addMyIntroduce = async () => {
    if (introduce === "" || introduce == null || introduce === undefined)
      return;

    let flag = true;
    for (const entity of myIntroduce) {
      if (entity === introduce) {
        flag = false;
        break;
      }
    }

    if (flag && myIntroduce.length < 5) {
      setMyIntroduce([...myIntroduce, introduce]);
    }

    setIntroduce("");
  };

  const deleteMyIntroduce = async (event: any) => {
    const deleteIntorduce = event.target.innerText.substring(
      1,
      event.target.innerText.length - 1
    );
    const changeIntroduce = myIntroduce.filter(
      (entity) => entity !== deleteIntorduce
    );
    setMyIntroduce(changeIntroduce);
  };

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

  useEffect(() => {
    localStorage.setItem("myIntroduce", JSON.stringify(myIntroduce));
  }, [myIntroduce]);

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="text-white">
            <div className="text-center text-4xl ">미팅 포차 대기방</div>
            <div className="text-center text-2xl ">
              {pochaInfo.totalCount} / {pochaInfo.limitUser}
            </div>
            <div className="text-center text-2xl ">자기소개</div>
            <input
              type="text"
              className="w-[30%] text-center bg-black border-2 caret-white"
              placeholder="소개할 정보를 입력하세요"
              value={introduce}
              onChange={ChangeIntroduce}
            />
            <button
              className="text-center w-20 border-white border-2 cursor-pointer"
              onClick={addMyIntroduce}
            >
              입력
            </button>
            <div>
              {myIntroduce.map((input, index) => (
                <div
                  key={index}
                  onClick={deleteMyIntroduce}
                >{`[${input}]`}</div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default WaitingRoom;
