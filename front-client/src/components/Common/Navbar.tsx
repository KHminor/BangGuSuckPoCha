import { changeAlarmState, changeMenuState } from "../../store/store";
import { useDispatch } from "react-redux";

function Navbar(): JSX.Element {
  return (
    <div className="h-full min-w-[75rem]" >
      <div className="flex justify-center bg-black h-full" >
        <div style={{ width: "34%" }}></div>
        <img
          src={require('../../assets/logo/Logo.png')}
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
  let dispatch = useDispatch()
  return (
    <div className="flex w-full">
      <div style={{width: '20%'}}></div>
      <div className="flex justify-evenly" style={{width: '60%'}}>
        <div className="flex justify-center items-end mb-2">
          <div className="cursor-pointer">
            <img className="w-full" style={{width: '1.5rem', height: '1.5rem'}} src={require('../../assets/logoIcon/shop.png')} alt="shop" />
            <p className="text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs">상점</p>
          </div>
        </div>
        <div className="flex justify-center items-end mb-2">
          <div className="cursor-pointer" onClick={()=> {
            dispatch(changeAlarmState())
          }}>
            <img className="w-full" style={{width: '1.5rem', height: '1.5rem'}} src={require('../../assets/logoIcon/alarm.png')} alt="alarm" />
            <p className="text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs">알림</p>
          </div>
        </div>
        <div className="flex justify-center items-end mb-2 ">
          <div className="cursor-pointer" onClick={()=> {
            dispatch(changeMenuState())
          }}>
            <img className="w-full" style={{width: '1.5rem', height: '1.5rem'}} src={require('../../assets/logoIcon/menu.png')} alt="menu" />
            <p className="text-white mt-1 sm:text-xs md:text-xm lg:text-sm text-xs">메뉴</p>
          </div>
        </div>
      </div>
      <div style={{width: '20%'}}></div>
    </div>
  );
}

function Test():JSX.Element {
  return (
    <div className="absolute bg-slate-100">
      hi
    </div>
  )
}

export default Navbar;
