import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function RoomList(): React.ReactElement {
  const navigate = useNavigate();

  const roomtemp: any = useAppSelector((state: any) => {
    return state.adminRoom;
  });

  return (
    <div className="inline-block align-baseline text-white h-screen w-screen grid grid-cols-9 gap-5">
      <div>
        <div></div>
      </div>
      <form className="col-span-7 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="w-full row-span-3 border-2 border-white">
          <div>포차관리</div>
          <table className="border-collapse border border-slate-400 w-full overflow-auto">
            <thead className="border border-slate-300">
              <tr>
                <td className="w-[7%]">포차번호</td>
                <td className="w-[7%]">테마</td>
                <td className="w-[7%]">잠금</td>
                <td className="w-[7%]">썰포차</td>
                <td className="w-[42%]">썰 타이틀</td>
                <td className="w-[20%]">만든시간</td>
                <td className="w-[10%]">방닫기</td>
              </tr>
            </thead>
            <tbody>
              {roomtemp.map(function (a: any, i: number) {
                return (
                  <tr>
                    <td className="w-[7%]">{roomtemp[i].num}</td>
                    <td className="w-[7%]">{roomtemp[i].theme}</td>
                    <td className="w-[7%]">{roomtemp[i].lock}</td>
                    <td className="w-[7%]">{roomtemp[i].sull}</td>
                    <td className="w-[42%]">{roomtemp[i].title}</td>
                    <td className="w-[20%]">
                      {roomtemp[i].startdate} / {roomtemp[i].starttime}
                    </td>
                    <td className="w-[10%] cursor-pointer">❌Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
