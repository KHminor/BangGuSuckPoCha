import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";
// import { RootState } from "../../store/store";
// import Footer from "../Common/Footer";
import styles from "./Main.module.css";

function Main(): JSX.Element {
  return (
    <div>
      <Navbar />
      <div
        className={`${styles.hideScroll}`}
        style={{
          height: "84vh",
          overflow: "auto",
          backgroundColor: "rgb(25, 25, 25)",
        }}
      >
        <Tag />
        <Room />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default Main;

function Tag(): JSX.Element {
  
  const checkMenuState:any = useSelector((state:any)=> {return state.menuClickCheck})
  const alarmClickCheck:any = useSelector((state:any)=> {return state.alarmClickCheck})
  
  
  if (checkMenuState === true) {
    document.getElementById('menu')?.classList.remove('hidden')
  } else {
    document.getElementById('menu')?.classList.add('hidden')
  }

  if (alarmClickCheck === true) {
    document.getElementById('alarm')?.classList.remove('hidden')
  } else {
    document.getElementById('alarm')?.classList.add('hidden')
  }

  return (
    <div
      className="grid grid-flow-row-dense grid-cols-9 grid-rows-1" style={{ height: "16%" }}>
      <img src="%PUBLIC_URL%/favicon.ico" alt="" />
      <div className="col-span-1"></div>
      <div className="col-span-5 ">
        <div className="flex h-full ">
          <div className="flex-initial w-32 text-xl grid grid-rows-3">
            <div></div>
            <div
              className="flex justify-center items-center cursor-pointer rounded-full text-white mx-2 font-normal"
              style={{ backgroundColor: "rgb(233, 61, 107)" }}
            >
              ALL
            </div>
            <div></div>
          </div>
          <div className="flex-initial w-56 text-xl grid grid-rows-3">
            <div></div>
            <div className="flex justify-center items-center cursor-pointer border border-neutral-600 rounded-full text-white mx-2 font-normal">
              연령
            </div>
            <div></div>
          </div>
          <div className="flex-initial w-56 text-xl grid grid-rows-3">
            <div></div>
            <div className="flex justify-center items-center cursor-pointer border border-neutral-600 rounded-full text-white mx-2 font-normal">
              지역
            </div>
            <div></div>
          </div>
          <div className="flex-initial w-56 text-xl grid grid-rows-3">
            <div></div>
            <div className="flex justify-center items-center cursor-pointer border border-neutral-600 rounded-full text-white mx-2 font-normal">
              테마
            </div>
            <div></div>
          </div>
          <div className="flex-initial w-56 text-xl grid grid-rows-3">
            <div></div>
            <div className="flex justify-center items-center cursor-pointer border border-neutral-600 rounded-full text-white mx-2 font-normal">
              술
            </div>
            <div></div>
          </div>
          <div className="flex-initial w-56 text-xl grid grid-rows-3">
            <div></div>
            <div className="flex justify-center items-center cursor-pointer border border-neutral-600 rounded-full text-white mx-2 font-normal">
              관심사
            </div>
            <div></div>
          </div>
          <div className="flex-none">
            <button></button>
          </div>

        </div>
      </div>
      {/* 메뉴 클릭시 보이기 */}
      <div id="menu" className="absolute rounded-full w-48 h-16 hidden" style={{right: '5%', top: '17%'}} >
        {/* <img src={menuBground} className="bg-inherit h-full w-full" alt="" /> */}
        <div className="flex justify-center items-center absolute   w-48 h-16" style={{right: '-1%', top: '-9%'}}>
          <div className="ml-5 cursor-pointer" style={{height: '52%'}}>
            {/* <img src={mypage} className="bg-white bg-cover rounded-full" style={{height: '90%', border: 'solid 1px white'}}/> */}
            <p className="text-stone-200 text-xs">My</p>
          </div>
          <div className="mx-5 cursor-pointer" style={{height: '52%'}}>
            {/* <img src="" className="bg-white bg-cover rounded-full" style={{height: '90%'}}/> */}
            <p className="text-stone-200 text-xs">friend</p>
          </div>
          <div className="mr-5 cursor-pointer" style={{height: '52%'}}>
            {/* <img src={logout} className="bg-white bg-cover rounded-full" style={{height: '90%'}}/> */}
            <p className="text-stone-200 text-xs">logout</p>
          </div>
        </div>
      </div>
      {/* 알림 클릭시 보이기 */}
      <div id="alarm" className="grid grid-rows-12 absolute w-56 bg-black text-white rounded-3xl neonDefault" style={{right: '1.5%', top: '17.6%', height:'34%'}} >
        <div className="grid grid-cols-12 row-span-1 items-center">
          <div className="col-span-5"></div>
          <div className="col-span-2 opacity-50">알림</div>
          <div className="col-span-2"></div>
          <div className="col-span-2"></div>
          <div className="col-span-1"></div>
        </div>
        <div className="grid grid-cols-12 row-span-1 items-start">
          <div className="col-span-1"></div>
          <div className="col-span-3 text-xl">요청</div>
          <div className="col-span-4"></div>
          <div className="col-span-3 text-xl opacity-50">리뷰</div>
          <div className="col-span-1"></div>
        </div>
        <div className="row-span-6 hideScroll" style={{overflow: 'auto'}} >
          <div className="my-2 cursor-pointer" style={{height: '20%'}} onClick={()=> {
            
          }}>한상현 바보</div>
          <div className="my-2 cursor-pointer" style={{height: '20%'}}>한상현 바보</div>
          <div className="my-2 cursor-pointer" style={{height: '20%'}}>한상현 바보</div>
        </div>
      </div>
    </div>
  );
}

function Room() {
  let [hoverCheck, setHoverCheck] = useState(false) 
  let cards: JSX.Element[] = [1, 1, 1, 1].map((e, idx) => {
    return (
      <div key={idx} className="mx-12 cursor-pointer rounded-2xl neon" style={{height: '90%'}}>
        <div style={{height: '68%'}} >
          <img
            className="rounded-t-2xl object-cover object-center h-full "
            src="https://images.pexels.com/photos/5220092/pexels-photo-5220092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <div className="grid grid-rows-3 p-6 bg-black rounded-b-2xl text-white" style={{height:'32%'}}>
          <div className="grid grid-cols-12 ">
            <div className="col-span-5 rounded-full flex justify-center items-center text-xl font-normal" style={{backgroundColor: 'rgb(227, 114, 0)', height: '80%'}}>
              Talk
            </div>
            <div className="col-span-7 "></div>
          </div>
          <div className="flex justify-start items-end text-sm">우리의 시간은 낮보다 밤이 더 아름답다...🤑</div>
          <div className="flex justify-start items-end text-sm">#20대 #부산 #이자카야 #소주</div>
        </div>
      </div>
    );
  });
  return (
    <div style={{height: '62%'}}>
      <div className="flex h-full">
        <div style={{width: '10%', height:'100&'}}></div>
        <div className="grid grid-cols-4" style={{width: '80%'}}>
          {cards}
        </div>
        <div style={{width: '10%'}}></div>
      </div>
      <div className="flex h-full">
        <div style={{width: '10%', height:'100&'}}></div>
        <div className="grid grid-cols-4 " style={{width: '80%'}}>
          {cards}
        </div>
        <div style={{width: '10%'}}></div>
      </div>
      <div className="flex h-full">
        <div style={{width: '10%', height:'100&'}}></div>
        <div className="grid grid-cols-4 " style={{width: '80%'}}>
          {cards}
        </div>
        <div style={{width: '10%'}}></div>
      </div>
      <div className="flex h-full">
        <div style={{width: '10%', height:'100&'}}></div>
        <div className="grid grid-cols-4 " style={{width: '80%'}}>
          {cards}
        </div>
        <div style={{width: '10%'}}></div>
      </div>
      <div className="flex h-full">
        <div style={{width: '10%', height:'100&'}}></div>
        <div className="grid grid-cols-4 " style={{width: '80%'}}>
          {cards}
        </div>
        <div style={{width: '10%'}}></div>
      </div>
      
    </div>
  );
}

