import { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { changeCreateRoomChoiceAge, changeCreateRoomChoiceRegion } from "../../store/store";
import style from "./MainCreateRoom.module.css";

const MainCreateRoomSelect = ({selectOption} : {selectOption : string[]}) => { 
  const dispatch = useAppDispatch()
  const [selectTitle, selectAge, selectRegion] = selectOption;

  const selectChoiceAge = useRef<any>(null);
  const selectRegionCity = useRef<any>(null);

  // 선택한 나이에 따른 state 변경
  const onSelectAge = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    selectChoiceAge.current.classList.toggle("text-black");
    selectChoiceAge.current.classList.toggle("bg-white");
    selectRegionCity.current.classList.toggle("text-black");
    selectRegionCity.current.classList.toggle("bg-white");
    const chlickAge = event.target as HTMLElement;
    if (chlickAge.innerText[-1] === '대') {
      const sendData = (chlickAge.innerText).substring(0,2)
      dispatch(changeCreateRoomChoiceAge(sendData))
    } else {
      dispatch(changeCreateRoomChoiceAge(chlickAge.innerText))
    }
  };

  // 선택한 지역에 따른 state 변경
  const onSelectRegion = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    selectChoiceAge.current.classList.toggle("text-black");
    selectChoiceAge.current.classList.toggle("bg-white");
    selectRegionCity.current.classList.toggle("text-black");
    selectRegionCity.current.classList.toggle("bg-white");
    const clickRegion = event.target as HTMLElement;
    dispatch(changeCreateRoomChoiceRegion(clickRegion.innerText))
  };

  return (
    <div className="flex w-full h-12 mb-10 font-bold items-center">
      <div className="text-left text-xl mr-10">{selectTitle}</div>
      <div
        onClick={onSelectAge}
        ref={selectChoiceAge}
        className={`${style.selectHover} border border-white bg-white w-[6.5rem] h-full text-black text-lg flex justify-center items-center cursor-pointer`}
      >
        {selectAge}
      </div>
      <div
        onClick={onSelectRegion}
        ref={selectRegionCity}
        className={`${style.selectHover} border border-white w-[6.5rem] h-full text-lg flex justify-center items-center cursor-pointer`}
      >
        {selectRegion}
      </div>
    </div>
  );
};

export default MainCreateRoomSelect;
