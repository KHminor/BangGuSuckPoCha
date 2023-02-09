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
        className={`z-10 bg-slate-800 bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex flex-row justify-center items-center text-white`}
      >
        {profileList ? (
          <>
            <div className="">
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
              <div className="p-16">
                <div
                  className="cursor-pointer  "
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[1].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[1].src}`}
                      alt="2번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
            </div>
            <div>
              <div className="p-16">
                <div
                  className="cursor-pointer "
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[2].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[2].src}`}
                      alt="1번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
              <div className="p-16">
                <div
                  className="cursor-pointer "
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[3].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[3].src}`}
                      alt="2번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
            </div>
            <div>
              <div className="p-16">
                <div
                  className="cursor-pointer  "
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[4].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[4].src}`}
                      alt="1번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
              <div className="p-16">
                <div
                  className="cursor-pointer  "
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[5].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[5].src}`}
                      alt="2번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
            </div>
            <div>
              <div className=" p-16">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[6].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[6].src}`}
                      alt="1번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
              <div className=" p-16">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[7].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[7].src}`}
                      alt="2번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
            </div>
            <div>
              <div className=" p-16">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[8].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[8].src}`}
                      alt="1번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
              <div className=" p-16">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(changeMyPageProfile(profileList[9].src));
                    dispatch(showMyPageProfileSelect());
                  }}
                >
                  <div>
                    <img
                      className="w-[5rem] rounded-full"
                      src={`${profileList[9].src}`}
                      alt="2번"
                    />
                  </div>
                  선택{" "}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {console.log("나등장!")}
    </>
  );
};

export default ProfileSelectModal;
