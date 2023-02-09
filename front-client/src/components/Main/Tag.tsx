import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import { useAppDispatch } from 'src/store/hooks'
import {
  changeMainCreateRoomList,
} from "../../store/store";

function Tag(): JSX.Element {

  const dispatch = useAppDispatch()
  const username = localStorage.getItem('Username')
  const [filter, setFilter] = useState<any>({isAll:true ,age:'연령',region:'지역',theme:'테마',sul:'술',hobby:'관심사'})
  const [ageRegion, setAgeRegion] = useState<any>({age:null, region:null})
  const ageRef = useRef<any>(null)
  const regionRef = useRef<any>(null)
  const themeRef = useRef<any>(null)
  const sulRef = useRef<any>(null)
  const hobbyRef = useRef<any>(null)
  // console.log(ageRef.current.value)

  // 유저 정보(연령, 지역)조사
  useEffect(()=> {
    axios.get(`https://i8e201.p.ssafy.io/api/user/info/${username}`)
    .then((r:any)=> {
      // console.log(r.data.data)
      
      const now = new Date()
      const nowYear = now.getFullYear()
      // 연령 파악
      let myAge:(number|string) = nowYear-Number(r.data.data.birth?.slice(0,4))
      // 지역 파악
      let myRegion = r.data.data.region.split(' ')[0]
      myAge = String(Math.floor(myAge/10)*10)+'대'
      setAgeRegion({age:myAge, region:myRegion})
    })
  },[])
  

  useEffect(()=> {
    console.log(ageRegion)
    if (filter.isAll) {
      console.log('원상복구')
      ageRef.current.value = '연령'
      regionRef.current.value = '지역'
      themeRef.current.value = '테마'
      sulRef.current.value = '술'
      hobbyRef.current.value = '관심사'
      axios.get('https://i8e201.p.ssafy.io/api/pocha/all').then((r)=> {
        const currenDataFirst = r.data.data.reverse()
        console.log(r.data)
        dispatch(changeMainCreateRoomList(currenDataFirst));
      }) 
    } else {
      console.log('현재 클릭한 태그정보: ',filter)
      let age
      let region
      let theme
      let sul
      let hobby
      for (const [key,value] of Object.entries(filter)) {
        if (key === 'age') {
          if ((value === '연령') || (value === 'ALL')) {
            age = 0
          } else {
            age = Number(ageRegion.age.slice(0,2))
          }
        } else if (key === 'region') {
            if ((value === '지역')||(value === '전국')) {
              region = '전국'
            } else {
              region = ageRegion.region
            }
        } else if (key === 'theme') {
            if ((value === '테마')||(value === '소통포차')) {
              theme = 'T0'
            } else if (value === '게임포차') {
              theme = 'T1'
            } else {
              theme = 'T2'
            }
        } else if (key === 'sul') {
            if (value === '술') {
              sul = null
            } else {
              sul = value
            }
        } else if (key === 'hobby') {
            if (value === '관심사') {
              hobby = null
            } else {
              hobby = value
            }
        }
        console.log(key,value)
      }
      console.log(age,region,theme,sul,hobby)
      axios({
        method: 'get',
        url: 'https://i8e201.p.ssafy.io/api/pocha',
        params: {
          age:age, region:region,themeId:theme,tag:hobby
        }
      }).then((r)=> {
        dispatch(changeMainCreateRoomList(r.data.data));
        console.log(r.data)
      }).catch((e)=> {
        console.log('에러다: ',e)
      })
    }
  },[filter])


  return (
    <div className="grid w-full min-w-[75rem] h-full " style={{gridTemplateColumns:'7fr 4fr', backgroundColor: "rgb(25, 25, 25)"}}>
      <div className="grid items-center w-full text-white " style={{gridTemplateColumns:'2.5rem 0.6fr 1fr 1fr 1fr 1fr 1fr'}}>
        <div className="flex justify-center items-center font-normal ml-2 h-1/3"> &nbsp;&nbsp;&nbsp;&nbsp;</div>
        {/* All */}
        <div className="flex justify-center items-center font-normal border-0 rounded-full h-1/3 w-full cursor-pointer" style={{ backgroundColor: "rgb(233, 61, 107)" }} onClick={()=> {
          setFilter((preState:any)=> {
            return {...preState, isAll:true, age:'연령',region:'지역',theme:'테마',sul:'술',hobby:'관심사'}
          })
        }}>ALL</div>
        {/* 연령 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={ageRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false, age: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연령">{filter.age}</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="ALL">ALL</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value={ageRegion.age}>{ageRegion.age}</option>
          </select>
        </div>
        {/* 지역 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={regionRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,region: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="지역">{filter.region}</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="전국">전국</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value={ageRegion.region}>{ageRegion.region}</option>
          </select>
        </div>
        {/* 테마 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={themeRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,theme: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="테마">{filter.theme}</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="소통포차">소통포차</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="게임포차">게임포차</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="헌팅포차">헌팅포차</option>
          </select>
        </div>
        {/* 술 종류 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={sulRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,sul: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="술">{filter.sul}</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="소주">소주</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="맥주">맥주</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="양주">양주</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="와인">와인</option>
          </select>
        </div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={hobbyRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,hobby: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="관심사">{filter.hobby}</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="애니메이션">애니메이션</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="게임">게임</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연애">연애</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="영화">영화</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연예인">연예인</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="축구">축구</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="운동">운동</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="뜨개질">뜨개질</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="코딩">코딩</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="프로젝트">프로젝트</option>
          </select>
        </div>
      </div>
      <div className="w-full">

      </div>
    </div>
    
  )
}

export default Tag