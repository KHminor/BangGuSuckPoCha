import { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { showPublicModal } from "../../store/store";
import styles from "./RoomUserProfile.module.css";

const PublicModal = ({ Data }: { Data: string }) => {
  let dispatch = useAppDispatch();
  const message = Data;
  const bgDiv = useRef<HTMLDivElement>(null);

  // 배경 클릭시 모달 끄는 함수
  const BgCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === bgDiv.current) {
      dispatch(showPublicModal());
    }
  };

  // 확인 클릭시 모달 끄는 함수
  const closePublicModal = () => {
    dispatch(showPublicModal());
  };

  return (
    <div
      ref={bgDiv}
      onMouseDown={BgCloseModal}
      className="bg-slate-800 bg-opacity-50 flex justify-center z-10 items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-black px-16 pt-14 pb-7 rounded-md text-center">
        <div className="text-xl mb-4 font-bold text-white">
          {/* <span className="font-bold text-purple-300">{`${message}`}</span> */}
          {`${message}`}
        </div>
        <input
          onClick={closePublicModal}
          className={`${styles.createBtn} cursor-pointer`}
          type="button"
          value="확인"
        />
        {/* <input
          onClick={closePublicModal}
          className={`${styles.cancelBtn} cursor-pointer`}
          type="submit"
          value="취소"
        /> */}
      </div>
    </div>
  );
};

export default PublicModal;
