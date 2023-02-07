import RoomFooterNav from "../Common/RoomFooterNav";
import styles from "./GameRoom.module.css";

function GameRoom(): JSX.Element {
  return (
    <div
      className={`w-screen h-screen grid ${styles.gameroomimg}`}
      style={{ gridTemplateRows: "0.07fr 1fr 0.12fr" }}
    >
      {/* 빈 공간 */}
      <div></div>
      {/* 화면 및 게임 공간 */}
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.8fr 1fr" }}>
        {/* 남자 공간 */}
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            1
          </div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            2
          </div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            3
          </div>
        </div>
        {/* 게임 공간 */}
        <div
          className="grid"
          style={{ gridTemplateColumns: "0.02fr 0.98fr 0.02fr" }}
        >
          <div>1</div>
          <div className="flex justify-center items-center border-2 border-blue-400 rounded-[20px]">
            2
          </div>
          <div>3</div>
        </div>
        {/* 여자 공간 */}
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            1
          </div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            2
          </div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">
            3
          </div>
        </div>
      </div>
      {/* footerNav */}
      {/* <RoomFooterNav pochaId={pochaId!}/> */}
    </div>
  );
}
export default GameRoom;
