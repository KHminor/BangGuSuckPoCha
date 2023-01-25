import style from "./MainCreateRoom.module.css";
import MainCreateRoomSelect from "./MainCreateRoomSelect";
import MainCreateRoomPeople from "./MainCreateRoomPeople";

const MainCreateRoom = (): React.ReactElement => {
  const regionOption = ["지역", "전국", "부산광역시"];
  const ageOption = ["나이", "ALL", "20대"];
  const peopleOption = ["인원", "2", "3", "4", "5", "6"];
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
    "똥",
  ];

  const onSelectTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(event.target);
    // selectTags.current[index].classList.toggle(`${style.selectBtn}`)
    (event.target as Element).classList.toggle(`${style.selectBtn}`);
  };


  return (
    <div className="bg-black h-screen text-white">
      {/* <div className="flex w-10/12 h-screen"></div> */}
      <div className={`${style.tagListbox}`}>
        <MainCreateRoomPeople selectOption={peopleOption} />
        <MainCreateRoomSelect selectOption={ageOption} />
        <MainCreateRoomSelect selectOption={regionOption} />
        <div className="text-left w-full text-2xl font-bold">태그</div>
        <div className={`${style.tagbox}`}>
          {tagList.map((tag, index) => {
            return (
              <div
                onClick={(event) => onSelectTag(index, event)}
                // ref={(tag) => {
                //   selectTags.current[index] = tag;
                // }}
                key={index}
                className={`${style.tagBox}`}
              >
                {tag}
              </div>
            );
          })}
        </div>
        <div className="flex justify-end w-full mt-5">
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
