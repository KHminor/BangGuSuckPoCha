import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Common/Navbar";
import styles from "./Main.module.css";
import MainCreateRoom from "./MainCreateRoom";
import Tag from "./Tag";

function Main(): JSX.Element {
  // const [createRoom, setCreateRoom] = useState(false);

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
    <div className="">
      {/* {createRoom ? <MainCreateRoom /> : null} */}
      <Navbar />
      <div
        style={{
          height: "84%",
          overflow: "auto",
          backgroundColor: "rgb(25, 25, 25)",
        }}
      >
        <div style={{ height: "5%" }}>
          <Tag />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default Main;
