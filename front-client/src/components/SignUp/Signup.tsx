// import sul from '../../assets/signUpIcon/sul.png'
import './SignUp.css'

function SignUp():JSX.Element {
  return (
    <div className="bg-black w-screen h-screen flex">
      <div className="" style={{width: '11%'}}></div>
      <div className="flex flex-col items-center text-white" style={{width: '78%'}}>
        <div className="grid grid-cols-3   w-full items-center" style={{height:'38%'}}>
          <div></div>
          <div>
            {/* <img className='absolute' src={sul} alt="" style={{left: '32.5%', top: '17%' , width:'4%'}}/> */}
            <p className='font-extrabold neonTitle tracking-wide cursor-pointer' style={{fontSize: '10rem', lineHeight: '1'}}>welcome</p>
          </div>
          <div></div>
        </div>
        <div className="grid grid-rows-2 w-full" style={{height:'35%'}}>
          <div className='h-4/5  flex items-end'>
            <div className='cursor-pointer ' style={{width:'81%', borderBottom: 'solid 0.7rem rgb(255, 255, 255)', borderBottomLeftRadius:'0.2rem',borderBottomRightRadius:'0.2rem'  , textAlign: 'start'}}>
              <label htmlFor="ID" className="mx-24 " style={{fontSize: '5rem'}} >NAME</label>
              <input className='bg-black ml-36 ' type="text" id='ID' style={{fontSize: '5rem', border: '0px '}}/>
            </div>
            <div className='mx-4 flex h-3/5' style={{width:'19%'}}>
              <div className='w-2/12'></div>
              <div className='w-10/12 rounded-3xl mr-8 flex justify-center items-center cursor-pointer btn' style={{border: 'solid 0.5rem white', fontSize: '3rem'}}>확인</div>
              {/* <div className='w-2/12 rounded-3xl'></div> */}
            </div>
          </div>
          <div className='grid grid-cols-2 h-full pb-10'>
            <div className=' flex justify-end items-end' style={{width:'97%', borderBottom: 'solid 0.7rem rgb(255, 255, 255)', borderBottomLeftRadius:'0.2rem',borderBottomRightRadius:'0.2rem'}}>
              <select className='ml-24 w-full border-0 bg-black cursor-pointer' name="region" id="region"  style={{fontSize: '5rem'}}>
                <option value="" defaultChecked>ADDRESS</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </div>
            <div className=' flex justify-end items-end' style={{width:'97%'}}>
              <select className='ml-24 w-full border-0 bg-black cursor-pointer' name="region" id="region"  style={{fontSize: '5rem',borderBottom: 'solid 0.7rem rgb(255, 255, 255)', borderBottomLeftRadius:'0.2rem',borderBottomRightRadius:'0.2rem'}}>
                <option value="" defaultChecked>ADDRESS</option>
                <option value="">1</option>
                <option value="">2</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" w-full " style={{height:'27%'}}>
          <div className='flex-col h-full'>
            <div className='' style={{height: '25%'}}></div>
            <div className='flex justify-center items-center rounded-3xl cursor-pointer btn' style={{height:'50%',fontSize: '5rem', border: 'solid 0.7rem white'}}>
              회원가입
            </div>
            <div style={{height: '25%'}}></div>
          </div>
        </div>
        {/* <div className="border-4 border-white" style={{height:''}}>4</div> */}
      </div>
      <div className="" style={{width: '11%'}}>빈칸</div>
    </div>
  )
}
export default SignUp