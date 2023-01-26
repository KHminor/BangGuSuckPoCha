import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";
import Main from "../Main/Main";
import Login from "../Login/Login";

function LayoutPage({ component }: { component: any }): JSX.Element {
  // console.log("component", component);
  console.log("여기는 레이아웃페이지 입니당")
  const [main, setMain] = useState(false);
  const [login, setLogin] = useState(false);
  
  useEffect(() => {
    switch (component) {
      case "main":
        setMain(true);
        console.log(main);
        break;
      case "login":
        setLogin(true);
        console.log(login);
        break;
    }
  }, []);

  const checkMenuState: any = useSelector((state: any) => {
    return state.menuClickCheck;
  });
  const alarmClickCheck: any = useSelector((state: any) => {
    return state.alarmClickCheck;
  });

  if (checkMenuState === true) {
    document.getElementById("menu")?.classList.remove("hidden");
  } else {
    document.getElementById("menu")?.classList.add("hidden");
  }

  if (alarmClickCheck === true) {
    document.getElementById("alarm")?.classList.remove("hidden");
  } else {
    document.getElementById("alarm")?.classList.add("hidden");
  }
  return (
    // <div className="grid screen min-w-[1200px] h-screen min-h-screen" style={{backgroundColor: "rgb(25, 25, 25)", gridTemplateRows:'180px 1fr'}}>
    <>
    <Navbar />
      {main ? <Main /> : null}
      {login ? <Login /> : null}
    </>
    //   <div className="container mx-auto min-w-[1200px] bg-green-800" style={{}}>

    //   </div>
    // </div>
  );
}
export default LayoutPage;
