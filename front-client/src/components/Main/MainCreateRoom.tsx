import style from "./MainCreateRoom.module.css";
import { useRef, useState } from "react";

const MainCreateRoom = (): React.ReactElement => {
  const selectTags = useRef<any>([]);

  const onSelectRegion = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    (event.target as Element).classList.toggle("text-black");
    (event.target as Element).classList.toggle("bg-white");
  }

  const onSelectTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(event.target);
    // selectTags.current[index].classList.toggle(`${style.selectBtn}`)
    (event.target as Element).classList.toggle(`${style.selectBtn}`);
    // if (isSelect) {
    //   setIsSelect((prev) => !prev);
    //   selectTags.current[index].classList = `${style.tagBox}`;
    // } else {
    //   setIsSelect((prev) => !prev);
    //   selectTags.current[index].classList += `${ style.selectBtn}`;
    // }
  };

  const tagList = [
    "애니메이션",
    "게임",
    "소주",
    "맥주",
    "운동",
    "맥주",
    "가수",
    "영화",
    "축구",
    "연예인",
    "사주팔자",
    "타로",
    "막걸리",
    "연애",
    "똥"
  ];

  return (
    <div style={{ height: "100vh", backgroundColor: "black", color: "white" }}>
      {/* <div className="flex w-10/12 h-screen"></div> */}
      <div className={`${style.tagListbox}`}>
        <div className="flex w-full h-12 my-5 font-bold items-center">
          <div className="text-left text-2xl mr-10">지역</div>
          <div className="bg-white w-32 h-full text-black text-xl flex justify-center items-center"><div>전국</div></div>
          <div onClick={onSelectRegion} className="border border-white w-32 h-full text-xl flex justify-center items-center"><div className="w-full h-full">부산광역시</div></div>
        </div>
        <div className="text-left w-full text-2xl font-bold">태그</div>
        <div className={`${style.tagbox}`}>
          {tagList.map((tag, index) => {
            return (
              <div
                onClick={(event) => onSelectTag(index, event)}
                ref={(tag) => {
                  selectTags.current[index] = tag;
                }}
                key={index}
                className={`${style.tagBox}`}
              >
                {tag}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end w-full">
          <input
            className={`${style.createBtn}`}
            type="submit"
            value="방만들기"
          />
          <input className={`${style.cancelBtn}`} type="submit" value="취소" />
        </div>
      </div>
    </div>
  );
};

export default MainCreateRoom;
