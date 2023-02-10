import styles from "./Ladder.module.css";

function Ladder({
  socket,
  pochaId,
  pochaUsers,
}: {
  socket: any;
  pochaId: string;
  pochaUsers: any;
}): React.ReactElement {
  const usersLength = pochaUsers.length;
  

  const onClickClose = () => {
    console.log("클릭!!");
  };

  return (
    <div className={`${styles.layout3}`}>
      <div className={`${styles.titlespan}`}>사다리타기</div>
      <div className={`${styles.ladderForm} ${styles.layout}`}>
        <div className={`${styles.box} ${styles.layout2}`}>
          {/* 사다리 테이블 */}
          <div id="ladderDiv" className={`${styles.ladderDiv}`}></div>
        </div>
        <div className={`${styles.layout3}`}>
          <input
            type="button"
            className={`${styles.retry}`}
            onClick={onClickClose}
            value="RETRY"
          />
          <input
            type="button"
            className={`${styles.retry}`}
            onClick={onClickClose}
            value="EXIT"
          />
        </div>
      </div>
    </div>
  );
}

export default Ladder;
