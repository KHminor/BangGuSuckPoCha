import RoomHuntingFooterNav from "../Common/RoomHuntingFooterNav";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isRtcLoading, showRoomUserProfile } from "../../store/store";
import RoomUserProfile from "../Common/RoomUserProfile";
import Loading from "../Common/Loading";
import styles from "./HuntingRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HuntingWebRTC from "../WebRTC/HuntingWebRTC";

function HuntingRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  const [ socket, setSocket ] = useState(null);

  const propSocket = (socket : any) => {
    setSocket(socket);
  }

  useEffect(() => {
    // getUsersProfile();
  }, []);

  return (
    <div className={`w-screen min-h-screen ${styles.gameroomimg} bg-scroll`}>
      {/* 화면 및 게임 공간 */}
      <div className="h-[90%]">
        <HuntingWebRTC pochaId={PochaId!} propSocket={propSocket}/>
      </div>
      <div className="fixed -bottom-2 left-0 right-0">
        {socket && <RoomHuntingFooterNav pochaId={PochaId!} socket={socket} />}
      </div>
    </div>
  );
}
export default HuntingRoom;
