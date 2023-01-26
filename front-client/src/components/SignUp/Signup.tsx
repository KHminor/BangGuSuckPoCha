import styles from './SignUp.module.css'

function SignUp():JSX.Element {
  return (
    <div className={`${styles.bgImg} h-screen w-screen min-w-[100vw] min-h-[100vh]  `}>
      {/* <div className=' bg-black   opacity-20 z-0'></div> */}
      {/* signup 박스 */}
      <div className='flex justify-center items-center absolute w-screen h-screen min-w-[100vw] min-h-[100vh] z-20' >
        <div className='grid relative w-[44rem] min-w-[44rem] h-[27rem] min-h-[27rem] bg-black rounded-[1.2rem]' style={{gridTemplateColumns: '0.15fr 1fr 0.15fr'}}>
          <div></div>
          <div className='grid ' style={{gridTemplateRows: '0.05fr 1fr 1fr 1fr 1.5fr'}}>
            <div className='bg-black'></div>
            <div className='flex justify-center items-center bg-black pr-4'>
              {/* 소주병 */}
              <img src={require('../../assets/signUpIcon/sul.png')} alt="sul" className='w-10' />
              {/* Welcom */}
              <div className={`text-[3rem] text-white ${styles.neonTitle}`}>WELCOME</div>
            </div>
            <div className='grid justify-center items-end h-full min-h-full w-full min-w-full bg-black ' style={{gridTemplateColumns: '1fr 3fr 1fr '}}>
              <div className='h-[50%] flex items-center text-left pl-4 '><label className='text-white text-xl cursor-pointer' htmlFor="Id">Name</label></div>
              <div className='h-[50%] flex items-center w-ful'>
                <input className='h-full w-full bg-black justify-center text-center text-white border-b-2 border-b-white/[0.2] caret-white/[0.4]' type="text" id='Id'/>
              </div>
              <div className='h-[50%] w-full flex justify-end items-center bg-black'><div className={`h-[80%] min-h-[80%] w-[75%] min-w-[75%] flex justify-center items-center text-white text-lg cursor-pointer ${styles.neonDefault}`}>버튼</div></div>
            </div>
            <div className='grid justify-center items-end h-full min-h-full w-full min-w-full bg-black' style={{gridTemplateColumns: '1fr 2rem 1fr '}}>
              <div className='flex justify-start items-center h-1/2 min-h-[50%] w-full min-w-[100%] border-0' style={{borderBottom: 'solid 0.2rem white'}}>
                <select className='w-full min-w-full h-full min-h-full pl-4 bg-black text-white text-lg cursor-pointer' name="mainRegion" id="mainRegion">
                  <option className='' value="default" defaultChecked>ADDRESS</option>
                  <option value="seoul">서울</option>
                  <option value="daejeon">대전</option>
                  <option value="daegu">대구</option>
                  <option value="busan">부산</option>
                </select>
              </div>
              <div className='flex justify-start items-center h-1/2 min-h-[50%] w-full min-w-[100%] bg-black'></div>
              <div className='flex justify-start items-center h-1/2 min-h-[50%] w-full min-w-[100%] border-0' style={{borderBottom: 'solid 0.2rem white'}}>
                <select className='w-full min-w-full h-full min-h-full pl-4 bg-black text-white text-lg cursor-pointer' name="mainRegion" id="mainRegion">
                  <option className='' value="default" defaultChecked>ADDRESS</option>
                  <option value="seoul">서울</option>
                  <option value="daejeon">대전</option>
                  <option value="daegu">대구</option>
                  <option value="busan">부산</option>
                </select>
              </div>
            </div>
            <div className='flex justify-center items-center h-full min-h-full w-full min-w-full bg-black'>
              <div className={`flex justify-center items-center h-[50%] min-h-[50%] w-full min-w-full text-white text-xl cursor-pointer ${styles.neonDefault}`}>회원가입</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
export default SignUp