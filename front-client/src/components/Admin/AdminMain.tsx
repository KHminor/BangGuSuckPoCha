import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  changeMainCreateRoomList,
  changeSelectDetailUser,
  changeUserList,
} from "src/store/store";
// test지워도됨
function AdminMain(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
              axios({
                method: "get",
                url: `https://i8e201.p.ssafy.io/api/admin/user`,
              }).then((r) => {
                console.log(r.data.data);
                dispatch(changeUserList(r.data.data));
                dispatch(changeSelectDetailUser(false));
              });
              navigate("/userList");
            }}
          >
            user list
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              axios({
                method: "get",
                url: "https://i8e201.p.ssafy.io/api/admin/pocha",
              }).then((r) => {
                console.log(r.data.data);
                dispatch(changeMainCreateRoomList(r.data.data));
              });
              navigate("/roomlist");
            }}
          >
            room list
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {              
              navigate("/userreport/wait");
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
