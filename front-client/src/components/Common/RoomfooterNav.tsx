import { useState } from "react"

function RoomfooterNav():JSX.Element {

  const [currentDate,setCurrentDate] = useState()
  setInterval(()=> {
    const date = new Date();
    // console.log(date.toLocaleTimeString('ko-kr').slice(0,7));
    let hour = ('0' + date.getHours()).slice(-2)
    let minutes = ('0' + date.getMinutes()).slice(-2)    
    setCurrentDate((hour + ':' + minutes)as any) ;
  },1000)

  return (
    <div className="grid" style={{gridTemplateColumns: '1fr 1.8fr 1fr'}}>
        <div></div>
        <div className="grid w-full" style={{gridTemplateColumns: '0.6fr 8fr 0.6fr'}}>
          <div></div>
          <div className="grid" style={{gridTemplateRows: '0.2fr 0.8fr'}}>
            <div></div>
            <div className="grid  text-white" style={{gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr', border: 'solid 2px white', borderBottom: 'solid 0px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
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
                <img className="h-[2.2rem] py-auto" src={require('../../assets/roomIcon/cancel.png')} alt="" />
                <span className="text-[0.7rem]">나가기</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
  )
}
export default RoomfooterNav