import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";

function LayoutPage():JSX.Element {
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
    <div className="grid screen min-w-[1200px] h-screen min-h-screen" style={{backgroundColor: "rgb(25, 25, 25)", gridTemplateRows:'180px 1fr'}}>
      <Navbar />
      
      <div className="container mx-auto min-w-[1200px] bg-green-800" style={{}}>
        
      </div>
    </div>

  );
}
export default LayoutPage