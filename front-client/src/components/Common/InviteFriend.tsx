import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  inviteMyFriend,
  changeMenuFriendState,
  showPublicModal,
} from "../../store/store";
import styles from "./Common.module.css";
import PublicModal from "./PublicModal";

function InviteFriend({ onClickShowInvite, pochaId }: { onClickShowInvite: Function, pochaId: string }): JSX.Element {
  const username = localStorage.getItem("Username");
  // 메뉴 클릭시
  const dispatch = useAppDispatch();
  const [modalData, setModalData] = useState<any>(null);

  const friendListIcon = useRef<any>(null);

  const [myFriends, setMyFriends] = useState([]);

  // //  메뉴 -> 친구 리스트
  // const menuFriendListApiData: any = useAppSelector((state: any) => {
  //   return state.menuFriendListApiData;
  // });
  // Public 모달 보이기 관련
  const showModal = useAppSelector((state) => {
    return state.PublicModal;
  });

  console.log("친구리스트데이터", myFriends);

  // 친구 요청
  const getMyFriends = async () => {
    try {
      const { data } = await axios({
        url: `https://i8e201.p.ssafy.io/api/user/friend/${username}`,
      });
      setMyFriends(data.data);
    } catch (error) {
      console.log("초대할 친구목록", error);
    }
  };
  useEffect(() => {
    getMyFriends();
  }, []);

  const emoji =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png";
  // const nickname = '라면왕 한통깨'
  const logState =
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png";

  const onClickShowModal = (event : React.MouseEvent<HTMLDivElement>) => {
    const toUsername = event.currentTarget.id;
    const nickname = event.currentTarget.dataset.nickname;
    console.log("상대초대할친구", toUsername);
    console.log("상대초대할친구닉", nickname);
    // const username = event.currentTarget.value;
    onClickShowInvite(toUsername, nickname);
  };

  const friendList = myFriends.map((e: any, idx: any) => {
    return (
      <div
        key={e.f_nickname}
        className=" grid my-2 cursor-pointer "
        style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        id={e.you_id}
        data-nickname={e.f_nickname}
        onClick={onClickShowModal}
      >
        <div className="flex justify-center items-center h-full pl-2">
          <img className="object-contain h-[80%] " src={emoji} alt="" />
        </div>
        <div
          className={`flex justify-start items-center pl-3 text-base font-semibold h-full ${styles.menuFriendNeon}`}
        >
          {e.f_nickname}
        </div>
        <div className="flex justify-center items-center h-full">
          <img className="h-[20%] w-[20%]" src={logState} alt="" />
        </div>
      </div>
    );
  });

  return (
    <>
      <div
        ref={friendListIcon}
        className="fixed  w-[17rem] h-[35rem] bottom-0 right-0"
      >
        <div className="h-full w-full">
          <div className="w-full h-full">
            <div
              className="grid h-full bg-black text-white border-2 border-white"
              style={{
                gridTemplateRows: "0.5fr 0.5fr 5fr",
                borderRadius: "24px",
              }}
            >
              <div
                className="grid"
                style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1fr" }}
              >
                <div></div>
                <div className="flex justify-center items-center h-full">
                  친구목록
                </div>
                <div></div>
                {/* 친구 리스트 및 채팅창 닫기 */}
                <div className="flex justify-center items-center h-full">
                  <img
                    className="h-[50%] cursor-pointer"
                    src={require("../../assets/roomIcon/cancel.png")}
                    alt="exit"
                    onClick={() => {
                      dispatch(inviteMyFriend(false));
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center rounded-full bg-white h-[80%] border-2 border-stone-400">
                <input
                  className="w-[84%] h-full text-base text-black font-bold pl-3 "
                  style={{ borderRadius: "100% 0px 0px 100%" }}
                  type="text"
                />
                <div className="w-[5%]"></div>
                <div className="w-[11%] cursor-pointer">
                  <img
                    className="w-[1rem] h-[1rem]"
                    src={require("../../assets/mainIcon/search.png")}
                    alt=""
                  />
                </div>
              </div>
              <div
                className="grid h-full overflow-hidden "
                style={{ gridTemplateRows: "0.0fr 1fr 0.04fr" }}
              >
                <div className="flex justify-start items-center h-full text-white text-xs pl-2">
                  친한친구
                </div>
                <div className={`h-full overflow-scroll ${styles.hideScroll} `}>
                  {friendList}
                </div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default InviteFriend;
