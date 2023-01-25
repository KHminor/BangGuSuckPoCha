import { useState, useRef } from "react";

const MainCreateRoomPeople = ({ selectOption }: { selectOption: string[] }) => {
  const [selectTitle, ...selectPeople] = selectOption;
  const selectHumans = useRef<any>([]);
  // console.log('12',selectHumans.current);
  const [people, setPeople] = useState([selectHumans.current[0]]);

  // const selectRegionAll = useRef<any>(null);
  // const selectRegionCity = useRef<any>(null);

  const onSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // selectRegionAll.current.classList.toggle("text-black");
    // selectRegionAll.current.classList.toggle("bg-white");
    // selectRegionCity.current.classList.toggle("text-black");
    // selectRegionCity.current.classList.toggle("bg-white");

    (event.target as Element).classList.toggle("text-black");
    (event.target as Element).classList.toggle("bg-white");
  };
  return (
    <div className="flex w-full h-12 mb-20 font-bold items-center">
      <div className="text-left text-2xl mr-10">{selectTitle}</div>
      {selectPeople.map((people, index) => (
        <div
          onClick={onSelect}
          key={index}
          ref={(tag) => {
            selectHumans.current[index] = tag;
          }}
          className="mr-4 border-2 rounded-full border-white w-16 h-full text-xl flex justify-center items-center cursor-pointer"
        >
          {people}
        </div>
      ))}
    </div>
  );
};

export default MainCreateRoomPeople;
