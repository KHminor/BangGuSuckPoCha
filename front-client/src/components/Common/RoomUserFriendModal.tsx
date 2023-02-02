import axios from "axios";
import { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { roomAddFriendModalState } from "../../store/store";
import { toast } from "react-toastify";
import styles from "./RoomUserProfile.module.css";

const RoomUserFriendModal = ({ userData }: { userData: any }) => {
  let dispatch = useAppDispatch();
  const { nickname } = userData.data;
  const bgDiv = useRef<any>();

  // 친구신청 하는 함수
  const addFriend = async () => {
    try {
      const ffriend = await axios({
        method: "POST",
        url: "https://i8e201.p.ssafy.io/api/user/friend/request",
        data: {
          from_id: 0,
          to_id: 0,
        },
      });
      toast.success(`${nickname}에게 친구신청을 완료하였습니다`);
      console.log("친구요청", ffriend);
    } catch (error) {
      console.log(error);
    }
    dispatch(roomAddFriendModalState());
    
  };

  // 취소 클릭시 모달 끄는 함수
  const closeFriendModal = () => {
    dispatch(roomAddFriendModalState());
  };

  return (
    <div
      ref={bgDiv}
      className="bg-slate-800 bg-opacity-50 flex justify-center z-10 items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-black px-16 pt-14 pb-7 rounded-md text-center">
        <div className="text-xl mb-4 font-bold text-white">
          <span className="font-bold text-purple-300">{`${nickname}`}</span>
          님에게 친구신청을 하시겠습니까?
        </div>
        <input
          onClick={addFriend}
          className={`${styles.createBtn} cursor-pointer`}
          type="submit"
          value="신청"
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

export default RoomUserFriendModal;
