import styles from './Main.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/controller';
import { useAppDispatch } from "../../store/hooks";
import { changeCarouselState, changeThemeRoomState } from "../../store/store";

function ThemeChoiceCarousel() {
    let dispatch = useAppDispatch()

  return ( 
    <div className="bg-black bg-opacity-90 absolute h-screen w-screen grid" style={{gridTemplateRows: '1fr 1.9fr 1fr'}}>
      <div className={`bg-black  text-white flex justify-center items-end pb-7 ${styles.NanumGothic}`}>드래그를 통해 테마를 선택해주세요</div>
      <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
      style={{
        backgroundColor: "black",
        position: "relative",
        width: "44%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      
      <SwiperSlide onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(1))
      }}>
        <img
          style={{ objectFit: "cover", minWidth: "80%", height: "100%"}}
          src="https://memeprod.ap-south-1.linodeobjects.com/user-maker-thumbnail/c16ce2c3dca3fd4dc5e5b6344f46d4c5.gif"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(2))
      }}>
        <img
          style={{ objectFit: "cover", minWidth: "80%", height: "100%" }}
          src="https://images.ctfassets.net/l3l0sjr15nav/NCqT6EmgLiydETEgvagXG/24e1571ad345881afc6e775bf6f86a82/200611-EN-GIF-GIFs-Rule.gif"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(3))
      }}>
        <img
          style={{ objectFit: "cover", minWidth: "80%", height: "100%" }}
          src="https://blog.kakaocdn.net/dn/c6pAkf/btrn4rgw5la/7m06GPUMq1155ou7EEYo21/img.gif"
          alt=""
        />
      </SwiperSlide>
      
    </Swiper>
    <div className="">2</div>
    </div>
  );
};

export default ThemeChoiceCarousel