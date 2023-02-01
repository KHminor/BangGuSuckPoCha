function Tag(): JSX.Element {
  
  return (
    <div className="grid w-full min-w-[75rem] h-full " style={{gridTemplateColumns:'7fr 4fr', backgroundColor: "rgb(25, 25, 25)"}}>
      <div className="grid items-center w-full text-white " style={{gridTemplateColumns:'2.5rem 0.6fr 1fr 1fr 1fr 1fr 1fr'}}>
        <div className="flex justify-center items-center font-normal ml-2 h-1/3"> &nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div className="flex justify-center items-center font-normal border-0 rounded-full h-1/3 w-full" style={{ backgroundColor: "rgb(233, 61, 107)" }}>ALL</div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">연령 &nbsp;&nbsp;&nbsp;&nbsp;⮟</div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">지역 &nbsp;&nbsp;&nbsp;&nbsp;⮟</div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">테마 &nbsp;&nbsp;&nbsp;&nbsp;⮟</div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">술 &nbsp;&nbsp;&nbsp;&nbsp;⮟</div>
        <div className="flex justify-center items-center font-normal ml-2 border-2 rounded-full h-1/3">관심사 &nbsp;&nbsp;&nbsp;&nbsp;⮟</div>
      </div>
      <div className="w-full">

      </div>
    </div>
  )
}

export default Tag