import { useRef } from "react";
import style from "./MainCreateRoom.module.css";

const MainCreateRoomSelect = ({selectOption} : {selectOption : string[]}) => { 
  const [selectTitle, selectAge, selectRegion] = selectOption;

  const selectRegionAll = useRef<any>(null);
  const selectRegionCity = useRef<any>(null);

  const onSelectRegion = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    selectRegionAll.current.classList.toggle("text-black");
    selectRegionAll.current.classList.toggle("bg-white");
    selectRegionCity.current.classList.toggle("text-black");
    selectRegionCity.current.classList.toggle("bg-white");

    // (event.target as Element).classList.toggle("text-black");
    // (event.target as Element).classList.toggle("bg-white");
  };
  return (
    <div className="flex w-full h-12 mb-10 font-bold items-center">
      <div className="text-left text-xl mr-10">{selectTitle}</div>
      <div
        onClick={onSelectRegion}
        ref={selectRegionAll}
        className={`${style.selectHover} border border-white bg-white w-28 h-full text-black text-lg flex justify-center items-center cursor-pointer`}
      >
        <span>{selectAge}</span>
      </div>
      <div
        onClick={onSelectRegion}
        ref={selectRegionCity}
        className={`${style.selectHover} border border-white w-28 h-full text-lg flex justify-center items-center cursor-pointer`}
      >
        <span>{selectRegion}</span>
      </div>
    </div>
  );
};

export default MainCreateRoomSelect;
