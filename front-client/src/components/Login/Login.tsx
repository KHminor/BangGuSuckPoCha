import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";

function Login(): React.ReactElement {
  // const [scrollTop, setScrollY] = useState(0);
  // const [deltaY, setDeltaValue] = useState(0);
  // 아래 처럼 하면 되는데.. 중간에 오류저거 못고치겠어서 우선 any
  // const scrollDivRef = useRef<HTMLDivElement>(null);

  // DOM들 접근
  const scrollDivRef = useRef<any>(null);
  const firstDiv = useRef<any>(null);
  const secondDiv = useRef<any>(null);
  const wordFirst = useRef<any>(null);
  const wordSecond = useRef<any>(null);
  const wordThird = useRef<any>(null);
  const wordFourth = useRef<any>(null);
  const wordFifth = useRef<any>(null);


  // 마우스 윌 이벤트 발생시
  const onWheelScroll = (event: any) => {
    // event.preventDefault();
    const { deltaY } = event;
    // const { scrollTop } = scrollDivRef.current;
    // const pageHeight = window.innerHeight;

    // 마우스 아래와 위일때 조건
    if (deltaY > 0) {
      // console.log("123", deltaY, scrollTop, pageHeight);
      secondDiv.current.scrollIntoView({ behavior: "smooth" });
    } else if (deltaY < 0) {
      // console.log("456", deltaY, scrollTop, pageHeight);
      firstDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const elements = [secondDiv, wordFirst, wordSecond, wordThird, wordFourth, wordFifth];
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(`${styles.trans}`, entry.isIntersecting);
        // entry.target.classList.toggle(`delay-1000`, entry.isIntersecting);
      });
    }, {threshold: 0.5});
  
    elements.forEach((element) => {
      observer.observe(element.current);
    })
  }, [])

  return (
    <div
      ref={scrollDivRef}
      onWheel={onWheelScroll}
      className={`${styles.bgImg} ${styles.fontHanSans} w-screen h-screen bg-scroll overflow-y-hidden`}
    >
      <div className="bg-black bg-opacity-50 w-full">
        <div
          ref={firstDiv}
          className="text-[10rem] leading-none text-white flex flex-col items-start justify-center ml-28 tracking-wide h-screen"
        >
          <div className="transition opacity-0 duration-1000 delay-100" ref={wordFirst}>내 방에</div>
          <div className="transition opacity-0 duration-1000 delay-500" ref={wordSecond}>포장마차가</div>
          <div className="transition opacity-0 duration-1000 delay-1000" ref={wordThird}>생겼다?!</div>
          <div className="transition opacity-0 duration-1000 delay-[1500ms] w-[33rem] h-3 bg-white mt-3" ref={wordFourth} ></div>
          <div className="transition opacity-0 duration-1000 delay-[1500ms] text-4xl mt-5 font-mono font-bold tracking-tighter" ref={wordFifth}>
            Feat : 침대 밖은 위험해
          </div>
        </div>
        <div
          ref={secondDiv}
          className="flex flex-col items-center justify-center h-screen transition opacity-0 duration-1000 delay-300 -translate-x-40"
        >
          <div className={`${styles.neonTitle} text-[10rem] leading-none text-white`}>
            방구석포차
          </div>
          <img
            className="w-2/12 mt-10"
            src={require("../../assets/loginIcon/naver.png")}
            alt="login-naver"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
