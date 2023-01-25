<<<<<<< HEAD:front/src/components/Login/Login.tsx
import backimg from "../../assets/img/background_Login.png";
import styles from "./Login.module.css";
=======
// import backimg from "../../assets/img/background_Login.png";
import "./Login.module.css";
>>>>>>> 37b1efc0dc521646be361b7dad559babfe0a0b60:Build/front/src/components/Login/Login.tsx

function Login(): JSX.Element {
  return (
    //tailwind 경계 사이즈변경
    <div className="w-screen h-screen flex">
      <div className="w-full">
<<<<<<< HEAD:front/src/components/Login/Login.tsx
      
        <img src={require("../../assets/img/background_Login.png")} alt="" className="w-px h-auto" />


        {/* <div className={styles.back}>asdasd</div> */}
=======
        {/* <img src={backimg} className="bgimg w-full" /> */}
>>>>>>> 37b1efc0dc521646be361b7dad559babfe0a0b60:Build/front/src/components/Login/Login.tsx
        <div>방구석 포차</div>
        <div>Login해보자</div>
      </div>
    </div>
    //연습용 주석 추가
  );
}

export default Login;
