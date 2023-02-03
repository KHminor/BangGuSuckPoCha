import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { changeMyPageCheck } from "src/store/store";
import Navbar from "../Common/Navbar";
import NavbarAlarm from "../Common/NavbarAlarm";
import NavbarMenu from "../Common/NavbarMenu";

function Mypage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modifydisplay, setModifydisplay] = useState(false);
  const [nickname, setNickname] = useState();
  const [nowName, setNowName] = useState();
  const [birth, setBirth] = useState<any | null>("0000.00.00");
  const [gender, setGender] = useState();
  const [age, setAge] = useState<any | null>();
  const [region, setRegion] = useState();
  const [point, setPoint] = useState();
  const [comment, setComment] = useState();
  const [manner, setManner] = useState();
  const [profile, setProfile] = useState("string");
  const Username: any = localStorage.getItem("Username");
  const onChangeNikename = (event: any) => {
    // console.log(event.target.value);
    setNickname(event.target.value);
  };
  const onChangeComment = (event: any) => {
    // console.log(event.target.value);
    setComment(event.target.value);
  };

  useEffect(() => {
    // console.log(Username);
    axios({
      method: "get",
      url: `https://i8e201.p.ssafy.io/api/user/myinfo/${Username}`,
    }).then((r) => {
      // console.log(r.data.data);
      //data내용
      let a = r.data.data;
      setNickname(a.nickname);
      setNowName(a.nickname);
      const birth = a.birth;
      setGender(a.gender);
      const today = new Date();

      const birthDate = new Date(
        birth.split(".")[0],
        birth.split(".")[1],
        birth.split(".")[2]
      );
      let age = today.getFullYear() - birthDate.getFullYear();
      // console.log("age1 : " + age);
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      // console.log("age2 : " + age);
      setBirth(birth);
      setAge(age);
      setRegion(a.region);
      setComment(a.comment);
      setPoint(a.point);
      setManner(a.manner);
      setProfile(a.profile);
    });

    axios({
      method: "get",
      url: "https://i8e201.p.ssafy.io/api/admin/region",
    }).then((r) => {
      console.log(r.data.data);
    });
  }, []);
  // console.log(birth);
  return (
    <div
      className="grid w-screen h-screen font-nanum"
      style={{ gridTemplateRows: "11rem 1fr 0.1fr" }}
    >
      <Navbar />
      <div
        className="grid h-full w-full "
        style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
      >
        <div className="bg-black "></div>
        {/* 회원 정보 */}
        <div
          className="grid h-full border-white border-4 border-opacity-40"
          style={{
            gridTemplateRows: "1.7fr 0.7fr 4.2fr 0.9fr 1.3fr",
            borderRadius: "24px 24px 24px 24px",
          }}
        >
          {/* 이모지 및 변경 아이콘 */}
          <div className="flex justify-center items-end h-full">
            <img
              className="h-[9rem] w-[9rem] ml-6 rounded-full"
              style={{ objectFit: "contain" }}
              src={require("../../assets/myPage/png4.png")}
              alt=""
            />
            <img
              className="h-[1.5rem] w-[1.5rem]"
              style={{ objectFit: "contain" }}
              src={require("../../assets/myPage/settings.png")}
              alt=""
            />
          </div>
          {/* 닉네임 */}
          <div className="grid grid-cols-7 flex justify-center items-center ">
            <div></div>
            <div></div>
            <input
              className="col-span-3 text-center rounded-lg text-lg w-[80%] h-[60%] mx-auto my-auto bg-black caret-white"
              placeholder={nickname}
              type="text"
              onChange={onChangeNikename}
            />
            <div
              className="right-7 w-[100%] border-white border-2 text-white cursor-pointer"
              onClick={() => {
                console.log(nickname);
                console.log(nowName);
                axios({
                  method: "post",
                  url: `https://i8e201.p.ssafy.io/api/user/auth/check/nickname`,
                  data: {
                    changeName: nickname,
                    nowName: nowName,
                  },
                }).then((r) => {
                  const isDouble = r.data.data;
                  if (isDouble) {
                    toast.success(`${nickname}(은)는 수정가능한 닉네임입니다`);
                    setModifydisplay(isDouble);
                  } else {
                    toast.warning(`${nickname}(은)는 중복된 닉네임입니다`);
                    setModifydisplay(isDouble);
                  }
                });
              }}
            >
              중복확인
            </div>
            <div></div>
          </div>
          {/* 정보 */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* 나이, 생일, 매너온도 */}
            <div
              className="grid  w-full h-full"
              style={{ gridTemplateRows: "1fr 1fr 1fr" }}
            >
              {/* 나이 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  나이
                </div>
                <div
                  className="grid  border-purple-300 w-[90%] mr-[10%]"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                    {age}
                  </div>
                </div>
              </div>
              {/* 생일 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  생일
                </div>
                <div
                  className="grid  border-purple-300 w-[90%] mr-[10%]"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                    {birth.split(".")[1]}월 {birth.split(".")[2]}일
                  </div>
                </div>
              </div>
              {/* 매너온도 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  매너온도
                </div>
                <div
                  className="grid  border-purple-300 w-[90%] mr-[10%]"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                    {manner} ℃
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            {/* 성별, 지역, 포인트 */}
            <div
              className="grid  w-full h-full"
              style={{ gridTemplateRows: "1fr 1fr 1fr" }}
            >
              {/* 성별 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  성별
                </div>
                {gender === "F" ? (
                  <div
                    className="grid  border-purple-300 w-[90%] mr-[10%]"
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                      여
                    </div>
                  </div>
                ) : (
                  <div
                    className="grid  border-purple-300 w-[90%] mr-[10%]"
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                  >
                    <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                      남
                    </div>
                  </div>
                )}
              </div>
              {/* 지역 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  지역
                </div>
                <div
                  className="grid  border-purple-300 w-[90%] mr-[10%]"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  <select
                    className="text-white text-[1rem] text-center bg-black h-full border-2"
                    name="address1"
                    id="address1"
                  >
                    <option value="20">부산광역시</option>
                  </select>
                  <select
                    className="text-black text-[1rem] text-center bg-white h-full border-2"
                    name="address2"
                    id="address2"
                  >
                    <option value="20" disabled>
                      ALL
                    </option>
                  </select>
                </div>
              </div>
              {/* 포인트 */}
              <div
                className="grid  w-full h-[40%] my-auto "
                style={{ gridTemplateColumns: "1.2fr 2fr" }}
              >
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">
                  포인트
                </div>
                <div
                  className="grid w-[90%] mr-[10%]"
                  style={{ gridTemplateColumns: "1fr 1fr" }}
                >
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">
                    {point}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          {/* 자기소개 */}
          <div
            className="grid w-full h-[100%] "
            style={{ gridTemplateColumns: "0.45fr 2fr" }}
          >
            <div className="flex justify-start items-center text-white text-[1.4rem] font-bold  h-[100%] w-full pl-[1rem]">
              자기소개
            </div>
            <input
              className="flex justify-start items-center text-white text-[1rem] text-center my-auto bg-black h-[70%] w-[95.8%] border-2 caret-white"
              placeholder={comment}
              type="text"
              onChange={onChangeComment}
            />
          </div>
          {/* Navfooter */}
          <div className="flex justify-center items-end h-full w-full">
            <div
              className="grid h-[70%] w-[40%] border-2 border-white border-b-0 "
              style={{
                gridTemplateColumns: "1fr 1fr",
                border: "solid 2px white",
                borderBottom: "solid 0px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div
                className="flex flex-col justify-end items-center w-[80%] h-full mx-auto cursor-pointer "
                onClick={() => {
                  navigate("/main");
                }}
              >
                <img
                  className="h-[2.5rem]"
                  src={require("../../assets/myPage/back.png")}
                  alt=""
                />
                <span className="text-white my-1">뒤로가기</span>
              </div>
              {/*
               수정버튼 
               modifydisplay : true => display
               modifydisplay : false => display
                */}
              {modifydisplay === true ? (
                <div
                  className="flex flex-col justify-end items-center w-[80%] h-full mx-auto cursor-pointer"
                  onClick={() => {
                    console.log("modifydisplay : " + modifydisplay);
                    console.log(nickname);
                    console.log(nowName);
                    //수정가능
                    axios({
                      method: "put",
                      url: `https://i8e201.p.ssafy.io/api/user/${Username}`,
                      data: {
                        comment: comment,
                        nickname: nickname,
                        profile: profile,
                        regionCode: "4111000000",
                      },
                    }).then((r) => {
                      console.log("성공");
                      toast.success("수정에 성공하셨습니다");
                      navigate("/main");
                    });
                  }}
                >
                  <img
                    className="h-[2.5rem]"
                    src={require("../../assets/myPage/save.png")}
                    alt=""
                  />
                  <span className="text-white my-1">수정</span>
                </div>
              ) : (
                <div className="opacity-50 flex flex-col justify-end items-center w-[80%] h-full mx-auto">
                  <img
                    className="h-[2.5rem]"
                    src={require("../../assets/myPage/save.png")}
                    alt=""
                  />
                  <span className="text-white my-1">수정</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-black ">3</div>
      </div>
      {/* 메뉴 클릭시 보이기 */}
      <NavbarMenu />
      {/* 알림 클릭시 보이기 */}
      <NavbarAlarm />
    </div>
  );
}
export default Mypage;
