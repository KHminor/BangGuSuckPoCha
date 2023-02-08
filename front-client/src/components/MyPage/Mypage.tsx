import axios from "axios";
import { time } from "console";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { changeMyPageCheck } from "src/store/store";
import Navbar from "../Common/Navbar";
import NavbarAlarm from "../Common/NavbarAlarm";
import NavbarMenu from "../Common/NavbarMenu";
import regionList from "./regionList";
// import regionOneList from "./regionOneList";

function Mypage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [Selected, setSelected] = useState();

  const handleSelect = (e: any) => {
    console.log("e의 타겟밸류ㅠㅠㅠㅠ", e.target.value)
    setSelected(e.target.value);
  };
  const [modifydisplay, setModifydisplay] = useState(false);
  //바뀔이름
  const [nickname, setNickname] = useState();
  //이름
  const [nowName, setNowName] = useState();
  //생일
  const [birth, setBirth] = useState<any | null>("0000.00.00");
  //성별
  const [gender, setGender] = useState();
  //본인만나이
  const [age, setAge] = useState<any | null>();
  //본인 지역
  const [region, setRegion] = useState("지역 구");
  //포인트
  const [point, setPoint] = useState();
  //자기소개
  const [comment, setComment] = useState();
  //매너온도
  const [manner, setManner] = useState();
  //프로필경로
  const [profile, setProfile] = useState("string");

  // //regionList(하드코딩으로 넣은 지역코드)에서 들고오는 지역코드 앞에서 2자리
  // const [regionfirst, setRegionfirst] = useState<any | null>("");
  // //내 정보 중 지역의 첫번째 구분
  // const [firstselect, setFirstselect]: any = useState<any | null | undefined>();
  // //내 지역의 두번쨰 구분이 있으면 두번째
  // const [secondselect, setSecondselect] = useState<any | null>();

  //내정보 지역코드
  const [regioncode, setRegioncode] = useState();
  //지역코드 전체 목록(시도)
  const [regionlist, setRegionlist] = useState<any | null>();
  //지역코드 전체 목록(구군)
  const [regionlist2, setRegionlist2] = useState<any | null>();
  const Username: any = localStorage.getItem("Username");

  const onChangeNikename = (event: any) => {
    // console.log(event.target.value);
    setNickname(event.target.value);
  };
  const onChangeComment = (event: any) => {
    // console.log(event.target.value);
    setComment(event.target.value);
  };
  // console.log("firstselect값", firstselect);
  // console.log("secondselect값이 undifine?", secondselect === undefined);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://i8e201.p.ssafy.io/api/user/myinfo/${Username}`,
    }).then((r) => {
      console.log("내정보 : ");
      console.log(r.data.data);
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
      setRegioncode(a.regionCode);
      // let firstselecttemp: any;
      // if (a.region.split(" ").length === 2) {
      //   // firstselecttemp = regionList.name.filter(
      //   //   (param) => param.name === `${a.region.split(" ")[0]}`
      //   // );
      //   // console.log("firstselecttemp", firstselecttemp);
      //   //내 정보 중 지역의 첫번째 구분
      //   setFirstselect(a.region.split(" ")[0]);
      //   console.log("firstselect값", firstselect);
    
      //   //내 정보 중 지역의 두번째 구분
      //   setSecondselect(a.region.split(" ")[1]);
      //   console.log("secondselect값", secondselect);
      // } else if (a.region.split(" ").length === 1) {
      //   setFirstselect(a.region.split(" ")[0]);
      //   // console.log("secondselect값이 undifine?", secondselect==="undefined");
      // }
    
      setComment(a.comment);
      setPoint(a.point);
      setManner(a.manner.toFixed(1));
      setProfile(a.profile);
    });
    
    axios({
      method: "get",
      url: "https://i8e201.p.ssafy.io/api/admin/region",
    }).then((r) => {
      const result = r.data.data;
      // console.log(r.data.data);
      // console.log("모든지역코드", result);
    
      // setRegionlist(result);
      // console.log("지역코드목록 저장", result);
      let rlist1 = new Array();
      let rlist2 = new Array();
      for (var i = 0; i < result.length; i++) {
        // console.log("test", result[i]);
        // console.log(`${i} 조건 확인?`, result[i].regionCode.substr(0, 1));
        if (i === 0) {
          rlist1.push(result[i]);
        } else {
          console.log(`${i}번쨰 비교`,result[i-1].regionCode.substr(0, 2) ===
          result[i].regionCode.substr(0, 2))
          if (
            result[i-1].regionCode.substr(0, 2) ===
            result[i].regionCode.substr(0, 2)
          ) {
            rlist2.push(result[i]);
          } else {
            rlist1.push(result[i]);
          }
        }
      }
      setRegionlist(rlist1);
      setRegionlist2(rlist2);
      console.log("rlist1---------------------", rlist1);
      console.log("rlist2---------------------", rlist2);
      // let result2600000000 = result.filter(
      //   (param: any) => param.regionCode.substr(0, 2) === "41"
      // );
      // console.log("setRegionfirst", regionList.name);
      // setRegionfirst(regionList.name);
      // // console.log(region);
    });

  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div
          className="grid w-screen h-screen font-nanum "
          style={{ gridTemplateRows: "11rem 1fr 0.1fr" }}
        >
          <div className="h-48"></div>
          <div
            className="grid w-full "
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
                  src={require("../../assets/profile/icon_0001.png")}
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
                      // if (isDouble) {
                      //   toast.success(
                      //     `${nickname}(은)는 수정가능한 닉네임입니다`
                      //   );
                      //   setModifydisplay(isDouble);
                      // } else {
                      //   toast.warning(`${nickname}(은)는 중복된 닉네임입니다`);
                      //   setModifydisplay(isDouble);
                      // }
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
                      
                      <select className="text-white text-[1rem] text-center bg-black border-2  overflow-auto " onChange={handleSelect} value={Selected}>
                        {regionlist
                          ? regionlist.map((it: any): any => (
                              <option value={it.regionCode}>
                                {it.sidoName}
                              </option>
                            ))
                          : null}
                      </select>
                      


                      {regionlist2 === undefined ? null : (
                        <select
                          className="text-white text-[1rem] text-center bg-black h-full border-2"
                          name="address2"
                          id="address2"
                        >
                          {/* {regionlist2.map((it: any): any => (
                            {Selected.substr(0, 1) === it.regionCode.substr(0, 1) ? 
                            <option value={it.regionCode}>
                              {it.gugunName}
                            </option>:null}
                          ))} */}
                        </select>
                      )}
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
                          // toast.success("수정에 성공하셨습니다");
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
      </div>
    </>

  );
}
export default Mypage;
