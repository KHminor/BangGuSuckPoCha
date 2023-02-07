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

  
  
  


  
  // 클릭 되어진 유저와의 데이터
  const menuFriendClickUserData: any = useAppSelector((state)=> {return state.menuFriendClickUserData})
  const {nickname, data ,chat_id} = menuFriendClickUserData
  console.log(chat_id);
  // const data:any[] = menuFriendClickUserData.data
  // const afterChat = []
  // if (data.length !== 0) {
  //   data.map((e)=> {
  //     afterChat.push(e.content)
  //   })
  // }

  console.log('기존채팅 데이터: ', data)
  const [message, setMessage] = useState<any>([]);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);
  
  useEffect(()=> {
    console.log('현재 메세지 값: ', message)
  })



  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://i8e201.p.ssafy.io/api/ws/chat', // 왜 websocket을 붙여줘야하는거지..?
      webSocketFactory: () => new SockJS("https://i8e201.p.ssafy.io/api/ws/chat"),
      debug: function (str) {
          console.log(str);
      },
      onConnect:() => { 
        console.log("onConnect");
        client.current.subscribe("/sub/chat/"+ chat_id, function(newMessage:any) {
          // setMessage([...message, newMessage.body])
          const msg = JSON.parse(newMessage.body)
          setMessage((_chat_list:any)=> [..._chat_list, msg])
          
          //showGreeting(JSON.parse(message.body))
        });
      },
      reconnectDelay: 1000, //자동 재 연결
      heartbeatIncoming: 1000,
      heartbeatOutgoing: 1000,
    });
      client.current.activate();
      console.log(client.current.connected)
    }


  const disconnect = () => {
    client.current.deactivate();
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
              {
                
                message&&message.map((chat:any)=>{
                  console.log(chat)
                  return (
                    <div className="flex flex-col justify-start w-full h-full ">
                      {
                        chat.user_nickname === menuFriendClickUserData.nickname? <MyChat content={chat.content}/>: <OtherChat content={chat.content}/>
                      }
                    </div>
                  )
                })
              }
            </div>

            <div className="grid h-full w-full" style={{gridTemplateColumns: '1fr 0.12fr'}}>
              <input className="my-auto mx-auto h-[55%] w-[90%] max-w-[90%] rounded-[24px] pl-4 text-black" style={{border: 'groove 2px rgba(225,225,225,0.4)'}} placeholder='Search for anything...' type="text" />
              <div className="my-auto mr-[10%] h-[55%] w-[90%] mx-auto">
                <img className="cursor-pointer" src={require('../../assets/friendChatIcon/dm.png')} alt=""/>
              </div>
            </div>
      </div>
    </div>
  )
}
export default FriendChat
