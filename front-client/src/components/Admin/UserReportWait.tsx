import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

function UserReportWait(): React.ReactElement {
  const navigate = useNavigate();

  const reprottemp: any = useAppSelector((state) => {
    // console.log(state.adminreport[1]);
    return state.adminreport[1];
  });
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
                <td className="w-[10%]"></td>
                <td className="w-[7%]"></td>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-slate-300">
                <td className="w-[7%]">{reprottemp.reportnum}</td>
                <td className="w-[12%]">{reprottemp.reporter}</td>
                <td className="w-[12%]">{reprottemp.reported}</td>
                <td className="w-[12%]">{reprottemp.type}</td>
                <td className="w-[30%]">{reprottemp.reason}</td>
                <td className="w-[10%]">{reprottemp.date}</td>
                <td className="w-[10%]">O</td>
                <td className="w-[7%]">X</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="w-[7%]">{reprottemp.reportnum}</td>
                <td className="w-[12%]">{reprottemp.reporter}</td>
                <td className="w-[12%]">{reprottemp.reported}</td>
                <td className="w-[12%]">{reprottemp.type}</td>
                <td className="w-[30%]">{reprottemp.reason}</td>
                <td className="w-[10%]">{reprottemp.date}</td>
                <td className="w-[10%]">O</td>
                <td className="w-[7%]">X</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="w-[7%]">{reprottemp.reportnum}</td>
                <td className="w-[12%]">{reprottemp.reporter}</td>
                <td className="w-[12%]">{reprottemp.reported}</td>
                <td className="w-[12%]">{reprottemp.type}</td>
                <td className="w-[30%]">{reprottemp.reason}</td>
                <td className="w-[10%]">{reprottemp.date}</td>
                <td className="w-[10%]">O</td>
                <td className="w-[7%]">X</td>
              </tr>
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
              navigate("/userreport");
            }}
          >
            처리목록
          </div>
        </div>
      </form>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default UserReportWait;
