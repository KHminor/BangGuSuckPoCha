import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginLoading(): React.ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParameter = window.location.search;
    // ?Auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxcnZ2d29Wb2h3T2xuOUpFbkdtd1lGNzBfOUt3LVprQk0xN2tpY3gzSGRZIiwiZXhwIjoxNjc1MTgxMTU3LCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiMXJ2dndvVm9od09sbjlKRW5HbXdZRjcwXzlLdy1aa0JNMTdraWN4M0hkWSJ9.zk-eGoa1Q00e2HG3puEYN8-6v8S_KWXIDTJgFaBO2SXiYfg8yp5bBDetycTYkwDVpJSwVLpAGCDOracEbDhOOg
    //&Refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxcnZ2d29Wb2h3T2xuOUpFbkdtd1lGNzBfOUt3LVprQk0xN2tpY3gzSGRZIiwiZXhwIjoxNjc1NzU4MzM3LCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiMXJ2dndvVm9od09sbjlKRW5HbXdZRjcwXzlLdy1aa0JNMTdraWN4M0hkWSJ9.AZxBF4n4LVmXsuduA5P-H8Xmlu5OiA65uaMNohfM-Nu_1fGnWMklURIXVPg_wPjKQ78RHkF30nogco8xfLH0Mg
    console.log(urlParameter);

    const urlParams = new URLSearchParams(urlParameter);

    const entries: any = urlParams.entries();
    // entries[0][0] : Auth
    // entries[0][1] : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxcnZ2d29Wb2h3T2xuOUpFbkdtd1lGNzBfOUt3LVprQk0xN2tpY3gzSGRZIiwiZXhwIjoxNjc1MTgxMTU3LCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiMXJ2dndvVm9od09sbjlKRW5HbXdZRjcwXzlLdy1aa0JNMTdraWN4M0hkWSJ9.zk-eGoa1Q00e2HG3puEYN8-6v8S_KWXIDTJgFaBO2SXiYfg8yp5bBDetycTYkwDVpJSwVLpAGCDOracEbDhOOg

    // entries[1][0] : Refresh
    // entries[1][1] : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxcnZ2d29Wb2h3T2xuOUpFbkdtd1lGNzBfOUt3LVprQk0xN2tpY3gzSGRZIiwiZXhwIjoxNjc1NzU4MzM3LCJ1c2VySWQiOjMsInVzZXJuYW1lIjoiMXJ2dndvVm9od09sbjlKRW5HbXdZRjcwXzlLdy1aa0JNMTdraWN4M0hkWSJ9.AZxBF4n4LVmXsuduA5P-H8Xmlu5OiA65uaMNohfM-Nu_1fGnWMklURIXVPg_wPjKQ78RHkF30nogco8xfLH0Mg

    // entries[2][0] : role
    // entries[2][1] : NEWBIE/USER/SECESSION/ADMIN
    if (entries[2][0] === "NEWBIE") {
      localStorage.setItem("accessToken", entries[0][1]);
      localStorage.setItem("refreshToken", entries[1][1]);
      navigate("/signup");
    } else if (entries[2][0] === "USER") {
      localStorage.setItem("accessToken", entries[0][1]);
      localStorage.setItem("refreshToken", entries[1][1]);
      navigate("/main");
    } else if (entries[2][0] === "SECESSION") {
      alert("탈퇴된 회원입니다.");
      navigate("/");
    } else if (entries[2][0] === "ADMIN") {
      localStorage.setItem("accessToken", entries[0][1]);
      localStorage.setItem("refreshToken", entries[1][1]);
      navigate("/adminlogin");
    }
  }, []);

  return <div></div>;
}

export default LoginLoading;
