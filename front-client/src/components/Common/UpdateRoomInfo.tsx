import style from "src/components/Main/MainCreateRoom.module.css";
import MainCreateRoomSelect from "src/components/Main/MainCreateRoomSelect";
import MainCreateRoomPeople from "src/components/Main/MainCreateRoomPeople";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeCreateRoomChoiceAddTag,
  changeCreateRoomChoiceRemoveTag,
  changeCreateRoomChoiceTagReset,
  showPublicModal,
  showUpdateRoom,
} from "../../store/store";
import MainCreateRoomTheme from "src/components/Main/MainCreateRoomTheme";
import axios from "axios";
import { useState } from "react";
import PublicModal from "./PublicModal";

const UpdateRoomInfo = ({
  roomTheme,
  pochaId,
  socket,
}: {
  roomTheme: number;
  pochaId: string;
  socket: any;
}): React.ReactElement => {
  const dispatch = useAppDispatch();

  // username (현재는 내꺼)
  const username = localStorage.getItem("Username");

  const roomTitle = "포차정보수정";
  const regionOption = ["지역", "전국", "부산광역시"];
  const ageOption = ["나이", "ALL", "20대"];
  const themeOption = ["테마", "이자카야", "포장마차", "맥주"];
  const peopleOption = ["인원", "2", "3", "4", "5", "6"];
  const huntingPeopleOption = ["인원", "2", "4", "6"];
  const tagList = [
    "애니메이션",
    "게임",
    "연애",
    "결혼",
    "영화",
    "가수",
    "축구",
    "연예인",
    "타로",
    "노래",
    "운동",
    "소주",
    "맥주",
    "막걸리",
    "기타",
  ];
  // 5개 제한 태그 관련
  const modalData = {
    type: "tag",
    msg: "태그는 5개까지만 선택가능합니다",
  };

  // 모달 상태 체크
  const showModal = useAppSelector((state) => {
    return state.PublicModal;
  });

  // 전달받아온 함수를 실행해서 창끄기
  const closeModal = () => {
    // onClickHiddenBtn();
    dispatch(showUpdateRoom(false));
  };

  // 태그 리스트
  const [choiceTagList, setChoiceTagList] = useState<number[]>([]);

  // 태그 선택 기능
  const onSelectTag = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!choiceTagList.includes(index) && choiceTagList.length >= 5) {
      dispatch(showPublicModal(true));
      return;
    }
    if (choiceTagList.includes(index)) {
      setChoiceTagList((prev) => {
        const ttest = prev.filter((data) => {
          return data !== index;
        });
        console.log(ttest);
        return ttest;
      });
    } else if (!choiceTagList.includes(index)) {
      setChoiceTagList((prev) => [...prev, index]);
    }

    const data = event.target as HTMLElement;
    let choiceText: any = data.innerText;

    // 이미 클릭이 돼서 제거할 때
    if (data.classList.contains(`${style.selectBtn}`)) {
      dispatch(changeCreateRoomChoiceRemoveTag(choiceText));
    } else {
      // 추가할 때
      dispatch(changeCreateRoomChoiceAddTag(choiceText));
    }
    (event.target as Element).classList.toggle(`${style.selectBtn}`);
  };

  // 인원 수
  const createRoomChoicePeople = useAppSelector((state) => {
    return state.createRoomChoicePeople;
  });
  // 나이
  const createRoomChoiceAge = useAppSelector((state) => {
    return state.createRoomChoiceAge;
  });
  // 지역
  const createRoomChoiceRegion = useAppSelector((state) => {
    return state.createRoomChoiceRegion;
  });
  // 태그
  const createRoomChoiceTag = useAppSelector((state) => {
    return state.createRoomChoiceTag;
  });
  // 테마
  const createRoomThemeCheck = useAppSelector((state) => {
    return state.createRoomThemeCheck;
  });
  
  // 포차 정보 업데이트 요청
  const updateRoom = async () => {
    try {
      const updateInfo = await axios({
        method: "PUT",
        url: `https://i8e201.p.ssafy.io/api/pocha/${pochaId}`,
        data: {
          age: createRoomChoiceAge,
          isPrivate: false,
          limitUser: createRoomChoicePeople,
          region: createRoomChoiceRegion,
          tagList: createRoomChoiceTag,
          themeId: createRoomThemeCheck,
        },
      });
      console.log("포차정보수정????", updateInfo);
      socket.emit("pocha_change", pochaId);
    } catch(error) {
      console.log("포차정보수정", error);
    }
    closeModal();
    // 태그 선택 초기화 함수
    dispatch(changeCreateRoomChoiceTagReset());
  };

  // // ----- 포차 설정 변경 이벤트 -----
  // function handlePochaUpdate() {
  //   // 설정값 입력.
  //   let pocha_config = {};

  //   // axios를 통해 포차 설정 변경. (await 사용해야할 듯?)
    
  // }

  return (
    <>
      {roomTheme === 1 ? (
        <>
          {showModal && <PublicModal data={modalData} />}
          <div
            className={`bg-black bg-opacity-90 overflow-y-auto z-10 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center text-white`}
          >
            <div
              className={`${style.boxShadow} flex-col items-center bg-black max-w-[48rem] px-16 py-10 rounded-3xl absolute top-20`}
            >
              <div
                className={`${style.neonTitle} font-extrabold text-5xl tracking-wide h-28`}
              >
                {roomTitle}
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
                  onClick={updateRoom}
                  className={`${style.createBtn} cursor-pointer`}
                  type="button"
                  value="정보수정"
                />
                <input
                  onClick={() => {
                    closeModal();
                    // 태그 선택 초기화 함수
                    dispatch(changeCreateRoomChoiceTagReset());
                  }}
                  className={`${style.cancelBtn} cursor-pointer`}
                  type="button"
                  value="취소"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={`bg-black bg-opacity-90 absolute h-screen text-white`}>
          <div
            className={`${style.tagListbox} ${style.boxShadow} min-w-[44rem] bg-black w-5/12 px-16 py-10 rounded-3xl relative top-1/2 left-1/2`}
          >
            <div
              className={`${style.neonTitle} font-extrabold text-5xl tracking-wide h-28`}
            >
              {roomTitle}
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
              onClick={updateRoom}
                className={`${style.createBtn} cursor-pointer`}
                type="button"
                value="정보수정"
              />
              <input
                onClick={closeModal}
                className={`${style.cancelBtn} cursor-pointer`}
                type="button"
                value="취소"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRoomInfo;
