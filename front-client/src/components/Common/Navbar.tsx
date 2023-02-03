import { changeAlarmApiDataState, changeAlarmState, changeMenuState } from "../../store/store";
import styles from '../Main/Main.module.css'
import axios from "axios";
import { useAppDispatch } from "../../store/hooks";

function Navbar(): JSX.Element {
  return (
    <div className="h-full min-w-[75rem]" >
      <div className="flex justify-center bg-black h-full" >
        <div style={{ width: "34%" }}></div>
        <img
          src={require('src/assets/logo/Logo.png')}
          alt="logo"
          className=" object-contain w-[32%]"
          
        />
        <div className="" style={{ width: "16%" }}></div>
        <div className="grid grid-cols-1 " style={{ width: "18%" }}>
          <div></div>
          <div></div>
          <MenuOption />
        </div>
      </div>
    </div>
  );
}

// menu component
function MenuOption():JSX.Element {
  let dispatch = useAppDispatch()
  const username = localStorage.getItem('Username')
  return (
    <div className="flex w-full">
      <div style={{width: '20%'}}></div>
      <div className="flex justify-evenly" style={{width: '70%'}}>
        <div className="flex justify-center items-end mb-2">
          <div className="cursor-pointer ">
            <img className="object-contain" style={{width: '1.5rem', height: '1.5rem'}} src={require('src/assets/logoIcon/shop.png')} alt="shop" />
            <p className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}>상점</p>
          </div>
        </div>
        <div className="flex justify-center items-end mb-2">
          <div className="cursor-pointer" onClick={()=> {
            axios({
              method:'get',
              url: `https://i8e201.p.ssafy.io/api/user/friend/request/${username}`
            })
            .then((r)=> {
              dispatch(changeAlarmState())
              dispatch(changeAlarmApiDataState(r.data.data))
            })
          }}>
            <img className="object-contain" style={{width: '1.5rem', height: '1.5rem'}} src={require('../../assets/logoIcon/alarm.png')} alt="alarm" />
            <p className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}>알림</p>
          </div>
        </div>
        <div className="flex justify-center items-end mb-2 ">
          <div className="cursor-pointer" onClick={()=> {
            dispatch(changeMenuState())
          }}>
            <img className="object-contain" style={{width: '1.5rem', height: '1.5rem'}} src={require('../../assets/logoIcon/menu.png')} alt="menu" />
            <p className={`text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs ${styles.NanumGothic}`}>메뉴</p>
          </div>
        </div>
      </div>
      <div style={{width: '20%'}}></div>
    </div>
  );
}


export default Navbar;
