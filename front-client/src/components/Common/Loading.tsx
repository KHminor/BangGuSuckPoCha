import style from "./Loading.module.css"

const Loading = () => {
  return (
    <div className="bg-black bg-opacity-90 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-50 text-white">
      <div className="h-full flex flex-col justify-center items-center">
        <img className={`${style.loadingImg} w-24 h-24`} src={require("../../assets/img/Loading.png")} alt="loading"/>
        <div className={`${style.loadingText} font-bold text-xl`}>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
