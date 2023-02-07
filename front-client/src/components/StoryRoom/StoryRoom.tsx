import RoomFooterNav from "../Common/RoomFooterNav";
import styles from "./StoryRoom.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebRTC from "../WebRTC/WebRTC";

function StoryRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  const [ socket, setSocket ] = useState(null);

  const propSocket = (socket : any) => {
    setSocket(socket);
  }


  return (
    <div className={`w-screen min-h-screen ${styles.gameroomimg} bg-scroll`}>
      {/* 화면 및 게임 공간 */}
      <div className="h-[90%]">
        <WebRTC pochaId={PochaId!} propSocket={propSocket}/>
      </div>
      <div className="fixed -bottom-2 left-0 right-0">
        {socket && <RoomFooterNav pochaId={PochaId!} socket={socket} />}
      </div>
    </div>
  );
}
export default StoryRoom;
