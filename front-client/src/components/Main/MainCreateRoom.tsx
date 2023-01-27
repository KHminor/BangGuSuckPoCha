import style from './MainCreateRoom.module.css'
import MainCreateRoomSelect from "./MainCreateRoomSelect";
import MainCreateRoomPeople from "./MainCreateRoomPeople";

const MainCreateRoom = ({onClickCreateRoom} : { onClickCreateRoom : Function}): React.ReactElement => {
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

  // 전달받아온 함수를 실행해서 창 끄기
  const closeModal = () => {
    onClickCreateRoom();
  }

  // 태그 선택 기능
  const onSelectTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // console.log(event.target);
    // selectTags.current[index].classList.toggle(`${style.selectBtn}`)
    (event.target as Element).classList.toggle(`${style.selectBtn}`);
  };


  return (
    <div className={`bg-black bg-opacity-90 absolute h-screen text-white`}>
      <div className={`${style.tagListbox} ${style.boxShadow} min-w-[44rem] bg-black w-5/12 px-16 py-10 rounded-3xl relative top-1/2 left-1/2`}>
        <div className={`${style.neonTitle} font-extrabold text-5xl tracking-wide h-28`}>Create Room</div>
        <MainCreateRoomPeople selectOption={peopleOption} />
        <MainCreateRoomSelect selectOption={ageOption} />
        <MainCreateRoomSelect selectOption={regionOption} />
        <div className="text-left w-full text-xl font-bold mt-2 pt-3 border-t-2">태그</div>
        <div className="flex justify-center flex-wrap">
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
        <div className="flex justify-end w-full mt-10">
          <input
            className={`${style.createBtn} cursor-pointer`}
            type="submit"
            value="방만들기"
          />
          <input onClick={closeModal} className={`${style.cancelBtn} cursor-pointer`} type="submit" value="취소" />
        </div>
      </div>
    </div>
  );
};

export default MainCreateRoom;