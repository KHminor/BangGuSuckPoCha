import { useAppDispatch } from '../../store/hooks'
import { changeMenuFriendChatState } from '../../store/store'
import styles from './Common.module.css'
function FriendList():JSX.Element {
  
  // 메뉴 클릭시 
  const dispatch = useAppDispatch()
  
  const emoji = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png'
  const nickname = '라면왕 한통깨'
  const logState = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png'
  const friendPkList = [0,1,2,3,4,5,6,7,8,9,10,1,1,1,1]
  
  const friendList = friendPkList.map((e)=> {
    return (
      <div className=" grid my-2 " style={{gridTemplateColumns: '1fr 3fr 1fr'}} onClick={()=> {
        dispatch(changeMenuFriendChatState())
      }}>
        <div className="flex justify-center items-center h-full pl-2"><img className="object-contain h-[80%] " src={emoji} alt="" /></div>
        <div className="flex justify-start items-center pl-3 text-base font-semibold h-full">{nickname}</div>
        <div className="flex justify-center items-center h-full"><img className="h-[20%] w-[20%]" src={logState} alt="" /></div>
      </div>
    )
  })

  return (
    <div className="absolute  w-[17rem] h-[35rem] top-[11.6rem] right-[2rem]">
      <div className="h-full w-full" >
        <div className="w-full h-full">
          <div className="grid h-full bg-black text-white border-2 border-white" style={{gridTemplateRows: '0.5fr 0.5fr 5fr', borderRadius: '24px'}}>
            <div className="flex justify-center items-center h-full">INBOX</div>
            <div className="flex justify-center rounded-full h-full"><input className="border-2 border-stone-400 w-[97%] h-[80%] rounded-full " type="text" /></div>
            <div className="grid h-full overflow-hidden " style={{gridTemplateRows: '0.0fr 1fr 0.04fr'}}>
              <div className="flex justify-start items-center h-full text-white text-xs pl-2">친한친구</div>
              <div className={`h-full overflow-scroll ${styles.hideScroll}`}>
                {
                  friendPkList ? friendList:null
                }
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FriendList