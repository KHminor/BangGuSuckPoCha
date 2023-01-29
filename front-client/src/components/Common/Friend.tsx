function Friend():JSX.Element {
  return (
    <div className="absolute  w-[50rem] h-[35rem] my-[20rem] mx-[34rem]">
      <div className=" h-full w-full bg-white" style={{borderRadius: '24px 24px'}}>
        <div className="grid w-full h-full " style={{gridTemplateColumns: '1fr 2fr', }}>
          <div className="grid h-full" style={{gridTemplateRows: '0.5fr 0.5fr 5fr'}}>
            <div className="flex justify-center items-center h-full">INBOX</div>
            <div className="flex justify-center rounded-full h-full"><input className="border-2 border-stone-400 w-[97%] h-[80%] rounded-full " type="text" /></div>
            <div className="flex flex-col justify-start items-start rounded-full h-full">
              <div className="flex text-xs pl-2">친한친구</div>
              <div className=" grid my-2 " style={{gridTemplateColumns: '1fr 3fr 1fr'}}>
                <div className="flex justify-center items-center h-full pl-2"><img className="object-contain h-[80%] " src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png" alt="" /></div>
                <div className="flex justify-start items-center pl-3 text-base font-semibold h-full">라면왕 한통깨</div>
                <div className="flex justify-center items-center h-full"><img className="h-[20%] w-[20%]" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" alt="" /></div>
              </div>
              <div className=" grid my-2 " style={{gridTemplateColumns: '1fr 3fr 1fr'}}>
                <div className="flex justify-center items-center h-full pl-2"><img className="object-contain h-[80%] " src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png" alt="" /></div>
                <div className="flex justify-start items-center pl-3 text-base font-semibold h-full">라면왕 한통깨</div>
                <div className="flex justify-center items-center h-full"><img className="h-[20%] w-[20%]" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" alt="" /></div>
              </div>
              <div className=" grid my-2 " style={{gridTemplateColumns: '1fr 3fr 1fr'}}>
                <div className="flex justify-center items-center h-full pl-2"><img className="object-contain h-[80%] " src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png" alt="" /></div>
                <div className="flex justify-start items-center pl-3 text-base font-semibold h-full">라면왕 한통깨</div>
                <div className="flex justify-center items-center h-full"><img className="h-[20%] w-[20%]" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" alt="" /></div>
              </div>
              <div className=" grid my-2 " style={{gridTemplateColumns: '1fr 3fr 1fr'}}>
                <div className="flex justify-center items-center h-full pl-2"><img className="object-contain h-[80%] " src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/220px-Noto_Emoji_KitKat_263a.svg.png" alt="" /></div>
                <div className="flex justify-start items-center pl-3 text-base font-semibold h-full">라면왕 한통깨</div>
                <div className="flex justify-center items-center h-full"><img className="h-[20%] w-[20%]" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" alt="" /></div>
              </div>
            </div>
          </div>
          <div className="grid h-full bg-[rgb(225,225,225)] rounded-[24px]" style={{gridTemplateRows: '0.5fr 0.7fr 7fr 1fr'}}>
            <div className="flex justify-center items-center h-full w-full bg-black text-white rounded-[100px]">채팅</div>
            <div className="flex justify-center items-center h-full w-full bg-white rounded-[15px]">대화하는 친구 이름</div>
            <div className="flex justify-center items-center h-full w-full bg-[rgb(225,225,225)]">채팅 공간</div>
            <div className="flex justify-center items-center h-full w-full"><input className="h-[55%] w-[90%] rounded-[24px] pl-4 " style={{border: 'groove 2px rgba(225,225,225,0.4)'}} placeholder='Search for anything...' type="text" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Friend