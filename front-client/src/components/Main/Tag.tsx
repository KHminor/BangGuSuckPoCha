import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'src/store/hooks'
import {
  changeMainCreateRoomList,
} from "../../store/store";
import styles from './Tag.module.css'

function Tag(): JSX.Element {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = localStorage.getItem('Username')
  const [filter, setFilter] = useState<any>({isAll:true ,age:'연령',region:'지역',theme:'테마',sul:'술',hobby:'태그', speedEnter: false})
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
    console.log(ageRegion, setAgeRegion)
    console.log('갱신해따!!')
    if (filter.isAll) {
      console.log('원상복구')
      ageRef.current.value = '연령'
      regionRef.current.value = '지역'
      themeRef.current.value = '테마'
      sulRef.current.value = '술'
      hobbyRef.current.value = '태그'
      axios.get('https://i8e201.p.ssafy.io/api/pocha/all').then((r)=> {
        if (filter.speedEnter) {
          const roomData:any[] = r.data.data
          const enterPossibleRoomList:any[] = roomData.filter((data:any)=> {
            return ((data.age === 0 || data.age === ageRegion.age) && (data.region === '전국' || data.region === ageRegion.region) && (data.themeId !== "T2B0") && (data.isPrivate === false) && (data.limitUser>data.totalCount))
          })
          // 입장 가능한 방을 랜덤으로 하나 골라서 
          const randomPickRoom:any = enterPossibleRoomList[Math.floor(Math.random()*enterPossibleRoomList.length)]
          // 입장 요청
          const username = localStorage.getItem('Username')
          console.log('픽한 방: ', randomPickRoom)
          const themeId = randomPickRoom.themeId
          const pochaId = randomPickRoom.pochaId
          console.log('==============','username:', username, 'pochaId: ', pochaId, 'themeId: ', themeId)
          axios({
            method: 'post',
            url: 'https://i8e201.p.ssafy.io/api/pocha/enter',
            data: {
              // 초대 받은거를 승인하는거라 false
              isHost: 'false',
              pochaId: pochaId,
              username: username
              }
            })
            .then(()=> {
              console.log('슬라이싱값: ',themeId.slice(0,2))
              if (themeId.slice(0,2) === 'T0') {
                console.log('소통방입장')
                navigate(`/storyroom/${pochaId}`)
              } else if (themeId.slice(0,2) === 'T1') {
                console.log('게임방입장')
                navigate(`/gameroom/${pochaId}`)
              }
            })

        } else {
          const currenDataFirst = r.data.data.reverse()
          console.log(r.data)
          dispatch(changeMainCreateRoomList(currenDataFirst));
        }
      }) 
    } else {
      console.log('현재 클릭한 태그정보: ',filter)
      let age
      let region
      let theme:any
      let sul
      let hobby
      let fastClick
      const tagList:any[] = []
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
              tagList.push(value)
            }
        } else if (key === 'hobby') {
            if (value === '태그') {
              hobby = null
            } else {
              hobby = value
              tagList.push(value)
            }
        } else if (key === 'speedEnter') {
          fastClick = value
          
        }
        console.log(key,value)
      }
      // console.log('빠른입장 ',)
      console.log('포차 조사',filter.isAll,age,region,theme,sul,hobby, tagList,'빠른 입장 유무', fastClick)
      const sendTagList = tagList.join(',')
      axios({
        method: 'get',
        url: 'https://i8e201.p.ssafy.io/api/pocha',
        params: {
          age:age, region:region,themeId:theme,tag:sendTagList
        }
      }).then((r)=> {
        if (filter.speedEnter) {
          // 전체로 선택되어있을 수도 있기에 조회된 방 데이터를 가지고 
          // 연령(All(0)||본인 연령(ageRegion.age)), 지역(전국,본인 지역(ageRegion.region)), 잠금여부, 인원수(입장가능한 인원수) 필터해서
          // 이후 해당 pochaId에 맞는 방으로 이동 (포차테마에 따라 다른 방으로 이동)
          const roomData:any[] = r.data.data
          
          const enterPossibleRoomList:any[] = roomData.filter((data:any)=> {
            console.log('방목록: ',data)
            return ((data.age === 0 || data.age === ageRegion.age) && (data.region === '전국' || data.region === ageRegion.region) && (data.themeId !== "T2B0") && (data.isPrivate === false) && (data.limitUser>data.totalCount))
          })
          
          // 입장 가능한 방을 랜덤으로 하나 골라서 
          const randomPickRoom:any = enterPossibleRoomList[Math.floor(Math.random()*enterPossibleRoomList.length)]
          // 입장 요청
          const username = localStorage.getItem('Username')
          console.log('픽한 방: ', randomPickRoom)
          const themeId = randomPickRoom.themeId
          const pochaId = randomPickRoom.pochaId
          console.log('==============','username:', username, 'pochaId: ', pochaId, 'themeId: ', themeId)
          axios({
            method: 'post',
            url: 'https://i8e201.p.ssafy.io/api/pocha/enter',
            data: {
              // 초대 받은거를 승인하는거라 false
              isHost: 'false',
              pochaId: pochaId,
              username: username
              }
            })
            .then(()=> {
              console.log('슬라이싱값: ',themeId.slice(0,2))
              if (themeId.slice(0,2) === 'T0') {
                console.log('소통방입장')
                navigate(`/storyroom/${pochaId}`)
              } else if (themeId.slice(0,2) === 'T1') {
                console.log('게임방입장')
                navigate(`/gameroom/${pochaId}`)
              }
            })

        } else {
          console.log("스피드 아님")
          // 그냥 방 해당 태그에 맞게 갱신해주기
          dispatch(changeMainCreateRoomList(r.data.data));
          console.log(r.data)
        }
      }).catch((e)=> {
        toast.error("다시 시도해주세요");
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
            return {...preState, isAll:true, age:'연령',region:'지역',theme:'테마',sul:'술',hobby:'태그', speedEnter: false}
          })
        }}>전체</div>
        {/* 연령 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3 select-wrap">
          <select ref={ageRef} className={`flex justify-center items-center cursor-pointer ${styles.select}`} name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false, age: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연령">연령</option>
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
            <option className="text-center bg-[rgb(25, 25, 25)]" value="지역">지역</option>
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
            <option className="text-center bg-[rgb(25, 25, 25)]" value="테마">테마</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="소통포차">소통포차</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="게임포차">게임포차</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="미팅포차">미팅포차</option>
          </select>
        </div>
        {/* 술 종류 */}
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={sulRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,sul: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="술">술</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="소주">소주</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="맥주">맥주</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="와인">와인</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="위스키">위스키</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="보드카">보드카</option>
          </select>
        </div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">
          <select ref={hobbyRef} className='flex justify-center items-center cursor-pointer' name="" id="" style={{backgroundColor:'rgb(25, 25, 25)'}} onChange={(e)=> {
            setFilter((preState:any)=> {
              return {...preState, isAll:false ,hobby: e.target.value}
            } )
          }}>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="태그">태그</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="애니메이션">애니메이션</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="게임">게임</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연애">연애</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="영화">영화</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="음악">음악</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="연예인">연예인</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="직장">직장</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="잡담">잡담</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="운동">운동</option>
            <option className="text-center bg-[rgb(25, 25, 25)]" value="축구">축구</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end items-center w-full h-full">
        <div className={`flex justify-center items-center text-white rounded-3xl cursor-pointer w-[6rem] h-[2.65rem] ${styles.cancelBtn}`} onClick={()=> {
          setFilter((preState:any)=> {
            return {...preState, speedEnter: true}
          })
        }}>빠른 입장</div>
      </div>
    </div>
    
  )
}

export default Tag