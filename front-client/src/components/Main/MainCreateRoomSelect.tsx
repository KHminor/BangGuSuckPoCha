import { useRef } from "react";

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
    <div className="flex w-full h-12 mb-20 font-bold items-center">
      <div className="text-left text-2xl mr-10">{selectTitle}</div>
      <div
        onClick={onSelectRegion}
        ref={selectRegionAll}
        className="border border-white bg-white w-32 h-full text-black text-xl flex justify-center items-center cursor-pointer"
      >
        <div>{selectAge}</div>
      </div>
      <div
        onClick={onSelectRegion}
        ref={selectRegionCity}
        className="border border-white w-32 h-full text-xl flex justify-center items-center cursor-pointer"
      >
        <span>{selectRegion}</span>
      </div>
    </div>
  );
};

export default MainCreateRoomSelect;
