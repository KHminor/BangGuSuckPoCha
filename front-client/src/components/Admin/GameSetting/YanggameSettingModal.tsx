import axios from "axios";
import { useRef } from "react";
import { useAppDispatch } from "src/store/hooks";
import { showYanggameSettingModal } from "src/store/store";

const YanggameSettingModal = () => {
  const dispatch = useAppDispatch();

  //백그라운드 div
  const bgDiv = useRef<any>();

  // 프로필선택 모달 끄는 함수
  function CloseYangSettingModal(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === bgDiv.current) {
      console.log("양세찬세팅창꺼짐!");
      dispatch(showYanggameSettingModal());
    }
  }
  return (
    <>
      <div
        ref={bgDiv}
        onMouseDown={CloseYangSettingModal}
        className={`z-10 bg-slate-800 bg-opacity-75 fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-white`}
      >
        <div className="w-[50rem] h-[50rem] border-2 border-white rounded-[6rem] flex flex-col justify-center items-center">
          <div className="w-[20%] h-[20%] border-2 border-white">
            양세찬 모달창 사이즈 조정해서 보기
          </div>
          <div
            className="w-[20%] h-[20%] border-2 border-white"
            onClick={() => {
              axios({
                method: "get",
                url: "https://i8e201.p.ssafy.io/api/pocha/game/ysc",
              }).then((r) => {
                console.log("양세찬 게임 데이터", r.data.data);
              });
            }}
          >
            이거 클릭하면 axios 호출
          </div>
        </div>
      </div>
    </>
  );
};

export default YanggameSettingModal;
