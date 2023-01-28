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
    <div className="bg-black bg-opacity-90 absolute h-screen w-screen grid" style={{gridTemplateRows: '1fr 5fr 1fr'}}>
      <div className={`bg-black  text-white flex justify-center items-end pb-7 ${styles.NanumGothic}`}>드래그를 통해 테마를 선택해주세요</div>
      <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
      style={{
        backgroundColor: "rgab(0,0,0,0)",
        position: "relative",
        width: "44%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "40rem"
      }}
    >
      
      <SwiperSlide style={{ display: "flex", justifyContent: "center" , padding: '5rem 0px 5rem 0px' }} onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(1))
      }}>
        <img
        className='transition-all duration-300'
          style={{ objectFit: "contain", width: "70%", height: "100%",}}
          src={require('../../assets/img/HuntingCard.png')}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide style={{ display: "flex", justifyContent: "center" , padding: '5rem 0px 5rem 0px' }} onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(2))
      }}>
        <img
        className='transition-all duration-300'
          style={{ objectFit: "contain", width: "70%", height: "100%" ,}}
          src={require('../../assets/img/HuntingCard.png')}
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide style={{ display: "flex", justifyContent: "center" , padding: '5rem 0px 5rem 0px' }} onClick={()=> {
        dispatch(changeCarouselState())
        dispatch(changeThemeRoomState(3))
      }}>
        <img
        className='transition-all duration-300'
          style={{ objectFit: "contain", width: "70%", height: "100%" ,}}
          src={require('../../assets/img/HuntingCard.png')}
          alt=""
        />
      </SwiperSlide>
      
    </Swiper>
    <div className="">2</div>
    </div>
  );
};

export default ThemeChoiceCarousel