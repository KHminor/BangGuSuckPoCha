import RoomFooterNav from "../Common/RoomFooterNav";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isRtcLoading, showRoomUserProfile } from "../../store/store";
import RoomUserProfile from "../Common/RoomUserProfile";
import Loading from "../Common/Loading";
import styles from "./StoryRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import WebRTC from "../WebRTC/WebRTC";

function StoryRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();

  // const username = "DnXrE8Ea860Euv_LONqQyz4pnK86XrDd0YinVdBAaeA";



  useEffect(() => {
    // getUsersProfile();
  }, []);

  return (
    <div className={`w-screen min-h-screen ${styles.gameroomimg} bg-scroll`}>
      {/* 화면 및 게임 공간 */}
      <div className="h-[90%]">
        <WebRTC pochaId={PochaId!} />
      </div>
      <div className="relative bottom-0 left-0 right-0">
        <RoomFooterNav pochaId={PochaId!} />
      </div>
    </div>
  );
}
export default StoryRoom;
