import axios from "axios";
import { log } from "console";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  changeDetailRoom,
  changeDetailUser,
  changeMainCreateRoomList,
  changeSelectDetailUser,
} from "src/store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function RoomDetail() {
  const detailRoom: any = useAppSelector((state: any) => {
    console.log("선택", state.DetailRoom);
    return state.DetailRoom;
  });
  return (
    <div className="row-span-6 w-full overflow-x-auto  max-h-[34.5rem] grid grid-rows-12">
      <div className="grid grid-cols-2 ">
        <div className="w-[10rem]">pochaId : </div>
        <div className="max-w-[10rem]">{detailRoom.pochaId}</div>
        {/* <div className="max-w-[10rem]">detailRoom.profile</div> */}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">themeId : </div>
        <div className="w-[10rem] max-w-[10rem]">{detailRoom.themeId}</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">isPrivate :</div>
        {detailRoom.isPrivate===true?<div className="max-w-[10rem]">O</div>:<div className="max-w-[10rem]">X</div>}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">isSsul :</div>
        {detailRoom.isSsul===true?<div className="max-w-[10rem]">O</div>:<div className="max-w-[10rem]">X</div>}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">ssulTitle : </div>
        {detailRoom.isSsul===true?<div className="max-w-[10rem]">{detailRoom.ssulTitle}</div>:<div className="max-w-[10rem]">썰없음</div>}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">username : </div>
        <div className="w-[10rem] max-w-[10rem]">detailRoom.username</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">point : </div>
        <div className="max-w-[10rem]">detailRoom.point</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">userId : </div>
        <div className="max-w-[10rem]">detailRoom.userId</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[10rem]">manner : </div>
        <div className="max-w-[10rem]">detailRoom.manner</div>
      </div>
    </div>
  );
}

function RoomSelect() {
  const dispatch = useAppDispatch();
  const isSelect: any = useAppSelector((state: any) => {
    console.log(state.SelectDetailUser);
    return state.SelectDetailUser;
  });

  const room: any = useAppSelector((state: any) => {
    console.log("만들어진방", state.mainCreateRoomList);
    return state.mainCreateRoomList;
  });
  return (
    <div className="w-full overflow-x-auto max-h-[34rem]">
      <table className="border-collapse border border-slate-400 w-full ">
        <thead className="border border-slate-300">
          <tr>
            <td className="w-[9%]">포차번호</td>
            <td className="w-[7%]">테마</td>
            <td className="w-[6%]">잠금</td>
            <td className="w-[6%]">썰포차</td>
            <td className="w-[42%]">썰 타이틀</td>
            <td className="w-[20%]">만든시간</td>
            <td className="w-[10%]">자세히보기</td>
          </tr>
        </thead>
        <tbody>
          {room.map(function (a: any, i: number) {
            return (
              <tr>
                <td className="w-[7%]">{room[i].pochaId}</td>
                <td className="w-[7%]">{room[i].themeId}</td>

                {room[i].isPrivate === true ? (
                  <td className="w-[7%]">O</td>
                ) : (
                  <td className="w-[7%]">X</td>
                )}
                {room[i].isSsul === true ? (
                  <>
                    <td className="w-[7%]">O</td>
                    <td className="w-[42%]">{room[i].title} test</td>
                  </>
                ) : (
                  <>
                    <td className="w-[7%]">X</td>
                    <td className="w-[42%]">썰없슈</td>
                  </>
                )}
                <td className="w-[20%]">
                  {room[i].createAt}
                  {/* / {room[i].endAt} */}
                </td>
                <td
                  className="w-[10%] cursor-pointer"
                  onClick={() => {
                    // console.log("몇번째야?", room[i]);
                    dispatch(changeDetailRoom(room[i]));
                    dispatch(changeSelectDetailUser(true));
                    // console.log("선택한방", Selectroom);
                    // console.log(isSelect);
                  }}
                >
                  {"==>"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RoomList(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSelect: any = useAppSelector((state: any) => {
    return state.SelectDetailUser;
  });
  const room: any = useAppSelector((state: any) => {
    // console.log("만들어진방", state.mainCreateRoomList);
    return state.mainCreateRoomList;
  });
  useEffect(() => {
    axios({
      method: "get",
      url: "https://i8e201.p.ssafy.io/api/admin/pocha",
    }).then((r) => {
      // console.log(r.data.data);
      dispatch(changeMainCreateRoomList(r.data.data));
    });
  }, []);

  return (
    <div className="inline-block align-baseline text-white h-screen w-full grid grid-cols-9 gap-5">
      <div>
        <div></div>
      </div>
      <form className="col-span-7 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="w-full row-span-3 border-2 border-white grid grid-cols-2">
          {room ? <RoomSelect /> : null}
          {isSelect === true ? <RoomDetail /> : null}
        </div>
        <div className="grid grid-cols-4">
          <div
            className=""
            onClick={() => {
              navigate("/adminmain");
            }}
          >
            admin main으로
          </div>

          <div className="col-span-2"></div>
          <div></div>
        </div>
      </form>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default RoomList;
