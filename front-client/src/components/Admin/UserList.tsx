import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export type UserInfo = {
  nickname: string;
  age: number;
  yymmdd: number;
  birthday: string;
  region: string;
  manner: number;
  report: number;
  demerit: number;
  age_group: string;
  left_report: number;
  ban: boolean;
  admin: boolean;
};

function UserDetail() {
  return <div></div>;
}
let isDetail = false;

function UserSelect(user: UserInfo) {
  return (
    <div className="row-span-6 w-full h-[100%]">
      <div>
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border border-slate-200 w-[35%]">닉네임</th>
              <th className="border border-slate-300 w-[20%]">나이</th>
              <th className="border border-slate-300 w-[20%]">벌점</th>
              <th className="border border-slate-300 w-[25%]">test</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-10">
              <td className="border border-slate-300  " onClick={() => {}}>
                {user.nickname}
              </td>
              <td className="border border-slate-300  ">{user.age}</td>
              <td className="border border-slate-300  ">{user.age}</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
            <tr className="h-10">
              <td className="border border-slate-300 ">User1</td>
              <td className="border border-slate-300  ">20</td>
              <td className="border border-slate-300  ">4</td>
              <td className="border border-slate-300  ">❌Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
function UserList() {
  const navigate = useNavigate();
  const usertemp: any = useAppSelector((state: any) => {
    return state.adminUser[0];
  });
  console.log(usertemp);

  /* 
  - **이용자 식별자(PK)**
- 나이
- 닉네임
- 생년월일
- 생일
- 지역
- 매너온도
- 신고 분야 별 신고 당한 횟수
- 벌점
- 연령대
- 남은 신고 횟수 or 신고 횟수
- 정지 유무
- 관리자 ( 관리자 인지 아닌지 )
  */

  return (
    <div className="inline-block align-baseline text-white h-screen w-screen grid grid-cols-5 gap-5">
      <div>
        <div></div>
      </div>
      <div className="col-span-3 grid grid-rows-5 gap-5">
        <div className="text-8xl">AdminPage</div>
        <div className="w-full row-span-3 border-2 border-white grid grid-cols-2 overflow-auto">
          <UserSelect {...usertemp} />
          <div>{isDetail === true ? <UserDetail /> : null}</div>
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
          <div className="row-span-3"></div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default UserList;
