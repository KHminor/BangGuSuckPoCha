import styles from "./Main.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";
import { useAppDispatch } from "../../store/hooks";
import { changeCarouselState, changeThemeRoomState } from "../../store/store";
import { useRef } from "react";



function MainCreateRoomCarousel({onClickHiddenBtn} : {onClickHiddenBtn: any}) {
  let dispatch = useAppDispatch();
  const bgDiv = useRef<any>();

  // 캐러셀 모달 끄는거
  function CloseCarouselModal(event : any ) {
    if(event.target === bgDiv.current) {
      console.log("cliiick")
      dispatch(changeCarouselState())
      onClickHiddenBtn();
    } else {
      console.log("여기아님");
    }
    
  }

  return (
    <div
      ref={bgDiv}
      onMouseDown={CloseCarouselModal}
      className="bg-black bg-opacity-90 absolute h-screen w-screen grid z-10"
      style={{ gridTemplateRows: "1fr 5fr 1fr" }}
    >
      <div
        className={`bg-black text-white flex justify-center items-end  font-nanum font-bold text-[2rem] pb-0 `}
      >
        포차를 선택해주세요
      </div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        speed={800}
        modules={[EffectCards, Navigation]}
        className="mySwiper"
        style={{
          backgroundColor: "rgab(0,0,0,0)",
          position: "relative",
          width: "44%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "40rem",
        }}
        navigation={true}
      >
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5rem 0px 5rem 0px",
          }}
        >
          <img
            className={`transition-all duration-300 ${styles.carouselImg}`}
            style={{ objectFit: "contain", width: "70%", height: "100%" }}
            src={require("../../assets/img/HuntingCard.png")}
            alt=""
            onClick={() => {
              dispatch(changeCarouselState());
              dispatch(changeThemeRoomState(1));
            }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5rem 0px 5rem 0px",
          }}
        >
          <img
            className={`transition-all duration-300 ${styles.carouselImg}`}
            style={{ objectFit: "contain", width: "70%", height: "100%" }}
            src={require("../../assets/img/HuntingCard.png")}
            alt=""
            onClick={() => {
              dispatch(changeCarouselState());
              dispatch(changeThemeRoomState(2));
            }}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5rem 0px 5rem 0px",
          }}
        >
          <img
            className={`transition-all duration-300 ${styles.carouselImg}`}
            style={{ objectFit: "contain", width: "70%", height: "100%" }}
            src={require("../../assets/img/HuntingCard.png")}
            alt=""
            onClick={() => {
              dispatch(changeCarouselState());
              dispatch(changeThemeRoomState(3));
            }}
          />
        </SwiperSlide>
      </Swiper>
      <div className="">2</div>
    </div>
  );
}

export default MainCreateRoomCarousel;
