import { useNavigate } from "react-router-dom";

function AdminLogin(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="inline-block align-baseline text-white h-screen w-screen">
      <div className="text-7xl">ADMIN PAGE</div>
      <div className="border-4 border-white relative top-44 left-40 h-96 w-4/5">
        <div className="inline-block align-baseline text-5xl">AdminLogin</div>

        <div className="absolute top-[40%] left-[20%] w-[60%]">
          <table className="w-full">
            <div className="relative text-4xl p-2 w-[80%] h-3/4">
              <>
                <div className="absolute">ID : </div>
                <input
                  className="border-2 border-white bg-black text-white"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                />
              </>
              <>
                <div className="absolute ">PW : </div>
                <input
                  className="border-2 border-white bg-black text-white"
                  placeholder="패스워드를 입력해주세요"
                ></input>
              </>
              <button
                type="submit"
                onClick={() => {
                  navigate("/adminmain");
                }}
                className="absolute right-2 top-[100%] border-2 border-white"
              >
                로그인
              </button>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
