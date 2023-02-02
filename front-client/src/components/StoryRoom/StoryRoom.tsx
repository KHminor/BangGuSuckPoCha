import RoomfooterNav from "../Common/RoomfooterNav";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { showRoomUserProfile } from "../../store/store";
import RoomUserProfile from "../Common/RoomUserProfile";
import Loading from "../Common/Loading";
import styles from "./StoryRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function StoryRoom(): JSX.Element {
  const dispatch = useAppDispatch();
  // 로딩상태 체크
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 요청한 유저프로필 데이터 잘왔는지 체크
  const [userProfileData, setUserProfileData] = useState(null);
  const username = "DnXrE8Ea860Euv_LONqQyz4pnK86XrDd0YinVdBAaeA";

  // 안에 유저들 프로파일 모달 상태 가져옴
  const isRoomUserProfile = useAppSelector((state) => {
    return state.RoomUserProfileClickCheck;
  });
  // 유저들 프로파일 모달 띄우기
  const ShowUserProfile = () => {
    dispatch(showRoomUserProfile());
  };
  // 유저 데이터 axios 요청
  const getUserProfile = async () => {
    const { data } = await axios({
      url: `https://i8e201.p.ssafy.io/api/user/info/${username}`,
    });
    setUserProfileData(data);
    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isRoomUserProfile && <RoomUserProfile userData={userProfileData} />}
          <div
            className={`w-screen h-screen grid ${styles.gameroomimg}`}
            style={{ gridTemplateRows: "0.07fr 1fr 0.12fr" }}
          >
            {/* 빈 공간 */}
            <div></div>
            {/* 화면 및 게임 공간 */}
            <div
              className="grid h-full"
              style={{ gridTemplateRows: "1fr 1fr" }}
            >
              <div className="flex justify-center items-center h-[85%] w-[97%] mx-auto  my-auto ">
                <div
                  onClick={ShowUserProfile}
                  className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-red-300"
                ></div>
                <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-green-300"></div>
                <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-blue-300"></div>
              </div>
              <div className="flex justify-center items-center h-[90%] w-[97%] mx-auto  my-auto ">
                <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-red-300"></div>
                <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-green-300"></div>
                <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-blue-300"></div>
              </div>
            </div>
            {/* footerNav */}
            <RoomfooterNav />
          </div>
        </>
      )}
    </>
  );
}
export default StoryRoom;
