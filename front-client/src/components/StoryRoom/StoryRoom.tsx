import RoomFooterNav from "../Common/RoomFooterNav";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import WebRTC from "../WebRTC/WebRTC";
import axios from "axios";
import { io } from "socket.io-client";
import Loading from "../Common/Loading";

//  axios 요청

const api = axios.create({
  baseURL: "https://i8e201.p.ssafy.io/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

const socket = io("https://pocha.online");

function StoryRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  // const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 처음에 받아오는 포차 정보
  const [pochaInfo, setPochaInfo] = useState<any>(null);
  // 배경 div
  const bgDiv = useRef<HTMLDivElement>(null);
  // 테마 변경
  const [urlImg, setUrlImg] = useState<any>("bg-rain");
  // 방장 여부
  const [isHost, setIsHost] = useState<boolean>(false);

  // 내 아이디
  const myName = localStorage.getItem("Username");

  console.log("pochaInfo", pochaInfo);

  // const propSocket = (socket: any) => {
  //   setSocket(socket);
  // };
  const propIsHost = (isHost: boolean) => {
    setIsHost(isHost);
  };

  const getPochaInfo = async () => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/${Number(PochaId)}`,
      });
      setPochaInfo(data.data);
      console.log("테마", data.data.themeId);
      switch (data.data.themeId) {
        case "T0B0":
          setUrlImg("bg-rain");
          break;
        case "T0B1":
          setUrlImg(`bg-pocha`);
          break;
        case "T0B2":
          setUrlImg(`bg-hof`);
          break;
      }
      setIsLoading(false);
    } catch (error) {
      console.log("포차 정보 받아오기", error);
    }
  };

  useEffect(() => {
    getPochaInfo();
  }, []);

  useEffect(() => {
    return () => {
      api.put("/pocha/exit", {
        isHost: false,
        pochaId: PochaId,
        username: myName, // << 여기 내 유저네임 가져와야함
        waiting: false,
      });
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          ref={bgDiv}
          className={`w-screen min-h-screen ${urlImg} bg-contain bg-no-repeat bg-center bg-scroll`}
        >
          {/* 화면 및 게임 공간 */}
          <div className="min-h-[90vh]">
            <WebRTC
              pochaId={PochaId!}
              // propSocket={propSocket}
              socket={socket}
              propIsHost={propIsHost}
              getPochaInfo={getPochaInfo}
            />
          </div>
          <div className="relative bottom-0 left-0 right-0">
            {socket && (
              <RoomFooterNav
                pochaId={PochaId!}
                socket={socket}
                isHost={isHost}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default StoryRoom;
