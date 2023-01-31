import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMain(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div className="inline-block align-baseline text-white h-screen w-screen grid grid-cols-5 gap-5">
      <div>
        <div></div>
      </div>
      <form className="col-span-3 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="w-full row-span-3 border-2 border-white grid grid-rows-6 gap-5">
          <div className="empty"> </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              navigate("/userList");
            }}
          >
            user list
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              navigate("/roomlist");
            }}
          >
            room list
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              navigate("/userreport");
            }}
          >
            report list
          </div>
          <div className="">Default Item list</div>
          <div className="">test2</div>
        </div>
        <div></div>
      </form>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default AdminMain;
