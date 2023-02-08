import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import styles from '../Common/Common.module.css'

import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

function FriendChat():JSX.Element {
  const friendChat = useRef<any>(null);
  //  메뉴 -> 친구 클릭 -> 챗팅
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck
  })

  
  // 채팅구역
  const chatArea = useRef<any>(null)
  const client = useRef<any>({});
  // 해당 구역 가장 아래위치 체크후 해당 위치가 default 되도록 하기
  // console.log('채팅구역: ',chatArea&&chatArea.current?.scrollHeight) 

  useEffect(()=> {
    if (menuFriendChatClickCheck) {
      friendChat.current.classList.remove("hidden");
    } else {
      friendChat.current.classList.add("hidden");
    }
  },[menuFriendChatClickCheck])


  const [message, setMessage] = useState<any>();
  const [inputChat, setInputChat] = useState<any>()
  // const [sendCheck, setsendCheck] = useState<any>(0)

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [message]);
  
  useEffect(()=> {
    const chat_id = localStorage.getItem('chat_id')
    axios.get(`https://i8e201.p.ssafy.io/api/user/friend/chat/${chat_id}`).then((r)=> {
      setMessage(r.data.data)
    })
    scrollToBottom()
  },[])

  // useEffect(()=> {
  //   scrollToBottom()
  //   console.log('내가 작성한 채팅: ',inputChat);
  //   console.log('현재 메세지 값: ', message)
  // },[sendCheck])



  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://i8e201.p.ssafy.io/api/ws/chat', // 왜 websocket을 붙여줘야하는거지..?
      webSocketFactory: () => new SockJS("https://i8e201.p.ssafy.io/api/ws/chat"),
      debug: function (str) {
          console.log(str);
      },
      onConnect:() => { 
        console.log("onConnect");
        const chat_id = localStorage.getItem('chat_id')
        client.current.subscribe("/sub/chat/"+ chat_id, function(newMessage:any) {
          const msg = JSON.parse(newMessage.body)
          setMessage((_chat_list:any)=> [..._chat_list, msg])
        });
      },
    });
      client.current.activate();
      console.log(client.current.connected)
    }

  const disconnect = () => {
    client.current.deactivate();
  };

  
  const publish = (inputChat:any) => {
    const chat_id = localStorage.getItem('chat_id')
    const userId = localStorage.getItem('userId')
    console.log('퍼블리쉬 대따!!!!!')

    if (!client.current.connected) {
      console.log(client.current.connected)
      console.log('리턴되따!!!!')
      return;
    }

    console.log('리턴 안되고 진행중!!')
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({chat_id:chat_id, user_id:userId, content:inputChat}),
    });

    setInputChat("");
  };

  const handleChange = (event:any) => { // 채팅 입력 시 state에 값 설정
    setInputChat(event.target.value);
  };


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

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      publish(inputChat)
      scrollToBottom()
      setInputChat("");
    }
  };

  const f_nickname = localStorage.getItem('f_nickname') 

  return (
    <div ref={friendChat} className="absolute  w-[33rem] h-[35rem] max-h-[35rem] top-[11.6rem] right-[19rem] hidden">
        <div className="relative grid w-full h-full rounded-[24px] bg-black text-white" style={{gridTemplateRows: '0.5fr 0.5fr 7fr 1fr', border:'solid 2px white'}}>
            <div className="flex justify-center items-center h-[1.8rem] max-h-[1.8rem] w-full  text-white rounded-[100px] ">Chat</div>
            <div className={`flex justify-center items-center h-[2.6rem] max-h-[2.6rem] w-full  rounded-[15px] text-lg tracking-wide ${styles.nickNameNeon}`}></div>
            {/* 채팅 공간 */}
            <div ref={chatArea} className={`grid w-full bg-black h-full text-white overflow-scroll ${styles.hideScroll}`}>
              {
                message&&message.map((chat:any)=>{
                  // console.log(chat)
                  return (
                    <div className="flex flex-col justify-start w-full h-full ">
                      {
                        chat.user_nickname === f_nickname? <MyChat content={chat.content}/>: <OtherChat content={chat.content}/>
                      }
                    </div>
                  )
                })
              }
            </div>

            <div className="grid h-full w-full" style={{gridTemplateColumns: '1fr 0.12fr'}}>
              <input className="my-auto mx-auto h-[55%] w-[90%] max-w-[90%] rounded-[24px] pl-4 text-black" style={{border: 'groove 2px rgba(225,225,225,0.4)'}} placeholder='Search for anything...'  type="text" value={inputChat} 
              onChange={handleChange} 
              onKeyDown={handleKeyPress}
              />
              <div className="my-auto mr-[10%] h-[55%] w-[90%] mx-auto">
                <img className="cursor-pointer" src={require('../../assets/friendChatIcon/dm.png')} alt="" onClick={()=>{
                  publish(inputChat)
                  // setsendCheck(sendCheck+1)
                }}/>
              </div>
            </div>
      </div>
    </div>
  )
}
export default FriendChat
