import axios from "axios";
import { FaStar } from "react-icons/fa";
import styles from "./Waiting.module.css";
import { useState, useRef, useEffect } from "react";
import { changeAlarmApiDataState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [timer, setTimer] = useState<number>(0);

  const navigate = useNavigate();

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

  // 자기소개 추가
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

  // 자기소개 요소 삭제
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

  // 미팅 포차 대기방 나가기
  const exitWaitingRoom = () => {
    navigate("/main");
    window.location.reload();
  };

  useEffect(() => {
    getPochaInfo(true);

    socket.on("wait_update", () => {
      getPochaInfo(false);
    });
    socket.on("wait_end", (time: string) => {
      getPochaInfo(false);
      let goal = new Date(time);

      goal.setSeconds(goal.getSeconds() + 30);
      const waitTime = goal.getTime();
      const startTime = new Date().getTime();
      console.log("시간 비교!!!!!");
      console.log(waitTime);
      console.log(startTime);

      const diff = waitTime - startTime;
      setTimer(Math.floor(diff / 1000));
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

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    if (timer === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [timer]);

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
            <button className="w-200 text-center" onClick={exitWaitingRoom}>
              나가기
            </button>
            {timer > 0 ? <div>타이머 : {timer}</div> : <div></div>}
          </div>
        </>
      )}
    </>
  );
}
export default WaitingRoom;
