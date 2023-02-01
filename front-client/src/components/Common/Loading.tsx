import style from "./Loading.module.css"

const Loading = () => {
  return (
    <div className="w-screen h-screen text-white">
      <div className="h-full flex flex-col justify-center items-center">
        <img className={`${style.loadingImg} w-24 h-24`} src={require("../../assets/img/Loading.png")} />
        <div className={`${style.loadingText} font-bold text-xl`}>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
