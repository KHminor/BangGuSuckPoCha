import { useNavigate } from "react-router-dom";

function AdminLogin(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="inline-block align-baseline text-white h-screen w-screen grid grid-cols-5 gap-5">
      <div>
        <div></div>
      </div>
      <form className="col-span-3 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="row-span-3 border-2 border-white grid grid-rows-6 gap-2">
          <div className="row-span-2 text-6xl"> Admin Login </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="text-justify pl-9 text-4xl">ID :</div>
            <input
              type="text"
              className="col-span-4 bg-black border-2"
              placeholder="ID를 입력하세요"
            />
            <div></div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="text-justify pl-9 text-4xl">PW : </div>
            <input
              type="text"
              className="col-span-4 bg-black border-2"
              placeholder="PW를 입력하세요"
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-4"></div>
            <button
              onClick={() => {
                navigate("/adminmain");
              }}
            >
              Login
            </button>
            <div></div>
          </div>
          <div> </div>
        </div>
        <div></div>
      </form>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default AdminLogin;
