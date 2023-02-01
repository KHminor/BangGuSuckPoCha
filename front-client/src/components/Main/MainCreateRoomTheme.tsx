import { useState, useRef, useEffect } from "react";
import style from "./MainCreateRoom.module.css";

const MainCreateRoomTheme = ({ selectOption }: { selectOption: string[] }) => {
  const [selectTitle, ...selectPocha] = selectOption;
  const selectTheme = useRef<any>([]);
  const themeImg = [
    require("../../assets/theme/izakaya.jpg"),
    require("../../assets/theme/pocha.jpg"),
    require("../../assets/theme/hof.jpg"),
  ];
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    // 처음에 제일 첫번째 값 선택세팅
    selectTheme.current[0].classList.toggle("grayscale");
    selectTheme.current[0].classList.toggle("scale-125");
    setTheme(selectTheme.current[0]);
  }, []);

  const onSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 선택한값이 다르면 기존꺼 끄고 새로운거 선택
    if (event.target !== theme) {
      theme?.classList.toggle("grayscale");
      theme?.classList.toggle("scale-125");
      (event.target as Element).classList.toggle("grayscale");
      (event.target as Element).classList.toggle("scale-125");
      setTheme(event.target);
    }
  };
  return (
    <div className="flex w-full h-12 my-10 font-bold items-center">
      <div className="text-left text-xl mr-10">{selectTitle}</div>
      <div className="flex justify-between items-center w-[80%]">
        {selectPocha.map((themeName, index) => (
          // <img src={require(`${themeImg[index]}`)} key={index} alt={`${selectPocha[index+1]}`}/>
          <div key={index} className={`flex-col justify-center items-center`}>
            <img
              ref={(tag) => {
                selectTheme.current[index] = tag;
              }}
              className={`grayscale w-32 h-24 cursor-pointer rounded-lg`}
              src={themeImg[index]}
              onClick={onSelect}
              alt={`${selectPocha[index + 1]}`}
            />
            <div
              className={`my-3 mr-4 rounded-fu w-full h-full text-lg flex justify-center items-center`}
            >
              {themeName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCreateRoomTheme;
