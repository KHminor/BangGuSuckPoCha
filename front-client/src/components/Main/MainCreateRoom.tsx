import style from "./MainCreateRoom.module.css";
import MainCreateRoomSelect from "./MainCreateRoomSelect";
import MainCreateRoomPeople from "./MainCreateRoomPeople";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeCarouselState, changeCreateRoomChoiceAddTag, changeCreateRoomChoiceRemoveTag, changeCreateRoomChoiceTagReset, changeThemeRoomState } from "../../store/store";
import MainCreateRoomTheme from "./MainCreateRoomTheme";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainCreateRoom = ({
  onClickHiddenBtn,
  roomTheme,
}: {
  onClickHiddenBtn: Function;
  roomTheme: number;
}): React.ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  // username (현재는 내꺼)
  const username = `1zjK_Yrq6klkIxBWj8bj1WJkV5ng-7jhrRGvlIJXawI`

  const roomTitle = ["소통포차", "게임포차", "헌팅포차"];
  const regionOption = ["지역", "전국", "부산광역시"];
  const ageOption = ["나이", "ALL", "20대"];
  const themeOption = ["테마", "이자카야", "포장마차", "맥주"];
  const peopleOption = ["인원", "2", "3", "4", "5", "6"];
  const huntingPeopleOption = ["인원", "2", "4", "6"];
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

  // 전달받아온 함수를 실행해서 창끄고 캐러셀로 되돌리기
  const closeModal = () => {
    // onClickHiddenBtn();
    dispatch(changeThemeRoomState(0));
    dispatch(changeCarouselState());
  };

  
  const [choiceTagList, setChoiceTagList]:any = useState([])

  // 태그 선택 기능
  const onSelectTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    
    const data = event.target as HTMLElement;
    let choiceText:any = data.innerText
    
    // 이미 클릭이 돼서 제거할 때
    if (data.classList.contains(`${style.selectBtn}`)) {
      dispatch(changeCreateRoomChoiceRemoveTag(choiceText))
    } else {
      // 추가할 때
      dispatch(changeCreateRoomChoiceAddTag(choiceText))
    }
    (event.target as Element).classList.toggle(`${style.selectBtn}`);
  };
  
  const createRoomChoicePeople = useAppSelector((state)=> {return state.createRoomChoicePeople})
  const createRoomChoiceAge = useAppSelector((state)=> {return state.createRoomChoiceAge})
  const createRoomChoiceRegion = useAppSelector((state)=> {return state.createRoomChoiceRegion})
  const createRoomChoiceTag = useAppSelector((state)=> {return state.createRoomChoiceTag})
  const createRoomThemeCheck = useAppSelector((state)=> {return state.createRoomThemeCheck})
  return (
    <>
      {roomTheme === 1 ? (
        <div className={`bg-black bg-opacity-90 fixed h-screen text-white`}>
          <div
            className={`${style.tagListbox} ${style.boxShadow} min-w-[44rem] bg-black w-5/12 px-16 py-10 rounded-3xl relative top-1/2 left-1/2`}
          >
            <div
              className={`${style.neonTitle} font-extrabold text-5xl tracking-wide h-28`}
            >
              {roomTitle[roomTheme - 1]}
            </div>
            <MainCreateRoomPeople selectOption={peopleOption} />
            <div className="flex justify-start w-full">
              <MainCreateRoomSelect selectOption={ageOption} />
              <MainCreateRoomSelect selectOption={regionOption} />
            </div>
            <MainCreateRoomTheme selectOption={themeOption} />
            <div className="text-left w-full text-xl font-bold mt-2 pt-3 border-t-2">
              태그
            </div>
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
                onClick={()=> {
                  console.log('방 허용 나이',createRoomChoiceAge);
                  console.log('현재 인원수',createRoomChoicePeople);
                  console.log('방 허용 지역',createRoomChoiceRegion);
                  console.log('클릭한 태그', createRoomChoiceTag);
                  console.log('클릭한 테마Id', createRoomThemeCheck);
                  
                  
                  axios({
                    method: 'post',
                    url: 'https://i8e201.p.ssafy.io/api/pocha',
                    data: {
                      "age": 20,
                      "isPrivate": false,
                      "limitUser": createRoomChoicePeople,
                      "region": createRoomChoiceRegion,
                      "tagList": createRoomChoiceTag,
                      "themeId": createRoomThemeCheck
                    }
                  })
                  .then((r)=> {
                    const PochaId = r.data.data
                    axios({
                      method: 'post',
                      url: 'https://i8e201.p.ssafy.io/api/pocha/enter',
                      data: {
                        "isHost": true,
                        "pochaId": PochaId,
                        "username": username,
                        "waiting": true
                      }
                    })
                    .then((r)=> {
                      console.log(r.data);
                      navigate(`/storyroom/:${PochaId}`)
                    })
                  })
                }}
              />
              <input
                onClick={()=> {
                  closeModal()
                  // 태그 선택 초기화 함수
                  dispatch(changeCreateRoomChoiceTagReset())
                }}
                className={`${style.cancelBtn} cursor-pointer`}
                type="submit"
                value="취소"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={`bg-black bg-opacity-90 absolute h-screen text-white`}>
          <div
            className={`${style.tagListbox} ${style.boxShadow} min-w-[44rem] bg-black w-5/12 px-16 py-10 rounded-3xl relative top-1/2 left-1/2`}
          >
            <div
              className={`${style.neonTitle} font-extrabold text-5xl tracking-wide h-28`}
            >
              {roomTitle[roomTheme - 1]}
            </div>
            {roomTheme === 3 ? (
              <MainCreateRoomPeople selectOption={huntingPeopleOption} />
            ) : (
              <MainCreateRoomPeople selectOption={peopleOption} />
            )}
            <MainCreateRoomSelect selectOption={ageOption} />
            <MainCreateRoomSelect selectOption={regionOption} />
            <div className="text-left w-full text-xl font-bold mt-2 pt-3 border-t-2">
              태그
            </div>
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
              <input
                onClick={closeModal}
                className={`${style.cancelBtn} cursor-pointer`}
                type="submit"
                value="취소"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainCreateRoom;
