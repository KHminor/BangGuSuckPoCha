import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import styles from '../Common/Common.module.css'

import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";


function FriendChat():JSX.Element {
  const friendChat = useRef<any>(null);
  //  메뉴 -> 친구 클릭 -> 챗팅
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck
  })
  
  
  // 채팅구역
  const chatArea = useRef<any>(null)
  // 해당 구역 가장 아래위치 체크후 해당 위치가 default 되도록 하기
  // console.log('채팅구역: ',chatArea&&chatArea.current?.scrollHeight) 

  useEffect(()=> {
    if (menuFriendChatClickCheck) {
      friendChat.current.classList.remove("hidden");
    } else {
      friendChat.current.classList.add("hidden");
    }
  },[menuFriendChatClickCheck])

  // 클릭 되어진 유저와의 데이터
  const menuFriendClickUserData: any = useAppSelector((state)=> {return state.menuFriendClickUserData})
  const {nickname, data, chat_id} = menuFriendClickUserData
  console.log(chat_id);
  const user_id = localStorage.getItem('userId')

  const client = useRef<any>({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(()=> {
    console.log('채팅 목록: ',chatMessages)
    console.log('이건 입력한 메시지: ',message)
  })

  // 소켓 연결
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://i8e201.p.ssafy.io/api/ws/chat', // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("https://i8e201.p.ssafy.io/api/ws/chat"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };
  
  const subscribe = () => {
    client.current.subscribe("/sub/chat/"+ chat_id, function(newMessage:any) {
      const msg = JSON.parse(newMessage.body)
      setChatMessages([...data, msg]as any)
      console.log("#############3333"+ message);
      //showGreeting(JSON.parse(message.body))
    });
  }

  const publish = (message:any) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ chat_id: chat_id, user_id:user_id, content:message }),
    });

    setMessage("");
  };

  // const [message, setMessage] = useState(data);

  

  // const connect = () => {
  // const client = new StompJs.Client({
  //   brokerURL: 'ws://i8e201.p.ssafy.io/api/ws/chat', // 왜 websocket을 붙여줘야하는거지..?
  //   webSocketFactory: () => new SockJS("https://i8e201.p.ssafy.io/api/ws/chat"),
  //   debug: function (str) {
  //       console.log(str);
  //   },
  //   onConnect:() => { 
  //     console.log("onConnect");
  //     client.subscribe("/sub/chat/"+ chat_id, function(newMessage:any) {
  //       setMessage([...message, newMessage.body])
  //       console.log("#############3333"+ message);
  //       //showGreeting(JSON.parse(message.body))
  //     });
  //   },
  //   reconnectDelay: 5000, //자동 재 연결
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  // });
  //   client.activate();
  //   console.log(client.connected)
  // }

  // connect();

  function MyChat({content}:any):JSX.Element {
    return (
      <div className="flex justify-end items-center my-1 ">
        <div className="grid w-full " style={{gridTemplateColumns: '3fr 2fr'}}>
          <div className="inline-flex justify-start items-center whitespace-normal">
            <span className="text-gray-50 rounded-lg bg-orange-400 font-medium">&nbsp;&nbsp;{content}&nbsp;&nbsp;</span>
          </div>
          <div className=""></div>
        </div>
      </div>
    )
  }

  function OtherChat({content}:any):JSX.Element {
    return (
      <div className="flex justify-end items-center my-1 ">
        <div className="grid w-full " style={{gridTemplateColumns: '2fr 3fr'}}>
          <div className=""></div>
          <div className="inline-flex justify-end items-center whitespace-normal">
            <span className="text-gray-50 rounded-lg bg-blue-400 font-medium">&nbsp;&nbsp;{content}&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
    )
  }

  const scrollToBottom = () => {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatArea]);

  return (
    <div ref={friendChat} className="absolute  w-[33rem] h-[35rem] max-h-[35rem] top-[11.6rem] right-[19rem] hidden">
        <div className="relative grid w-full h-full rounded-[24px] bg-black text-white" style={{gridTemplateRows: '0.5fr 0.5fr 7fr 1fr', border:'solid 2px white'}}>
            <div className="flex justify-center items-center h-[1.8rem] max-h-[1.8rem] w-full  text-white rounded-[100px] ">Chat</div>
            <div className={`flex justify-center items-center h-[2.6rem] max-h-[2.6rem] w-full  rounded-[15px] text-lg tracking-wide ${styles.nickNameNeon}`}>{nickname}</div>
            {/* 채팅 공간 */}
            <div ref={chatArea} className={`grid w-full bg-black h-full text-white overflow-scroll ${styles.hideScroll}`}>
              {/* {
                
                data&&data.map((chat:any)=>{
                  return (
                    <div className="flex flex-col justify-start w-full h-full ">
                      {
                        chat.user_nickname === menuFriendClickUserData.nickname? <MyChat content={chat.content}/>: <OtherChat content={chat.content}/> 
                      }
                    </div>
                  )
                })
              } */}


              {/* 소켓통신 메시지 */}
              {/* {
              chatMessages && chatMessages.length > 0 && (
                <ul>
                  {chatMessages.map((_chatMessage:any, index) => (
                    <li key={index}>{_chatMessage.message}</li>))}
                </ul>
              )} */}
              {
                chatMessages&&chatMessages.map((chat:any) => {
                  return (
                    <div className="flex flex-col justify-start w-full h-full ">{chat}</div>
                  )
                })
              }
            </div>

            <div className="grid h-full w-full" style={{gridTemplateColumns: '1fr 0.12fr'}}>
              <input className="my-auto mx-auto h-[55%] w-[90%] max-w-[90%] rounded-[24px] pl-4 text-black" style={{border: 'groove 2px rgba(225,225,225,0.4)'}} placeholder='Search for anything...' 
              type={"text"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e:any) => e.key === 13 && publish(message)}/>
              <div className="my-auto mr-[10%] h-[55%] w-[90%] mx-auto">
                <img className="cursor-pointer" src={require('../../assets/friendChatIcon/dm.png')} alt="" onClick={() => publish(message)}/>
              </div>
            </div>
      </div>
    </div>
  )
}
export default FriendChat