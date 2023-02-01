import { useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";

function FriendChat():JSX.Element {
  const friendChat = useRef<any>(null);
  //  메뉴 -> 친구 클릭 -> 챗팅
  const menuFriendChatClickCheck: any = useAppSelector((state: any) => {
    return state.menuFriendChatClickCheck
  })
  
  useEffect(()=> {
    if (menuFriendChatClickCheck) {
      friendChat.current.classList.remove("hidden");
    } else {
      friendChat.current.classList.add("hidden");
    }
  },[menuFriendChatClickCheck])

  return (
    <div ref={friendChat} className="absolute  w-[33rem] h-[35rem] top-[11.6rem] right-[19rem] hidden">
      <div className=" h-full w-full ">
        <div className="grid w-full h-full border-2 border-white " style={{gridTemplateColumns: '2fr', borderRadius:'24px' }}>
          <div className="grid h-full rounded-[24px] bg-black text-white" style={{gridTemplateRows: '0.5fr 0.7fr 7fr 1fr'}}>
            <div className="flex justify-center items-center h-full w-full  text-white rounded-[100px]">Chat</div>
            <div className="flex justify-center items-center h-full w-full  rounded-[15px]">대화하는 친구 이름</div>
            <div className="flex justify-center items-center h-full w-full bg-black text-white">채팅 공간</div>
            <div className="grid h-full w-full" style={{gridTemplateColumns: '1fr 0.12fr'}}>
              <input className="my-auto mx-auto h-[55%] w-[90%] max-w-[90%] rounded-[24px] pl-4 text-black" style={{border: 'groove 2px rgba(225,225,225,0.4)'}} placeholder='Search for anything...' type="text" />
              <div className="my-auto mr-[10%] h-[55%] w-[90%] mx-auto">
                <img src={require('../../assets/friendChatIcon/dm.png')} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FriendChat