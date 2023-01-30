import { useState } from "react";

function UserList(): React.ReactElement {
  type UserInfo = {
    nickname: string;
    age: number;
    yymmdd: number;
    birthday: number;
    region: string;
    manner: number;
    report: number;
    demerit: number;
    age_group: string;
    left_report: number;
    ban: string;
    admin: string;
  };
  const [user, setUser] = useState<UserInfo[] | null>(null);
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
    <div className="inline-block align-baseline text-white h-screen w-screen"></div>
  );
}

export default UserList;
