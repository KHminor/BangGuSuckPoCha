import styles from "./GameSelect.module.css";
import { useState, useRef, useEffect } from "react";
import PublicModal from "src/components/Common/PublicModal";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { showRouletteResultModal } from "src/store/store";

function GameSelect({
  socket,
  pochaId,
}: {
  socket: any;
  pochaId: string;
}): React.ReactElement {
  const roomName = pochaId;
  // 이미지들 잡자
  const balance = useRef<HTMLImageElement>(null);
  const ladder = useRef<HTMLImageElement>(null);
  const son = useRef<HTMLImageElement>(null);
  const yang = useRef<HTMLImageElement>(null);
  const liar = useRef<HTMLImageElement>(null);
  const roul = useRef<HTMLImageElement>(null);
  // 이미지들 리스트
  const [imgLists, setImgLists] = useState<any[]>([balance, ladder, son, yang, liar, roul]);

  const hoverBtn = (elementId: string) => {
    console.log("여긴오나?ㅋㅋ");
    console.log(imgLists);
    imgLists.forEach((img) => {
      if (img.current!.id === elementId) {
        img.current!.classList.toggle(`${styles.gameBox}`);
      }
    });
  };

  const goWebRTC = (event: React.MouseEvent<HTMLImageElement>) => {
    const elementId = event.currentTarget.id;
    socket.emit("game_select", roomName, elementId);
  };

  useEffect(() => {
    setImgLists([balance, ladder, son, yang, liar, roul]);
    
    socket.on("game_select", (elementId: string) => {
      console.log("오냐?")
      hoverBtn(elementId);
    });
    return () => {
      socket.off("game_select");
    };
  }, []);

  return (
    <div className=" w-full h-full bg-zinc-900">
      <div
        className={`text-5xl font-bold h-[10%] flex justify-center items-end ${styles.neonTitle}`}
      >
        방구석 게임센터
      </div>
      <div className="flex flex-col h-[90%] justify-evenly">
        <div className="flex justify-evenly">
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-500 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/bal.png")}
            alt="bal"
            id="bal"
            ref={balance}
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/son.png")}
            alt="son"
            id="son"
            ref={son}
          />
        </div>
        <div className="flex justify-evenly">
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/ladder.png")}
            alt="ladder"
            id="ladder"
            ref={ladder}
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/yang.png")}
            alt="yang"
            id="yang"
            ref={yang}
          />
        </div>
        <div className="flex justify-evenly">
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/liar.png")}
            alt="liar"
            id="liar"
            ref={liar}
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/roul.png")}
            alt="roul"
            id="roul"
            ref={roul}
          />
        </div>
      </div>
    </div>
  );
}

export default GameSelect;
