import { useRef, useState } from "react";
import './Balance.css'

function Balance({
  socket,
  pochaId,
  pochaUsers,
}: {
  socket: any;
  pochaId: string;
  pochaUsers: any;
}):JSX.Element {
  const usersLength = pochaUsers.length;
  console.log(usersLength);
  
  const imgDiv = useRef<any>()

  const [isStart,setIstStart] = useState(false)
  const [isChange,setIsChange] = useState(false)
  const [subjectDiv, setSubjectDiv] = useState('flex')
  const [qDiv, setQDiv] = useState('hidden')

  // 시작
  function start() {
    // window.location.replace('BalancePlay.html')
    // imgDiv.current.style.display = "none";
  }


  // 종료
  function exit() {
    window.location.replace('BalanceStart.html')
  }

  // play
  var audio = new Audio();
  audio.src = "뿅.mp3"
  function play() {
    // audio.play();
  }

  // 다음 질문
  function next() {
    play()
    // var x = Math.floor(Math.random() * (subject.length -1))
    // document.querySelector('.q1').innerHTML = subject[x].q1;
    // document.querySelector('.q2').innerHTML = subject[x].q2;

    // console.log(subject[x]);
  }

  function change() {
    // document.querySelectorAll(".subject")[0].style.display = "none";
    // document.querySelectorAll(".subject")[1].style.display = "none";

    // document.querySelector(".q1").style.display = "flex";
    // document.querySelector(".q2").style.display = "flex";
    // document.querySelector(".buttons").style.display="flex";
    // document.querySelector(".question").innerHTML = "Q. 당신의 선택은?"
  }

  const romanceList = [
    {
        q1 : "아플 때 죽 사다주는 애인",
        q2 : "아플 때 쉬게 냅두는 애인"
    },
    {
        q1 : "데이트 코스 하나하나 물어보는 애인",
        q2 : "안물어 보고 그냥 다 정해주는 애인"
    },
    {
        q1 : "전여친 SNS 염탐하는 애인",
        q2 : "인플루언서 덕질하며 댓글 다는 애인"
    },
    {
        q1 : "잠수 이별 ",
        q2 : "환승 이별"
    },
    {
        q1 : "평소에 양치 절대 안 하는 애인",
        q2 : "평소에 머리 절대 안 감는 애인"
    },
  ]

  const generalList = [
    {
        q1 : "반반의 확률로 10억 받기",
        q2 : "5000만 원 받기"
    },
    {
        q1 : "평생 치통",
        q2 : "평생 두통"
    },
    {
        q1 : "월 200만 원 백수 되기(일 하면 절대 안 됨)",
        q2 : "월 600만 원 직장인(정년까지 일 못 그만둠)"
    },
    {
        q1 : "자는데 모기소리 들리기(물리지는 않음)",
        q2 : "소리는 없는데 모기에 물리기"
    },
    {
        q1 : "새 신발인데 물웅덩이에 빠지고 1시간 이상 돌아다니기",
        q2 : "양말 젖어서 1시간 이상 돌아다니는데 발 냄새 심하게 나기"
    },
]

  let subject:any = generalList

  // 주제 선택 - 연애
  function romantic() {
    play()
    // setIsChange(true)
    setSubjectDiv('hidden')
    setQDiv('flex')
    
    // change()
    subject = romanceList
    next();
  }


  
  // 주제 선택 - 일반
  function general() {
    play()
    setSubjectDiv('hidden')
    setQDiv('flex')
    // change()
    // subject = generalList
    next()
  }


  function BalanceIntro():JSX.Element {
    return (
      <div ref={imgDiv}  className="setSize h-full">
        <div className="title">밸런스 게임</div>
        <div className = "question">Q. 당신의 선택은?</div>
        <div>
            <div className="button" onClick={()=> {setIstStart(true)}}>PLAY</div>
            <div className="button" onClick={exit}>EXIT</div>
        </div>
        <div className="imgDiv">
          <img src = "/balanceGame/bunny.png" className="h-[5rem] bunnyImg" alt=""/>
        </div>
      </div>
    )
  }

  function BalanceStart():JSX.Element {
    return (
      <div className="setSize">
        <div className="title">밸런스 게임</div>
        <div className="question">Q. 주제를 선택해주세요.</div>
        <div className="subjects">
          <div className="select selectA">
            <div className="sub">A</div>
            <div className={`subject ${subjectDiv}`} onClick={romantic}>연애</div>
            <div className={`q1 ${qDiv}`} onClick={play}></div>
          </div>
          <div className="select">
            <div className="sub">B</div>
            <div className={`subject ${subjectDiv}`} onClick={general}>일반</div>
            <div className={`q2 ${qDiv}`} onClick={play}></div>
          </div>
        </div>
        <div className={`buttons ${qDiv}`}>
          <div onClick={exit}>EXIT</div>
          <div onClick={next}>NEXT</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* start */}
      {
        isStart === false ? <BalanceIntro />: <BalanceStart />
      }
      {/* play */}
    </>
  )
}
export default Balance