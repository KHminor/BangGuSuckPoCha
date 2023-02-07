import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changeUserList } from "src/store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
function UserReport(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reporttemp: any = useAppSelector((state: any) => {
    console.log("store에서 들고오는 값",state.mainCreateRoomList);
    return state.mainCreateRoomList;
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `https://i8e201.p.ssafy.io/api/admin/user`,
    }).then((r) => {
      console.log("받아오는데이터", r.data.data);
      dispatch(changeUserList(r.data.data));
    });
  }, []);
  return (
    <div className="inline-block align-baseline text-white h-screen w-screen grid grid-cols-9 gap-5">
      <div>
        <div></div>
      </div>
      <form className="col-span-7 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="w-full row-span-3 border-2 border-white">
          <div>신고관리</div>
          <table className="border-collapse border border-slate-400 w-full overflow-auto">
            <thead className="border border-slate-300">
              <tr>
                <td className="w-[7%]">신고번호</td>
                <td className="w-[12%]">신고자</td>
                <td className="w-[12%]">피신고자</td>
                <td className="w-[12%]">신고유형</td>
                <td className="w-[30%]">사유</td>
                <td className="w-[10%]">신고날짜</td>
                <td className="w-[10%]">처리결과</td>
                <td className="w-[7%]">벌점</td>
              </tr>
            </thead>
            <tbody>
              {/* <tr className="border border-slate-300">
                <td className="w-[7%]">{reporttemp.reportnum}</td>
                <td className="w-[12%]">{reporttemp.reporter}</td>
                <td className="w-[12%]">{reporttemp.reported}</td>
                <td className="w-[12%]">{reporttemp.type}</td>
                <td className="w-[30%]">{reporttemp.reason}</td>
                <td className="w-[10%]">{reporttemp.date}</td>
                <td className="w-[10%]">{reporttemp.result}</td>
                <td className="w-[7%]">{reporttemp.point}</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="w-[7%]">{reporttemp.reportnum}</td>
                <td className="w-[12%]">{reporttemp.reporter}</td>
                <td className="w-[12%]">{reporttemp.reported}</td>
                <td className="w-[12%]">{reporttemp.type}</td>
                <td className="w-[30%]">{reporttemp.reason}</td>
                <td className="w-[10%]">{reporttemp.date}</td>
                <td className="w-[10%]">{reporttemp.result}</td>
                <td className="w-[7%]">{reporttemp.point}</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="w-[7%]">{reporttemp.reportnum}</td>
                <td className="w-[12%]">{reporttemp.reporter}</td>
                <td className="w-[12%]">{reporttemp.reported}</td>
                <td className="w-[12%]">{reporttemp.type}</td>
                <td className="w-[30%]">{reporttemp.reason}</td>
                <td className="w-[10%]">{reporttemp.date}</td>
                <td className="w-[10%]">{reporttemp.result}</td>
                <td className="w-[7%]">{reporttemp.point}</td>
              </tr> */}
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
          <div
            onClick={() => {
              navigate("/userreport/wait");
            }}
          >
            대기목록
          </div>
        </div>
      </form>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default UserReport;
