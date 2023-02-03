import React from "react";
import { useRef } from "react";
import { io } from "socket.io-client";


const WebRTC = () => {
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
  const optionList : JSX.Element[] = [];

  let myStream : any;
  let roomName : any;
  let myPeerConnections : any = {};
  let userCount = 1;

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      // const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        // const option = React.createElement("option", 	{
        //   value = camera.deviceId,
        // },);
        const option : JSX.Element = (<option value={camera.deviceId}>{camera.label}</option>);
        // option.value = camera.deviceId;
        // option.innerText = camera.label;
        // if (currentCamera.id === option.value) {
        //   option.selected = true;
        // }
        // cameraSelect.current?.appendChild(option);
        optionList.push(option);
      });
    } catch (e) {
      console.log(e);
    }
    }


  async function getMedia(deviceId? : string) {
    const initialConstraing = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraing : any = {
      audio: true,
      video: { deviceid: { exact: deviceId } },
    };
    try {
      if (deviceId) {
        myStream = await navigator.mediaDevices.getUserMedia(initialConstraing);
      } else {
        myStream = await navigator.mediaDevices.getUserMedia(cameraConstraing);
      }
      
      myFace.current!.srcObject = myStream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  function handleMuteClick() {
    myStream
      .getAudioTracks()
      .forEach((track : any) => (track.enabled = !track.enabled));
    // if (!muted) {
    //   muteBtn.innerText = "Unmute";
    // } else {
    //   muteBtn.innerText = "Mute";
    // }
    // muted = !muted;
  }
  
  function handleCameraClick() {
    myStream
      .getVideoTracks()
      .forEach((track : any) => (track.enabled = !track.enabled));
    // if (!cameraOff) {
    //   cameraBtn.innerText = "Turn Camera On";
    // } else {
    //   cameraBtn.innerText = "Turn Camera Off";
    // }
    // cameraOff = !cameraOff;
  }
  
  async function handleCameraChange() {
    await getMedia(cameraSelect.current!.value);
    myPeerConnections.forEach((myPeerConnection : any) => {
      if (myPeerConnection) {
        const videoTrack = myStream.getVideoTracks()[0];
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
  const welcomeForm = useRef<HTMLFormElement>(null);
  const welcomeInput = useRef<HTMLInputElement>(null);

  const peerFace1 = useRef<any>(null);
  const peerFace2 = useRef<any>(null);
  const peerFace3 = useRef<any>(null);

  async function initCall() {
    // welcome.hidden = true;
    // call.hidden = false;

    await getMedia();
  }

  async function handleWelcomeSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await initCall();
    socket.emit("join_room", { roomName: welcomeInput.current?.value, username: "testname" });
    roomName = welcomeInput.current?.value;
    welcomeInput.current!.value = "";
  }

  // welcomeForm.addEventListener("submit", handleWelcomeSubmit);

  
  // ------ Socket Code ------
  socket.on("welcome", async (socketId) => {
    let myPeer = makeConnection();

    myPeerConnections[socketId] = myPeer;

    const offer = await myPeerConnections[socketId].createOffer();
    myPeerConnections[socketId].setLocalDescription(offer);
    console.log("sent the offer");
    socket.emit("offer", offer, socketId, roomName);
  });

  socket.on("answer", (answer, socketId) => {
    console.log("received the answer");
    myPeerConnections[socketId].setRemoteDescription(answer);
  });
  
  socket.on("ice", (ice, socketId) => {
    console.log("received the candidate");
    myPeerConnections[socketId].addIceCandidate(ice);
  });
  
  socket.on("user_exit", ({ id }) => {
    delete myPeerConnections[id];
    console.log("==============>방 탈출!!!")
    console.log(id)
  
    userCount = 1;
    const keys = Object.keys(myPeerConnections);
    for (let socketID of keys) {
      console.log("---------");
      console.log(myPeerConnections[socketID]);
      console.log(myPeerConnections[socketID].getReceivers());
      console.log("---------");
      const receivers = myPeerConnections[socketID].getReceivers();
      const media = new MediaStream([receivers[0].track, receivers[1].track])
      
      
      if (userCount === 1) {
        peerFace1.current.srcObject = media;
      } else if (userCount === 2) {
        peerFace2.current.srcObject = media;
      } else if (userCount === 3) {
        peerFace3.current.srcObject = media;
      }
      userCount += 1;
    }
  
    console.log(userCount + "==================");
    let temp = userCount;
    if (temp < 4) {
      while (temp < 4) {
        if (userCount === 1) {
          peerFace1.current.srcObject = null;
        } else if (userCount === 2) {
          peerFace2.current.srcObject = null;
        } else if (userCount === 3) {
          peerFace3.current.srcObject = null;
        }
        temp += 1;
      }
    }
  });
  
  socket.on("room_full", () => {
    alert("방이 가득 찼습니다!!!!!!!!");
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
    myStream.getTracks().forEach((track : any) => {
      myPeerConnection.addTrack(track, myStream);
    });
    return myPeerConnection;
}
  
  // icecandidate 이벤트시 실행 함수
  function handleIce(data : any) {
    console.log("sent candidate");
    // icecandidate를 만들면 이걸 또 서버로 보내줌
    socket.emit("ice", data.candidate, roomName);
  }

  // addStream 이벤트시 실행 함수
  function handleAddStream(data : any) {
    console.log("data.stream@@@@@@@@@@@", data.stream);
    if (userCount === 1) {
      peerFace1.current.srcObject = data.stream;
    } else if (userCount === 2) {
      peerFace2.current.srcObject = data.stream;
    } else if (userCount === 3) {
      peerFace3.current.srcObject = data.stream;
    }
    userCount += 1;
    // peerFace.current.srcObject = data.stream;
  }


  return (
    <div className="h-screen w-screen text-white">
      <div className="p-20">
        <form onSubmit={handleWelcomeSubmit} ref={welcomeForm}>
          <input ref={welcomeInput} placeholder="Room name" required type="text"/>
          <button>Enter Room</button>
        </form>
      </div>
      <div>
        <video className="w-80 h-80" ref={myFace} playsInline autoPlay/><video />
        <button onClick={handleMuteClick} ref={muteBtn}>Mute</button>
        <button onClick={handleCameraClick} ref={cameraBtn}>Camera Off</button>
        <select onInput={handleCameraChange} ref={cameraSelect}>
          {optionList}
        </select>
        <video className="w-80 h-80" ref={peerFace1} playsInline autoPlay/><video />
        <video className="w-80 h-80" ref={peerFace2} playsInline autoPlay/><video />
        <video className="w-80 h-80" ref={peerFace3} playsInline autoPlay/><video />
      </div>

    </div>
  )
}
export default WebRTC;