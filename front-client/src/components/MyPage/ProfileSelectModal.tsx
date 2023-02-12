import { useEffect, useRef, useState } from "react";
import { changeMyPageProfile, showMyPageProfileSelect } from "src/store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "../Common/Common.module.css";
const ProfileSelectModal = ({ profileData }: { profileData: any }) => {
  const dispatch = useAppDispatch();
  const [profileList, setProfileList] = useState<any>();

  //백그라운드 div
  const bgDiv = useRef<any>();

  // 프로필선택 모달 끄는 함수
  function CloseProfileImgSelectModal(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === bgDiv.current) {
      console.log("프로필선택창꺼짐!");
      dispatch(showMyPageProfileSelect());
    }
  }

  useEffect(() => {
    // console.log(profileData.img);
    setProfileList(profileData.img);
    // console.log("마운트 이전 ㄱㄱ");
  });

  return (
    <>
      <div
        ref={bgDiv}
        onMouseDown={CloseProfileImgSelectModal}
        className={
          " z-10 bg-slate-800 bg-opacity-0 fixed top-0 right-0 bottom-0 left-0 flex flex-col text-white"          

        }
        
      >
        <div className="bg-black  fixed top-[30rem] left-[18rem] h-[40%] w-[40%] border-[5px] border-neutral-700 rounded-[2rem]">
          <div className={`text-3xl text-white opacity-90 ${styles.friendName} ${styles.friendRequestName}`}>
            프로필 이미지를 선택해주세요
          </div>
          <div className="flex flex-col pt-6 pl-12 pr-10">
            {profileList ? (
              <>
                <div className="flex flex-row">
                  <div className={`w-[8rem] h-[8rem] p-5 `}>
                    <div
                      className="cursor-pointer  rounded-full  "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[0].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[0].src}`}
                        alt="1번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[1].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[1].src}`}
                        alt="2번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[2].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[2].src}`}
                        alt="3번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[3].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[3].src}`}
                        alt="4번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[4].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[4].src}`}
                        alt="5번"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[5].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[5].src}`}
                        alt="6번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[6].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[6].src}`}
                        alt="7번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[7].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[7].src}`}
                        alt="8번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[8].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[8].src}`}
                        alt="9번"
                      />
                    </div>
                  </div>
                  <div className="w-[8rem] h-[8rem] p-5">
                    <div
                      className="cursor-pointer  rounded-full "
                      onClick={() => {
                        dispatch(changeMyPageProfile(profileList[9].src));
                        dispatch(showMyPageProfileSelect());
                      }}
                    >
                      <img
                        className="rounded-full"
                        src={`${profileList[9].src}`}
                        alt="10번"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSelectModal;
