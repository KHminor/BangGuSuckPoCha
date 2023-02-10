import { useRef } from "react";
import { useAppDispatch } from "src/store/hooks";
import { showLiargameSettingModal } from "src/store/store";

const LiargameSettingModal = () => {
  const dispatch = useAppDispatch();

  //백그라운드 div
  const bgDiv = useRef<any>();

  // 프로필선택 모달 끄는 함수
  function CloseLiarSettingModal(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === bgDiv.current) {
      console.log("라이어세팅창꺼짐!");
      dispatch(showLiargameSettingModal());
    }
  }
  return (
    <>
      <div
        ref={bgDiv}
        onMouseDown={CloseLiarSettingModal}
        className={`z-10 bg-slate-800 bg-opacity-75 fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-white`}
      >
        <div className="w-[50rem] h-[50rem] border-2 border-white rounded-[6rem]">
          라이어 모달창 사이즈 조정해서 보기
        </div>
      </div>
    </>
  );
};

export default LiargameSettingModal;
