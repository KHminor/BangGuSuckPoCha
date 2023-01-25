// image
// import logo from "../../assets/logo/Logo.png";
// import shop from "../../assets/logoIcon/shop.png";
// import menu from "../../assets/logoIcon/menu.png";
// import alarm from "../../assets/logoIcon/alarm.png";
import { changeAlarmState, changeMenuState } from "../../store/store";
import { useDispatch } from "react-redux";

function Navbar(): JSX.Element {
  return (
    <div>
      <div className="flex bg-black" style={{ height: "16vh" }}>
        <div style={{ width: "34vw" }}></div>
        <img
          // src={logo}
          alt="logo"
          className=" h-full"
          style={{ width: "32vw" }}
        />
        <div style={{ width: "16vw" }}></div>
        <div className="grid grid-cols-1 h-rull" style={{ width: "18vw" }}>
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
    <div className="grid grid-cols-6 ">
      <div></div>
      <div></div>
      <div className="flex justify-center items-end mb-2">
        <div className="cursor-pointer">
          {/* <img className="w-full" src={shop} alt="shop" /> */}
          <p className="text-white mt-1">상점</p>
        </div>
      </div>
      <div className="flex justify-center items-end mb-2">
        <div className="cursor-pointer" onClick={()=> {
          dispatch(changeAlarmState())
        }}>
          {/* <img className="w-full" src={alarm} alt="alarm" /> */}
          <p className="text-white mt-1">알림</p>
        </div>
      </div>
      <div className="flex justify-center items-end mb-2 ">
        <div className="cursor-pointer" onClick={()=> {
          dispatch(changeMenuState())
        }}>
          {/* <img className="w-full" src={menu} alt="menu" /> */}
          <p className="text-white mt-1">메뉴</p>
        </div>
      </div>
      <div></div>
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
