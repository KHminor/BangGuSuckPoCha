import RoomfooterNav from "../Common/RoomfooterNav"
import styles from './StoryRoom.module.css'

function StoryRoom():JSX.Element {
  return (
    <div className={`w-screen h-screen grid ${styles.gameroomimg}`} style={{gridTemplateRows: '0.07fr 1fr 0.12fr'}}>
      {/* 빈 공간 */}
      <div></div>
      {/* 화면 및 게임 공간 */}
      <div className="grid h-full" style={{gridTemplateRows: '1fr 1fr'}}>
        <div className="flex justify-center items-center h-[85%] w-[97%] mx-auto  my-auto ">
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-red-300"></div>
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-green-300"></div>
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-blue-300"></div>
        </div>
        <div className="flex justify-center items-center h-[90%] w-[97%] mx-auto  my-auto ">
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-red-300"></div>
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-green-300"></div>
          <div className=" h-full w-[90%] mx-5 rounded-[20px] border-2 border-blue-300"></div>
        </div>
      </div>
      {/* footerNav */}
      <RoomfooterNav/>
    </div>
  )
}
export default StoryRoom