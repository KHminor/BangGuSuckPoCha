import axios from "axios";
import { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { showRoomUserBanModal } from "../../store/store";
import styles from "./RoomUserProfile.module.css";

const RoomUserBanModal = ({ userData }: { userData: any }) => {
  let dispatch = useAppDispatch();
  const { nickname } = userData.data;
  const bgDiv = useRef<any>();
  // 강퇴하는 함수
  const banUser = async () => {
    const bban = await axios({
      method: "PUT",
      url: "https://i8e201.p.ssafy.io/api/pocha/exit",
      data: {
        isHost: true,
        pochaId: 0,
        username: "string",
        waiting: true,
      },
    });
    console.log("bban", bban);
    dispatch(showRoomUserBanModal());
  };

  // 취소 클릭시 모달 끄는 함수
  const closeFriendModal = () => {
    dispatch(showRoomUserBanModal());
  };

  return (
    <div
      ref={bgDiv}
      className="bg-slate-800 bg-opacity-50 flex justify-center z-10 items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-black px-16 pt-14 pb-7 rounded-md text-center">
        <div className="text-xl mb-4 font-bold text-white">
          <span className="font-bold text-red-500" >{`${nickname}`}</span>
          님을 방에서 강퇴하시겠습니까?
        </div>
        <input
          onClick={banUser}
          className={`${styles.createBtn} cursor-pointer`}
          type="submit"
          value="확인"
        />
        <input
          onClick={closeFriendModal}
          className={`${styles.cancelBtn} cursor-pointer`}
          type="submit"
          value="취소"
        />
      </div>
    </div>
  );
};

export default RoomUserBanModal;
