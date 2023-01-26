import { useEffect, useState } from "react";
import styles from "./Login.module.css";

function Login(): React.ReactElement {
  const [isScroll, setIsScroll] = useState(false);

  let scrollY = 0;
  const moveToScroll = (event : any) => {
    console.log("moving");
    const currentScrollY = event.target.scrollTop;

    if (scrollY < currentScrollY) {
      event.target.scrollTo({top: 1000})
      scrollY = currentScrollY
    } else {
      event.target.scrollTo({top: 0});
      scrollY = currentScrollY;
    }
  }

  // useEffect(() => {
  //   console.log("moving");

  // },[isScroll])

  return (
    <div onScroll={moveToScroll} className={`${styles.bgImg} ${styles.fontHanSans} w-screen h-screen bg-scroll overflow-y-scroll`}>
      <div className="bg-black bg-opacity-50 w-full h-[120rem]">
        <div className="text-[10rem] leading-none text-white flex flex-col items-start justify-center ml-28 tracking-wide h-screen">
          <div>내 방에</div>
          <div>포장마차가</div>
          <div>생겼다?!</div>
          <div className="w-[33rem] h-3 bg-white mt-3"></div>
          <div className="text-4xl mt-5 font-mono font-bold tracking-tighter">Feat : 침대 밖은 위험해</div>
        </div>
        <div className="h-80"></div>
        <div className="flex flex-col items-center">
          <div className="text-[10rem] leading-none text-white ">방구석포차</div>
          <img className="w-2/12 mt-10" src={require("../../assets/loginIcon/naver.png")} />
        </div>
      </div>
    </div>
  );
}

export default Login;
