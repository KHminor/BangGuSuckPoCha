import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeMenuState } from "../../store/store";

function NavbarAlarm(): JSX.Element {
  let dispatch = useAppDispatch();
  const alarmIcon = useRef<any>(null);
  // 알람 클릭 상태
  const alarmClickCheck: any = useAppSelector((state: any) => {
    return state.alarmClickCheck;
  });
  // 메뉴 클릭 상태
  const checkMenuState: any = useAppSelector((state: any) => {
    return state.menuClickCheck;
  });

  // 알람 클릭시 조건 분기
  useEffect(()=> {
    if ((alarmClickCheck) && (checkMenuState)) {
      dispatch(changeMenuState())
      alarmIcon.current.classList.remove("hidden");
    } else if (alarmClickCheck) {
      alarmIcon.current.classList.remove("hidden");
    } else if (!(alarmClickCheck)) {
      alarmIcon.current.classList.add("hidden");
    }
  }, [alarmClickCheck])
  
  return (
    <div
      ref={alarmIcon}
      className={`absolute w-56 bg-black rounded-3xl hidden `}
      style={{ right: "5rem", top: "11.5rem", height: "22rem" }}
    >
      <div className={`grid grid-rows-12 w-56 `}>
        <div className="grid grid-cols-12 row-span-1 items-center">
          <div className="col-span-5"></div>
          <div className="col-span-2 opacity-50 text-white">알림</div>
          <div className="col-span-5"></div>
        </div>
        <div className="grid grid-cols-12 row-span-1 items-start">
          <div className="col-span-1"></div>
          <div className="col-span-3 text-xl text-white">요청</div>
          <div className="col-span-4"></div>
          <div className="col-span-3 text-xl opacity-50 text-white">리뷰</div>
          <div className="col-span-1"></div>
        </div>
        <div className="row-span-6 hideScroll" style={{ overflow: "auto" }}>
          <div
            className="my-2 cursor-pointer text-white"
            style={{ height: "20%" }}
          >
            한상현 바보
          </div>
          <div
            className="my-2 cursor-pointer text-white"
            style={{ height: "20%" }}
          >
            한상현 바보
          </div>
          <div
            className="my-2 cursor-pointer text-white"
            style={{ height: "20%" }}
          >
            한상현 바보
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavbarAlarm;
