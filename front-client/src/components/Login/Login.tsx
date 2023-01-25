
import backimg from "../../assets/img/background_Login.png";
import styles from "./Login.module.css";

function Login(): JSX.Element {
  return (
    //tailwind 경계 사이즈변경
    <div className="w-screen h-screen flex">
      <div className="w-full">

      
        <img src={require("../../assets/img/background_Login.png")} alt="" className="w-px h-auto" />


        {/* <div className={styles.back}>asdasd</div> */}

        <div>방구석 포차</div>
        <div>Login해보자</div>
      </div>
    </div>
    //연습용 주석 추가
  );
}

export default Login;
