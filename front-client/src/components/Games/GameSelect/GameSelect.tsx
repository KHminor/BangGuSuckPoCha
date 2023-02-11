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
  const hoverBtn = (event: React.MouseEvent<HTMLImageElement>) => {
    event.currentTarget.classList.toggle(`${styles.gameBox}`);
  };

  const goWebRTC = (event: React.MouseEvent<HTMLImageElement>) => {
    socket.emit("game_select", event);
  }

  useEffect(() => {
    socket.on("game_select", (event: React.MouseEvent<HTMLImageElement>) => {
      hoverBtn(event);
    })
  }, [])

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
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/ladder.png")}
            alt="ladder"
          />
        </div>
        <div className="flex justify-evenly">
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/son.png")}
            alt="son"
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/yang.png")}
            alt="bal"
          />
        </div>
        <div className="flex justify-evenly">
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/liar.png")}
            alt="liar"
          />
          <img
            onMouseOver={goWebRTC}
            onMouseLeave={goWebRTC}
            className={`transition-all duration-300 rounded-lg cursor-pointer`}
            src={require("src/assets/game_select/roul.png")}
            alt="roul"
          />
        </div>
      </div>
    </div>
  );
}

export default GameSelect;
