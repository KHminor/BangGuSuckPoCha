import RoomHuntingFooterNav from "../Common/RoomHuntingFooterNav";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isRtcLoading, showRoomUserProfile } from "../../store/store";
import RoomUserProfile from "../Common/RoomUserProfile";
import Loading from "../Common/Loading";
import styles from "./HuntingRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import HuntingWebRTC from "../WebRTC/HuntingWebRTC";
import WaitingRoom from "../Common/WaitingRoom";

const socket = io("https://pocha.online");

function HuntingRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  // const [socket, setSocket] = useState<any>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  //const test = io("https://pocha.online")
  // const socket = io("https://pocha.online");
  // const setSocketInfo = () => {
  //   setSocket("https://pocha.online");
  // };
  // const propSocket = (socket: any) => {
  //   setSocket(socket);
  // };

  // setInterval(() => {
  //   setTestNumber(testNumber + 1);
  // }, 1000);

  const waitEnd = () => {
    setIsWaiting(false);
  };

  useEffect(() => {
    // setSocketInfo();
  }, []);

  return (
    <>
      {socket == null ? (
        <div></div>
      ) : isWaiting ? (
        <WaitingRoom pochaId={PochaId!} socket={socket} waitEnd={waitEnd} />
      ) : (
        <div
          className={`w-screen min-h-screen ${styles.gameroomimg} bg-scroll`}
        >
          {/* 화면 및 게임 공간 */}
          <div className="h-[90%]">
            <HuntingWebRTC pochaId={PochaId!} socket={socket} />
          </div>
          <div className="fixed -bottom-2 left-0 right-0">
            {socket && (
              <RoomHuntingFooterNav pochaId={PochaId!} socket={socket} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default HuntingRoom;
