import Navbar from "../Common/Navbar"
import NavbarAlarm from "../Common/NavbarAlarm"
import NavbarMenu from "../Common/NavbarMenu"

function Mypage():JSX.Element {
  return (
    <div className="grid w-screen h-screen font-nanum" style={{gridTemplateRows: '11rem 1fr 0.1fr', }}>
      <Navbar />
      <div className="grid h-full w-full " style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
        <div className="bg-black "></div>
        {/* 회원 정보 */}
        <div className="grid h-full border-white border-4 border-opacity-40" style={{gridTemplateRows: '1.7fr 0.7fr 4.2fr 0.9fr 1.3fr' ,  borderRadius:'24px 24px 24px 24px'}}>
          {/* 이모지 및 변경 아이콘 */}
          <div className="flex justify-center items-end h-full" >
            <img className="h-[9rem] w-[9rem] ml-6" style={{objectFit: 'contain'}} src={require('../../assets/myPage/sunglassEmoji.png')} alt="" />
            <img className="h-[1.5rem] w-[1.5rem]" style={{objectFit: 'contain'}} src={require('../../assets/myPage/settings.png')} alt="" />
          </div>
          {/* 닉네임 */}
          <div className="flex justify-center items-center ">
            <input className="text-center rounded-lg text-lg w-[30%] h-[60%] mx-auto my-auto bg-black" placeholder="기존 닉네임" type="text" />
          </div>
          {/* 정보 */}
          <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
            {/* 나이, 생일, 매너온도 */}
            <div className="grid  w-full h-full" style={{gridTemplateRows:'1fr 1fr 1fr'}}>
              {/* 나이 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">나이</div>
                <div className="grid  border-purple-300 w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <select className="text-white text-[1rem] text-center bg-black h-full border-2" name="age" id="age">
                    <option value="20">20살</option>
                  </select>
                  <div></div>
                </div>
              </div>
              {/* 생일 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">생일</div>
                <div className="grid  border-purple-300 w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <select className="text-white text-[1rem] text-center bg-black h-full border-2" name="age" id="age">
                    <option value="20">1월</option>
                  </select>
                  <select className="text-black text-[1rem] text-center bg-white h-full border-2" name="age" id="age">
                    <option value="20">31일</option>
                  </select>
                </div>
              </div>
              {/* 매너온도 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">매너온도</div>
                <div className="grid  border-purple-300 w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">36.9</div>
                  <div></div>
                </div>
              </div>
            </div>
            {/* 성별, 지역, 포인트 */}
            <div className="grid  w-full h-full" style={{gridTemplateRows:'1fr 1fr 1fr'}}>
              {/* 성별 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">성별</div>
                <div className="grid  border-purple-300 w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">남</div>
                <div className="flex justify-center items-center text-black text-[1rem] text-center bg-white h-full border-2">여</div>
                </div>
              </div>
              {/* 지역 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">지역</div>
                <div className="grid  border-purple-300 w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <select className="text-white text-[1rem] text-center bg-black h-full border-2" name="address1" id="address1">
                    <option value="20">부산광역시</option>
                  </select>
                  <select className="text-black text-[1rem] text-center bg-white h-full border-2" name="address2" id="address2">
                    <option value="20" disabled>ALL</option>
                  </select>
                </div>
              </div>
              {/* 포인트 */}
              <div className="grid  w-full h-[40%] my-auto " style={{gridTemplateColumns:'1.2fr 2fr'}}>
                <div className="flex justify-center items-center text-white text-[1.4rem] font-bold w-[80%] mx-auto">포인트</div>
                <div className="grid w-[90%] mr-[10%]" style={{gridTemplateColumns:'1fr 1fr'}}>
                  <div className="flex justify-center items-center text-white text-[1rem] text-center bg-black h-full border-2">500p</div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          {/* 자기소개 */}
          <div className="grid w-full h-[100%] " style={{gridTemplateColumns:'0.45fr 2fr'}}>
            <div className="flex justify-start items-center text-white text-[1.4rem] font-bold  h-[100%] w-full pl-[1rem]">자기소개</div>
            <input className="flex justify-start items-center text-white text-[1rem] text-center my-auto bg-black h-[70%] w-[95.8%] border-2 " placeholder="#INFJ #20대 #아메리카노 #부산 #소주" type="text" />
          </div>
          {/* Navfooter */}
          <div className="flex justify-center items-end h-full w-full" >
            <div className="grid h-[70%] w-[40%] border-2 border-white border-b-0 " style={{gridTemplateColumns: '1fr 1fr', border: 'solid 2px white', borderBottom: 'solid 0px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>
              <div className="flex flex-col justify-end items-center w-[80%] h-full mx-auto">
                <img className="h-[2.5rem]" src={require('../../assets/myPage/back.png')} alt="" />
                <span className="text-white my-1">뒤로가기</span>
              </div>
              <div className="flex flex-col justify-end items-center w-[80%] h-full mx-auto">
                <img className="h-[2.5rem]" src={require('../../assets/myPage/save.png')} alt="" />
                <span className="text-white my-1">저장</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black ">3</div>
      </div>
      {/* 메뉴 클릭시 보이기 */}
          <NavbarMenu/>
      {/* 알림 클릭시 보이기 */}
          <NavbarAlarm/>
    </div>
  )
}
export default Mypage