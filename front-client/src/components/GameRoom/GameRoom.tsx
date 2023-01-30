import { useEffect, useState } from "react"
import styles from './GameRoom.module.css'

function GameRoom():JSX.Element {
  const [currentDate,setCurrentDate] = useState()
  setInterval(()=> {
    const date = new Date();
    // console.log(date.toLocaleTimeString('ko-kr').slice(0,7));
    let hour = ('0' + date.getHours()).slice(-2)
    let minutes = ('0' + date.getMinutes()).slice(-2)    
    setCurrentDate((hour + ':' + minutes)as any) ;
  },1000)
  
  
  return (
    <div className={`w-screen h-screen grid ${styles.gameroomimg}`} style={{gridTemplateRows: '0.07fr 1fr 0.12fr'}}>
      {/* 빈 공간 */}
      <div></div>
      {/* 화면 및 게임 공간 */}
      <div className="grid" style={{gridTemplateColumns: '1fr 1.8fr 1fr'}}>
        {/* 남자 공간 */}
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">1</div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">2</div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">3</div>
        </div>
        {/* 게임 공간 */}
        <div className="grid" style={{gridTemplateColumns: '0.02fr 0.98fr 0.02fr'}}>
          <div>1</div>
          <div className="flex justify-center items-center border-2 border-blue-400 rounded-[20px]">2</div>
          <div>3</div>
        </div>
        {/* 여자 공간 */}
        <div className="flex flex-col justify-between items-center">
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">1</div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">2</div>
          <div className="flex justify-center items-center border-2 border-purple-500 h-[31%] w-[90%] rounded-[20px]">3</div>
        </div>
      </div>
      <div className="grid" style={{gridTemplateColumns: '1fr 1.8fr 1fr'}}>
        <div></div>
        <div className="grid w-full" style={{gridTemplateColumns: '0.6fr 8fr 0.6fr'}}>
          <div></div>
          <div className="grid" style={{gridTemplateRows: '0.2fr 0.8fr'}}>
            <div></div>
            <div className="grid  text-white" style={{gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', border: 'solid 2px white', borderBottom: 'solid 0px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
              <div className="flex justify-center items-center text-[2rem] ">{currentDate}</div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/time.png')} alt="" />
                <span className="text-[0.7rem]">시간추가</span>
              </div>  
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/cheers.png')} alt="" />
                <span className="text-[0.7rem]">짠</span>
              </div>  
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/add-user.png')} alt="" />
                <span className="text-[0.7rem]">친구초대</span>
              </div>    
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/communication.png')} alt="" />
                <span className="text-[0.7rem]">썰</span>
              </div>            
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/exclamation-mark.png')} alt="" />
                <span className="text-[0.7rem]">포차정보</span>
              </div>               
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/report.png')} alt="" />
                <span className="text-[0.7rem]">신고하기</span>
              </div>
              <div className="flex flex-col justify-center items-center min-h-full max-h-full cursor-pointer">
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/cancel.png')} alt="" />
                <span className="text-[0.7rem]">나가기</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
export default GameRoom