import styles from "./SonIntro.module.css";
import { useState, useRef, useEffect } from "react";
import PublicModal from "src/components/Common/PublicModal";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { showRouletteResultModal } from "src/store/store";
import SonMenual from "./SonMenual";

function SonIntro({
  socket,
  pochaId,
  pochaUsers,
}: {
  socket: any;
  pochaId: string;
  pochaUsers: any;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  // Public모달 데이터
  const [modalData, setModalData] = useState<any>(null);
  // 방 이름
  const roomName = pochaId;
  // 메뉴얼 클릭
  const [signal, setSignal] = useState<string>("intro");

  useEffect(() => {
    // 손병호 게임 시그널받기
    socket.on("game_son_signal", (signalData: string) => {
      console.log("시그널 sonIntro에서 받았냐?", signalData);
      setSignal(signalData);
    })
    return () => {
      socket.off("game_son_signal");
    };
  }, [])

  // 클릭하면 서버로 시그널 보냄
  const onClickSignal = (event: React.MouseEvent<HTMLInputElement>) => {
    const signalData = event.currentTarget.value;
    console.log(signalData)
    socket.emit("game_son_signal", signalData);
  }

  const onClickClose = () => {
    // 선택창으로 돌아가기
    socket.emit("game_back_select", roomName);
  };

  return (
    <>
      {signal === "menual" ? (
        <SonMenual socket={socket} pochaId={pochaId} pochaUsers={pochaUsers} />
      ) : null}
      {signal === "intro" ? (
        <div className={`${styles.layout3}`}>
          <div className={`${styles.box} ${styles.layout}`}>
            <img
              src={require("src/assets/game_son/강도1.png")}
              className={`${styles.img1}`}
              alt="son1"
            />
            <img
              src={require("src/assets/game_son/강도손.png")}
              className={`${styles.img2}`}
              alt="son2"
            />
            <div className={`${styles.box2} ${styles.layout2}`}>
              손병호 게임
            </div>
            <div className={`${styles.box3} ${styles.layout5}`}>
              손가락 접기
            </div>
            <div className={`${styles.layout4}`}>
              <input
                type="button"
                className={`${styles.retry}`}
                onClick={onClickClose}
                value="EXIT"
              />
              <input
                onClick={onClickSignal}
                type="button"
                className={`${styles.retry}`}
                value="menual"
              />
              <a href="./SonGame.html">
                <input
                  type="button"
                  className={`${styles.retry}`}
                  value="play"
                />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SonIntro;
