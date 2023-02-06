import axios from "axios";
import { useAppDispatch } from "../../store/hooks";
import { showRoomUserBanModal } from "../../store/store";
import { toast } from "react-toastify";
import styles from "./RoomUserProfile.module.css";

const RoomUserBanModal = ({ userData, pochaId }: { userData: any, pochaId: string }) => {
  let dispatch = useAppDispatch();
  const { nickname, username } = userData.data;
  const pochaID = Number(pochaId);
  console.log(' vhck vj',pochaID);
  // 강퇴하는 함수
  const banUser = async () => {
    try {
      const bban = await axios({
        method: "PUT",
        url: "https://i8e201.p.ssafy.io/api/pocha/exit",
        data: {
          isHost: true,
          pochaId: pochaID,
          username: username,
          waiting: true,
        },
      });
      toast.success(`${nickname}을 강퇴하였습니다`);
      console.log("bban", bban);
    } catch (error) {
      console.log(error);
    }
    dispatch(showRoomUserBanModal());
  };

  // 취소 클릭시 모달 끄는 함수
  const closeFriendModal = () => {
    dispatch(showRoomUserBanModal());
  };

  return (
    <div
      className="bg-slate-800 bg-opacity-50 flex justify-center z-20 items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-black px-16 pt-14 pb-7 rounded-md text-center">
        <div className="text-xl mb-4 font-bold text-white">
          <span className="font-bold text-red-500" >{`${nickname}`}</span>
          님을 방에서 강퇴하시겠습니까?
        </div>
        <input
          onClick={banUser}
          className={`${styles.cancelBtn} cursor-pointer`}
          type="submit"
          value="강퇴"
        />
        <input
          onClick={closeFriendModal}
          className={`${styles.createBtn} cursor-pointer`}
          type="submit"
          value="취소"
        />
      </div>
    </div>
  );
};

export default RoomUserBanModal;
