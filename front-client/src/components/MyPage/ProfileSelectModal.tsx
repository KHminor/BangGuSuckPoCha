import { useEffect, useRef, useState } from "react";
import { changeMyPageProfile, showMyPageProfileSelect } from "src/store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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
        <div className="bg-slate-500 opacity-100  fixed top-[30rem] left-[18rem] h-[40%] w-[40%] border-[5px] border-white rounded-[10rem]">
          <div className="text-3xl text-white">
            {" "}
            프로필 이미지를 선택해주세요
          </div>
          <div className="flex flex-row">
            {profileList ? (
              <>
                {profileList.map((it: any) => {
                  return (
                    <div className="p-16 ">
                      <div
                        className="cursor-pointer  "
                        onClick={() => {
                          dispatch(changeMyPageProfile(profileList[0].src));
                          dispatch(showMyPageProfileSelect());
                        }}
                      >
                        <div>
                          <img
                            className="w-[5rem] rounded-full"
                            src={`${profileList[0].src}`}
                            alt="1번"
                          />
                        </div>
                        선택{" "}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSelectModal;
