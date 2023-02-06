import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { isRtcLoading } from "../../store/store";
import Loading from "../Common/Loading";

const WebRTC = ({ pochaId }: { pochaId: string }) => {
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
  const currentUsers = useRef<number[]>([1, 2, 3, 4, 5]);
  // const currentUsers = useRef<any>([1]);
  // useRef 배열
  const peerFace = useRef<any>([]);

  const myStream = useRef<any>(null);
  // let myStream: any;
  const roomName: any = pochaId;
  const myPeerConnections = useRef<any>({});
  // let myPeerConnections: any = {};
  // const [userCount, setUserCount] = useState<number>(1);
  const userCount = useRef<number>(1);
  // 카메라 뮤트
  let muted = false;
  // 카메라 오프
  let cameraOff = false;
  // let userCount = 1;

  useEffect(() => {
    handleWelcomeSubmit();
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
      console.log("1", e);
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
      cameraBtn.current!.innerText = "Turn Camera On";
    } else {
      cameraBtn.current!.innerText = "Turn Camera Off";
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

  async function handleWelcomeSubmit() {
    // event : React.FormEvent<HTMLFormElement>
    // event.preventDefault();
    await getMedia();
    socket.emit("join_room", { roomName, username: "testname" });
    // roomName = welcomeInput.current?.value;
    // welcomeInput.current!.value = "";
  }

  // welcomeForm.addEventListener("submit", handleWelcomeSubmit);

  // ------ Socket Code ------
  socket.on("welcome", async (socketId) => {
    let myPeer = makeConnection();

    myPeerConnections.current[socketId] = myPeer;

    const offer = await myPeerConnections.current[socketId].createOffer();
    myPeerConnections.current[socketId].setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, socketId, roomName, {
      username: "유저네임",
      nickname: "유저닉네임",
    });
  });

  socket.on("offer", async (offer, socketId, userInfo) => {
    console.log("received the offer");
    myPeerConnections.current[socketId] = makeConnection();
    myPeerConnections.current[socketId].setRemoteDescription(offer);
    const answer = await myPeerConnections.current[socketId].createAnswer();

    myPeerConnections.current[socketId].setLocalDescription(answer);
    socket.emit("answer", answer, socketId, roomName);
    console.log("sent the answer");
  });

  socket.on("answer", (answer, socketId) => {
    console.log("received the answer");
    myPeerConnections.current[socketId].setRemoteDescription(answer);
  });

  socket.on("ice", (ice, socketId) => {
    console.log("received the candidate");
    myPeerConnections.current[socketId].addIceCandidate(ice);
  });

  socket.on("user_exit", ({ id }) => {
    delete myPeerConnections.current[id];
    // 사람수 - 2 해야 마지막인덱스값
    const lastIndex = userCount.current - 2;
    peerFace.current[lastIndex].classList.toggle("hidden");
    // setCurrentUsers((prev) => {
    //   prev.pop();
    //   return [...prev]
    // })
    console.log("==============>방 탈출!!!");
    console.log(id);

    // userCount = 1;
    // setUserCount(1);
    userCount.current = 1;
    const indexData = userCount.current;
    const keys = Object.keys(myPeerConnections.current);
    for (let socketID of keys) {
      console.log("---------");
      console.log(myPeerConnections.current[socketID]);
      console.log(myPeerConnections.current[socketID].getReceivers());
      console.log("---------");
      const receivers = myPeerConnections.current[socketID].getReceivers();
      const media = new MediaStream([receivers[0].track, receivers[1].track]);

      peerFace.current[indexData - 1].srcObject = media;
      // if (userCount.current === 1) {
      //   peerFace.current[0].srcObject = media;
      // } else if (userCount.current === 2) {
      //   peerFace.current[1].srcObject = media;
      // } else if (userCount.current === 3) {
      //   peerFace.current[2].srcObject = media;
      // }
      // if (userCount.current === 1) {
      //   peerFace1.current.srcObject = media;
      // } else if (userCount.current === 2) {
      //   peerFace2.current.srcObject = media;
      // } else if (userCount.current === 3) {
      //   peerFace3.current.srcObject = media;
      // }
      // userCount += 1;
      // setUserCount((prev) => prev + 1);
      userCount.current += 1;
    }

    console.log(userCount + "==================");
    let temp = userCount.current;
    if (temp < 6) {
      while (temp < 6) {
        peerFace.current[temp - 1].srcObject = null;
        // if (temp === 1) {
        //   peerFace.current[0].srcObject = null;
        // } else if (temp === 2) {
        //   peerFace.current[1].srcObject = null;
        // } else if (temp === 3) {
        //   peerFace.current[2].srcObject = null;
        // }
        // if (temp === 1) {
        //   peerFace1.current.srcObject = null;
        // } else if (temp === 2) {
        //   peerFace2.current.srcObject = null;
        // } else if (temp === 3) {
        //   peerFace3.current.srcObject = null;
        // }
        temp += 1;
      }
    }
  });

  socket.on("room_full", () => {
    toast.info("응 풀방이야~");
    navigate(`/main`);
    // location.href = "http://localhost:3000";
  });

  // ------ RTC Code ------
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
    myPeerConnection.addEventListener("addstream", handleAddStream);
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
  function handleAddStream(data: any) {
    console.log("data.stream@@@@@@@@@@@", data.stream);
    const indexData = userCount.current;
    peerFace.current[indexData - 1].classList.toggle("hidden");
    peerFace.current[indexData - 1].srcObject = data.stream;

    // if (userCount.current === 1) {
    //   peerFace.current[0].srcObject = data.stream;
    // } else if (userCount.current === 2) {
    //   peerFace.current[1].srcObject = data.stream;
    // } else if (userCount.current === 3) {
    //   peerFace.current[2].srcObject = data.stream;
    // }
    // if (userCount.current === 1) {
    //   peerFace1.current.srcObject = data.stream;
    // } else if (userCount.current === 2) {
    //   peerFace2.current.srcObject = data.stream;
    // } else if (userCount.current === 3) {
    //   peerFace3.current.srcObject = data.stream;
    // }

    console.log("여기 오ㅗㅗㅗㅗㅗㅗㅗㅗㅗ냐?", userCount.current);
    // peerFace.current.srcObject = data.stream;
    // userCount += 1;
    // setUserCount((prev) => prev + 1);
    userCount.current += 1;
    // setCurrentUsers((prev) => [...prev, 1])
    // currentUsers.current.push(1);
    // dispatch(isRtcLoading());
    console.log("즐", currentUsers);
  }

  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-evenly items-center p-28">
        {/* 내 비디오 공간 */}
        <video
          className="w-[30rem] h-80 py-3"
          ref={myFace}
          playsInline
          autoPlay
        ></video>
        {/* 다른 사람들 비디오 공간 */}
        {currentUsers.current.map((vide: number, index: number) => {
          return (
            <video
              key={vide}
              className="w-[30rem] h-80 py-3 hidden"
              ref={(element) => (peerFace.current[index] = element)}
              playsInline
              autoPlay
            ></video>
          );
        })}
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
  );
};

export default WebRTC;
