import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isRtcLoading, showRoomUserProfile } from "../../store/store";
import RoomUserProfile from "../Common/RoomUserProfile";
import Loading from "../Common/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./GameRoom.module.css";
import RoomGameFooterNav from "../Common/RoomGameFooterNav";
import GameWebRTC from "../WebRTC/GameWebRTC";

function GameRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  const [socket, setSocket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 처음에 받아오는 포차 정보
  const [pochaInfo, setPochaInfo] = useState<any>(null);

  const propSocket = (socket: any) => {
    setSocket(socket);
  };
  
  console.log("pochaInfo", pochaInfo);

  const getPochaInfo = async () => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/${Number(PochaId)}`,
      });
      setPochaInfo(data.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log("포차 정보 받아오기", error);
    }
  };

  useEffect(() => {
    getPochaInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className={`w-screen min-h-screen ${styles.gameroomimg} bg-cover bg-no-repeat bg-center bg-scroll`}
        >
          {/* 화면 및 게임 공간 */}
          <div className="min-h-[90vh]">
            <GameWebRTC
              pochaId={PochaId!}
              propSocket={propSocket}
              getPochaInfo={getPochaInfo}
            />
          </div>
          <div className="relative bottom-0 left-0 right-0">
            {socket && <RoomGameFooterNav pochaId={PochaId!} socket={socket} />}
          </div>
        </div>
      )}
    </>
  );
}
export default GameRoom;
