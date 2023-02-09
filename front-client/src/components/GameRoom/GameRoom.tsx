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
// function GameRoom(): JSX.Element {
//   return (
//     <div
//       className={`w-screen h-screen grid ${styles.gameroomimg}`}
//       style={{ gridTemplateRows: "0.07fr 1fr 0.12fr" }}
//     >
//       {/* 빈 공간 */}
//       <div></div>
//       {/* 화면 및 게임 공간 */}
//       <div className="grid" style={{ gridTemplateColumns: "1fr 1.8fr 1fr" }}>
//         {/* 남자 공간 */}
//         <div className="flex flex-col justify-between items-center">
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             1
//           </div>
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             2
//           </div>
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             3
//           </div>
//         </div>
//         {/* 게임 공간 */}
//         <div
//           className="grid"
//           style={{ gridTemplateColumns: "0.02fr 0.98fr 0.02fr" }}
//         >
//           <div>1</div>
//           <div className="flex justify-center items-center border-2 border-blue-400 rounded-[20px]">
//             2
//           </div>
//           <div>3</div>
//         </div>
//         {/* 여자 공간 */}
//         <div className="flex flex-col justify-between items-center">
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             1
//           </div>
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             2
//           </div>
//           <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
//             3
//           </div>
//         </div>
//       </div>
//       {/* footerNav */}
//       {/* <RoomFooterNav pochaId={pochaId!}/> */}
//     </div>
//   );
// }
// export default GameRoom;
function GameRoom(): JSX.Element {
  // const dispatch = useAppDispatch();
  const { PochaId } = useParams();
  const [socket, setSocket] = useState(null);

  const propSocket = (socket: any) => {
    setSocket(socket);
  };

  useEffect(() => {
    // getUsersProfile();
  }, []);

  return (
    <div className={`w-screen min-h-screen ${styles.gameroomimg} bg-scroll`}>
      {/* 화면 및 게임 공간 */}
      <div className="h-[90%]">
        <GameWebRTC pochaId={PochaId!} propSocket={propSocket} />
      </div>
      <div className="fixed -bottom-2 left-0 right-0">
        {socket && <RoomGameFooterNav pochaId={PochaId!} socket={socket} />}
      </div>
    </div>
  );
}
export default GameRoom;
