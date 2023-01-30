import { useNavigate } from "react-router-dom";

function AdminLogin(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen">
      <div className="text-white border-4 border-white relative top-44 left-40 h-96 w-4/5">
        <div className="absolute left-1/3 text-5xl">AdminLogin</div>

        <div className="absolute left-0 top-1/2">
          <table>
            <div className="text-4xl p-2">
              <div>
                ID :{" "}
                <input
                  className="border-2 border-white bg-black text-white"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                />
              </div>
              PW :{" "}
              <input
                className="border-2 border-white bg-black text-white"
                placeholder="패스워드를 입력해주세요"
              ></input>
            </div>
            <button
              type="submit"
              onClick={() => {
                navigate("/adminmain");
              }}
              className="absolute right-2 border-2 border-white"
            >
              로그인
            </button>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
