import axios from "axios";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { isRtcLoading, showPublicModal, showRoomUserProfile } from "../../store/store";
import Loading from "../Common/Loading";
import RoomUserProfile from "../Common/RoomUserProfile";

const WebRTC = ({
  pochaId,
  propSocket,
  getPochaInfo
}: {
  pochaId: string;
  propSocket: Function;
  getPochaInfo: Function;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // webRTC관련
  const socket = io("https://pocha.online");
  // 나의 비디오 ref
  const myFace = useRef<HTMLVideoElement>(null);
  // 음소거 버튼
  const muteBtn = useRef<HTMLButtonElement>(null);
  // 카메라 온오프 버튼
  const cameraBtn = useRef<HTMLButtonElement>(null);
  // 카메라 선택 버튼
  const cameraSelect = useRef<HTMLSelectElement>(null);
  // 옵션 태그 리스트
  const [optionList, setOptionList] = useState<any[]>([]);
  // 사람수 체크 리스트(카메라 생성용);
  // const currentUsers = useRef<number[]>([1, 2, 3, 4, 5]);
  // 짠 카운트
  const [count, setCount] = useState<string>("");
  // 정보 변경 업데이트용 변수
  const [updateCheck, setUpdateCheck] = useState<boolean>(false);
  // const currentUsers = useRef<any>([1]);
  // useRef 배열
  // const peerFace = useRef<any>([]);
  const peerFace1 = useRef<any>(null);
  const peerFace2 = useRef<any>(null);
  const peerFace3 = useRef<any>(null);
  const peerFace4 = useRef<any>(null);
  const peerFace5 = useRef<any>(null);

  const myStream = useRef<any>(null);
  // let myStream: any;
  const roomName: any = pochaId;
  const myPeerConnections = useRef<any>({});
  // let myPeerConnections: any = {};
  // const [userCount, setUserCount] = useState<number>(1);
  const userCount = useRef<number>(1);

  // webRTC Loading 상태 가져옴
  const isLoading = useAppSelector((state) => {
    return state.webRtcLoading;
  });

  // 유저들 프로파일 모달 상태 가져옴
  const isRoomUserProfile = useAppSelector((state) => {
    return state.RoomUserProfileClickCheck;
  });

  // 요청한 유저프로필 데이터
  const [userProfileData, setUserProfileData] = useState(null);

  // 요청한 포차참여 유저들 데이터
  // const [pochaUsers, setPochaUsers] = useState<any>(null);

  // 포차 참여유저 데이터 axios 요청
  async function getUsersProfile() {
    console.log(pochaId);
    try {
      const {
        data: { data },
      } = await axios({
        url: `https://i8e201.p.ssafy.io/api/pocha/participant/${pochaId}`,
      });
      const lastIndex = data.length - 1;
      console.log("참여 유저들 데이터?", data);
      // setPochaUsers(data);
      dispatch(isRtcLoading(false));
      handleWelcomeSubmit(data[lastIndex]);
    } catch (error) {
      console.log("포차 참여유저 데이터 axios error", error);
    }
  }

  // 카메라 뮤트
  let muted = false;
  // 카메라 오프
  let cameraOff = false;
  // let userCount = 1;

  // 최초실행
  useEffect(() => {
    propSocket(socket);
    getUsersProfile();
  }, []);


  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      // const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera, index) => {
        // const option = React.createElement("option", 	{
        //   value = camera.deviceId,
        // },);
        // console.log('라벨',camera.label)
        const option: JSX.Element = (
          <option key={index} value={camera.deviceId}>
            {camera.label}
          </option>
        );
        // option.value = camera.deviceId;
        // option.innerText = camera.label;
        // if (currentCamera.id === camera.deviceId) {
        //   option.selected = true;
        // }
        // cameraSelect.current?.appendChild(option);
        setOptionList((prev) => [...prev, option]);
      });
    } catch (e) {
      console.log("0", e);
    }
  };

  async function getMedia(deviceId?: string) {
    let myStreamData;
    const initialConstraing = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraing: any = {
      audio: true,
      video: { deviceid: { exact: deviceId } },
    };
    try {
      if (deviceId) {
        myStreamData = await navigator.mediaDevices.getUserMedia(
          cameraConstraing
        );
        myStream.current = myStreamData;
        // setMyStream(myStreamData);
        // myStream = await navigator.mediaDevices.getUserMedia(cameraConstraing);
      } else {
        myStreamData = await navigator.mediaDevices.getUserMedia(
          initialConstraing
        );
        myStream.current = myStreamData;
        // setMyStream(myStreamData);
        // myStream = await navigator.mediaDevices.getUserMedia(initialConstraing);
      }
      console.log("마이스트림 오냐?", myStream.current);
      myFace.current!.srcObject = myStream.current;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log("마이스트림 에러", e);
    }
  }

  // 소리 끄는 함수
  function handleMuteClick() {
    myStream.current
      .getAudioTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (!muted) {
      muteBtn.current!.innerText = "Unmute";
    } else {
      muteBtn.current!.innerText = "Mute";
    }
    muted = !muted;
  }

  // 카메라 끄는 함수
  function handleCameraClick() {
    // console.log("꺼지냐", myStream)
    myStream.current
      .getVideoTracks()
      .forEach((track: any) => (track.enabled = !track.enabled));
    if (!cameraOff) {
      cameraBtn.current!.innerText = "Camera On";
    } else {
      cameraBtn.current!.innerText = "Camera Off";
    }
    cameraOff = !cameraOff;
  }

  // 카메라 바꿀때 옵션 변경했으니 getMedia 다시실행해준다(이제는 특정카메라id도 담아서 실행)
  async function handleCameraChange() {
    await getMedia(cameraSelect.current!.value);
    // 카메라 옵션 변경시 업데이트 코드
    myPeerConnections.current.forEach((myPeerConnection: any) => {
      if (myPeerConnection) {
        const videoTrack = myStream.current.getVideoTracks()[0];
        const videoSender = myPeerConnection
          .getSenders()
          .find((sender: any) => sender.track.kind === "video");
        videoSender.replaceTrack(videoTrack);
      }
    });
  }

  // muteBtn.addEventListener("click", handleMuteClick);
  // cameraBtn.addEventListener("click", handleCameraClick);
  // cameraSelect.addEventListener("input", handleCameraChange);

  // ---Welcome Form (join a room)---
  // const welcome = document.getElementById("welcome");
  // const welcomeForm = useRef<HTMLFormElement>(null);
  // const welcomeInput = useRef<HTMLInputElement>(null);

  // const peerFace1 = useRef<any>(null);
  // const peerFace2 = useRef<any>(null);
  // const peerFace3 = useRef<any>(null);

  // async function initCall() {
  //   // welcome.hidden = true;
  //   // call.hidden = false;

  // }

  async function handleWelcomeSubmit(userData: any) {
    // event : React.FormEvent<HTMLFormElement>
    // event.preventDefault();
    await getMedia();
    console.log("@@@@@@@@@@@@@@@@", userData);
    socket.emit("join_room", {
      roomName,
      username: userData.username,
      nickname: userData.nickname,
    });
    // roomName = welcomeInput.current?.value;
    // welcomeInput.current!.value = "";
  }

  // welcomeForm.addEventListener("submit", handleWelcomeSubmit);

  // ------ Socket Code ------
  // Socket Code
  socket.on("users_of_room", async (users) => {
    console.log("--------------------");
    await users.forEach((user: any) => {
      console.log(user);
      myPeerConnections.current[user.id] = {
        username: user.username,
        nickname: user.nickname,
      };
      console.log("방 입장--------------", myPeerConnections.current[user.id]);
    });

    console.log("방 입장--------------");
    // await pocha_config_update(3);
  });

  socket.on("welcome", async (socketId, user) => {
    let myPeer = makeConnection();

    myPeerConnections.current[socketId] = {
      peer: myPeer,
      username: user.username,
      nickname: user.nickname,
    };
    console.log("환영!!!!----------------------------", myPeerConnections.current[socketId]);

    const offer = await myPeerConnections.current[socketId][
      "peer"
    ].createOffer();
    myPeerConnections.current[socketId]["peer"].setLocalDescription(offer);

    const receivers =
      myPeerConnections.current[socketId]["peer"].getReceivers();
    const peerStream = new MediaStream([
      receivers[0].track,
      receivers[1].track,
    ]);
    handleAddStream(
      peerStream,
      myPeerConnections.current[socketId].username,
      myPeerConnections.current[socketId].nickname
    );
    console.log("sent the offer");

    socket.emit("offer", offer, socketId, roomName, {
      username: user.username,
      nickname: user.nickname,
    });
  });

  socket.on("offer", async (offer, socketId, userInfo) => {
    console.log("received the offer");
    myPeerConnections.current[socketId]["peer"] = makeConnection();
    myPeerConnections.current[socketId]["peer"].setRemoteDescription(offer);
    const answer = await myPeerConnections.current[socketId][
      "peer"
    ].createAnswer();

    myPeerConnections.current[socketId]["peer"].setLocalDescription(answer);
    const receivers =
      myPeerConnections.current[socketId]["peer"].getReceivers();
    const peerStream = new MediaStream([
      receivers[0].track,
      receivers[1].track,
    ]);
    handleAddStream(
      peerStream,
      myPeerConnections.current[socketId].username,
      myPeerConnections.current[socketId].nickname
    );

    socket.emit("answer", answer, socketId, roomName);
    console.log("sent the answer");
  });

  socket.on("answer", (answer, socketId) => {
    console.log("received the answer");
    myPeerConnections.current[socketId]["peer"].setRemoteDescription(answer);
  });

  socket.on("ice", (ice, socketId) => {
    console.log("received the candidate");
    if (
      myPeerConnections.current[socketId]["peer"] === null ||
      myPeerConnections.current[socketId]["peer"] === undefined
    ) {
      return;
    }
    myPeerConnections.current[socketId]["peer"].addIceCandidate(ice);
  });

  socket.on("user_exit", ({ id }) => {
    delete myPeerConnections.current[id];
    // 사람수 - 2 해야 마지막인덱스값
    // const lastIndex = userCount.current - 2;
    // const lastIndex = userCount - 2
    // peerFace.current[lastIndex].classList.toggle("hidden");

    console.log("==============>방 탈출!!!");
    console.log(id);

    // userCount = 1;
    // setUserCount(1);
    userCount.current = 1;
    // setUserCount(1);

    const keys = Object.keys(myPeerConnections.current);
    for (let socketID of keys) {
      console.log("---------");
      console.log(myPeerConnections.current[socketID]);
      // console.log(myPeerConnections.current[socketID].getReceivers());
      console.log("---------");
      const receivers =
        myPeerConnections.current[socketID]["peer"].getReceivers();
      const peerStream = new MediaStream([
        receivers[0].track,
        receivers[1].track,
      ]);
      handleAddStream(
        peerStream,
        myPeerConnections.current[socketID].username,
        myPeerConnections.current[socketID].nickname
      );
    }

    console.log(userCount + "==================");
    let temp = userCount.current;
    // let temp = userCount;
    if (temp < 6) {
      while (temp < 6) {
        // peerFace.current[temp - 1].srcObject = null;
        // if (temp === 1) {
        //   peerFace.current[0].srcObject = null;
        // } else if (temp === 2) {
        //   peerFace.current[1].srcObject = null;
        // } else if (temp === 3) {
        //   peerFace.current[2].srcObject = null;
        // }
        if (temp === 1) {
          peerFace1.current.srcObject = null;
        } else if (temp === 2) {
          peerFace2.current.srcObject = null;
        } else if (temp === 3) {
          peerFace3.current.srcObject = null;
        } else if (temp === 4) {
          peerFace4.current.srcObject = null;
        } else if (temp === 5) {
          peerFace5.current.srcObject = null;
        }
        temp += 1;
      }
    }
  });

  socket.on("room_full", () => {
    toast.info("응 풀방이야~");
    navigate(`/main`);
    // location.href = "http://localhost:3000";
  });

  // ------------ 포차 기능 code --------------
  const ssulTitle = useRef<HTMLDivElement>(null);
  const [ssul, setSsul] = useState<string>("");

  //  axios
  const api = axios.create({
    baseURL: "https://i8e201.p.ssafy.io/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  async function pocha_config_update(pochaId: string) {
    // 방 설정 다시 불러오기!!! 테스트
    let pochaInfo = {};
    try {
      await api.get(`/pocha/${pochaId}`).then((result) => {
        pochaInfo = result.data.data;
      });
      console.log(pochaInfo);
    } catch (error) {
      console.log("방설정 다시불러오기 error", error);
    }
  }

  // 썰 변경! : 방 설정 다시 불러오기.
  socket.on("ssul_change", async (ssul) => {
    console.log("썰 변경!----------------------");
    setSsul(ssul);
    // 방 설정 다시 불러오기!!! 테스트
    // await pocha_config_update("3");
  });

  // 포차 설정 변경! : 방 설정 다시 불러오기.
  socket.on("pocha_change", async () => {
    console.log("포차 설정 변경!----------------------");
    // setUpdateCheck((prev) => !prev);
    getPochaInfo();
    toast.success("포차 정보가 변경되었습니다");
    // 방 설정 다시 불러오기!!! 테스트
    // await pocha_config_update("3");
  });

  // 포차 시간 연장! : 방 설정 다시 불러오기.
  socket.on("pocha_extension", async () => {
    console.log("포차 시간 연장!----------------------");
    // 방 설정 다시 불러오기!!! 테스트
    // await pocha_config_update("3");
  });


  // 포차 짠 함수
  const jjan = () => {
    let time: number = 3;
    setCount(String(time));
    const interval = setInterval(() => {
      time -= 1;
      setCount(String(time));
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      setCount("짠!!!!");
    }, 3900);
    setTimeout(() => {
      setCount("");
      dispatch(showPublicModal(false));
    }, 5000);
  };
  // 포차 짠! 기능 : 방 설정 다시 불러오기.
  socket.on("pocha_cheers", async () => {
    console.log("포차 짠!!!!!------------ㅇ----------");
    jjan();
    // 방 설정 다시 불러오기!!! 테스트
    // await pocha_config_update("3");
  });

  // ------------- RTC Code --------------
  function makeConnection() {
    let myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", handleIce);
    //myPeerConnection.addEventListener("addstream", handleAddStream);
    myStream.current.getTracks().forEach((track: any) => {
      myPeerConnection.addTrack(track, myStream.current);
    });
    return myPeerConnection;
  }

  // icecandidate 이벤트시 실행 함수
  function handleIce(data: any) {
    console.log("sent candidate");
    // icecandidate를 만들면 이걸 또 서버로 보내줌
    socket.emit("ice", data.candidate, roomName);
  }

  // addStream 이벤트시 실행 함수
  function handleAddStream(stream: any, username: string, nickname: string) {
    console.log("handleAddStream---------------------", username);
    const indexData = userCount.current;
    // const indexData = userCount;
    // peerFace.current[indexData - 1].classList.toggle("hidden");
    // peerFace.current[indexData - 1].srcObject = stream;
    console.log("사람수ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ", indexData);
    // if (userCount.current === 1) {
    //   peerFace.current[0].srcObject = data.stream;
    // } else if (userCount.current === 2) {
    //   peerFace.current[1].srcObject = data.stream;
    // } else if (userCount.current === 3) {
    //   peerFace.current[2].srcObject = data.stream;
    // }
    if (userCount.current === 1) {
      peerFace1.current.srcObject = stream;
      peerFace1.current.id = username;
      console.log('비디오 아이디 유저네임1', username);
    } else if (userCount.current === 2) {
      peerFace2.current.srcObject = stream;
      peerFace2.current.id = username;
      console.log('비디오 아이디 유저네임2', username);
    } else if (userCount.current === 3) {
      peerFace3.current.srcObject = stream;
      peerFace3.current.id = username;
      console.log('비디오 아이디 유저네임3', username);
    } else if (userCount.current === 4) {
      peerFace4.current.srcObject = stream;
      peerFace4.current.id = username;
    } else if (userCount.current === 5) {
      peerFace5.current.srcObject = stream;
      peerFace5.current.id = username;
    }

    // console.log("여기 오ㅗㅗㅗㅗㅗㅗㅗㅗㅗ냐?", userCount.current);
    // peerFace.current.srcObject = data.stream;
    // userCount += 1;
    // setUserCount((prev) => prev + 1);
    userCount.current += 1;

    // currentUsers.current.push(1);
    // dispatch(isRtcLoading());
  }

  // 유저들 프로파일 모달 띄우기
  const ShowUserProfile = async (event: React.MouseEvent<any>) => {
    const username = event.currentTarget.id;
    console.log("모달용 데이터 닉?", peerFace2.current.id);
    const { data } = await axios({
      url: `https://i8e201.p.ssafy.io/api/user/info/${username}`,
    });
    console.log("모달용 데이터?", data);
    setUserProfileData(data);
    // dispatch(isRtcLoading(false));
    dispatch(showRoomUserProfile());
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isRoomUserProfile && userProfileData && (
            <RoomUserProfile userData={userProfileData} pochaId={pochaId} />
          )}
          {count && (
            <div className="bg-orange-500 bg-opacity-30 flex justify-center z-20 items-center fixed top-0 right-0 bottom-0 left-0">
              <div className="text-7xl font-bold text-white">{count}</div>
            </div>
          )}
          <div className="text-white">
            <span
              className="font-bold text-3xl fixed left-0 right-0 top-10"
              ref={ssulTitle}
            >{`:: ${ssul} ::`}</span>
            <div className="flex flex-wrap justify-evenly items-center p-24">
              {/* 내 비디오 공간 */}
              <video
                className="w-[30rem] h-80 py-3"
                ref={myFace}
                playsInline
                autoPlay
              ></video>
              {/* 다른 사람들 비디오 공간 */}
              {/* {currentUsers.current.map((vide: number, index: number) => {
          return (
            <video
              key={index}
              className="w-[30rem] h-80 py-3"
              ref={(element) => (peerFace.current[index] = element)}
              playsInline
              autoPlay
            ></video>
          );
        })} */}
              <video
                onClick={ShowUserProfile}
                className="w-[30rem] h-80 py-3 cursor-pointer"
                ref={peerFace1}
                playsInline
                autoPlay
              ></video>
              <video
                onClick={ShowUserProfile}
                className="w-[30rem] h-80 py-3 cursor-pointer"
                ref={peerFace2}
                playsInline
                autoPlay
              ></video>
              <video
                onClick={ShowUserProfile}
                className="w-[30rem] h-80 py-3 cursor-pointer"
                ref={peerFace3}
                playsInline
                autoPlay
              ></video>
              <video
                onClick={ShowUserProfile}
                className="w-[30rem] h-80 py-3 cursor-pointer"
                ref={peerFace4}
                playsInline
                autoPlay
              ></video>
              <video
                onClick={ShowUserProfile}
                className="w-[30rem] h-80 py-3 cursor-pointer"
                ref={peerFace5}
                playsInline
                autoPlay
              ></video>
            </div>
            <div className="flex w-fit">
              {/* 뮤트 */}
              <button
                className="border-2 px-3"
                onClick={handleMuteClick}
                ref={muteBtn}
              >
                Mute
              </button>
              {/* 카메라 */}
              <button
                className="border-2 px-3"
                onClick={handleCameraClick}
                ref={cameraBtn}
              >
                Camera Off
              </button>
              {/* 카메라 옵션 */}
              <select
                className="text-black"
                onInput={handleCameraChange}
                ref={cameraSelect}
              >
                {optionList}
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WebRTC;
