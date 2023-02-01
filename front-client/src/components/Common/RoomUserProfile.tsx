import { useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { showRoomUserProfile } from "../../store/store";

const RoomUserProfile = ({ userData }: { userData: any }) => {
  let dispatch = useAppDispatch();
  let { manner, gender, birth, region } = userData.data;

  // 유저 정보 데이터 재가공 함수
  const userDataReBuild = () => {
    const date: any = new Date();
    // 성별 데이터 다시 가공
    if (gender === "F") {
      gender = "여자";
    } else if (gender === "M") {
      gender = "남자";
    }
    // 연령 데이터 다시 가공
    const ageGroup = date.getFullYear() - Number(birth.substr(0, 4));
    if (ageGroup < 30) {
      birth = "20대";
    } else {
      birth = "30대";
    }
  };
  userDataReBuild();

  // 유저 정보
  const userInfosData = [manner, gender, birth, region];
  // 백그라운드 div
  const bgDiv = useRef<any>();

  // 프로필 모달 끄는 함수
  function CloseProfileModal(event: any) {
    if (event.target === bgDiv.current) {
      console.log("프로필꺼짐!");
      dispatch(showRoomUserProfile());
    }
  }

  // 유저 중간 정보관련 등
  const userInfoImages = [
    require("../../assets/myPage/temprature.png"),
    require("../../assets/myPage/gender.png"),
    require("../../assets/myPage/age.png"),
    require("../../assets/myPage/place.png"),
  ];
  const infoColors = [
    "text-red-500",
    "text-orange-500",
    "text-green-500",
    "text-blue-500",
  ];

  // 유저 아래 친추, 강퇴, 신고하기 등
  const userInfoFootIcons = [
    require("../../assets/roomIcon/add-user.png"),
    require("../../assets/roomIcon/exclamation-mark.png"),
    require("../../assets/roomIcon/report.png"),
  ];
  const userInfoFootTitle = ["친구신청", "강퇴하기", "신고하기"];

  return (
    <div
      ref={bgDiv}
      onMouseDown={CloseProfileModal}
      className={`bg-black bg-opacity-90 fixed w-full h-full text-white`}
    >
      <div
        className={`min-w-[25rem] bg-black w-[25%] px-10 py-10 rounded-3xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className={`w-full h-40 flex justify-center items-center`}>
          <img
            className={`h-full`}
            src={require("../../assets/myPage/sunglassEmoji.png")}
            alt="sunglass"
          />
        </div>
        <div className={`w-full h-20 text-4xl font-bold`}>
          <div>나는야핑크빈</div>
        </div>
        <div className={`w-full h-10 text-lg`}>
          #ISFP #자바칩모카 #스파이패밀리
        </div>
        <div className={`flex h-32 my-16 justify-evenly`}>
          {userInfosData.map((info, index) => {
            return (
              <div className={`w-1/4 h-3/5 flex-col`}>
                <img
                  className={`block mx-auto h-4/5`}
                  src={userInfoImages[index]}
                  alt={`${info} image`}
                />
                {/* <div className="text-base">{info}</div> */}
                <div className={`text-xl my-3 font-bold ${infoColors[index]}`}>
                  {info}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`flex h-20 p-2 justify-evenly border rounded-lg`}>
          {userInfoFootTitle.map((info, index) => {
            return (
              <div className={`w-1/4 h-full flex-col`}>
                <div
                  className={`w-full h-3/4 flex justify-center items-center`}
                >
                  <img
                    className={`h-3/4`}
                    src={userInfoFootIcons[index]}
                    alt={info}
                  />
                </div>
                <div className="text-sm">{info}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomUserProfile;
