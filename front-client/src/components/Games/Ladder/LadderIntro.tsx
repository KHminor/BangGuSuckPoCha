import styles from "./Ladder.module.css"

function LadderIntro({socket} : {socket: any}): React.ReactElement {
  const onClickClose = () => {
    console.log("클릭!!")
  } 

  return (
    <div className={`${styles.layout3}`}>
    <div className={`${styles.box} ${styles.layout}`}>
      <img src={require("src/assets/game_ladder/intro1.png")} className={`${styles.img1}`} alt="intro1" />
      <img src={require("src/assets/game_ladder/intro2.png")} className={`${styles.img2}`} alt="intro2"/>
      <img src={require("src/assets/game_ladder/ladderimg.png")} className={`${styles.ladderimg}`} alt="ladderimg"/>
      <div className ={`${styles.box2} ${styles.layout2}`}>사다리타기</div>
      <div className={`${styles.layout4}`}>
        <input type="button" className={`${styles.retry}`} onClick={onClickClose} value="EXIT" />
        <input type="button" className={`${styles.retry}`} onClick={onClickClose} value="PLAY" />
      </div>
    </div>
  </div>
  );
}

export default LadderIntro;
