import axios from "axios";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { showRoomUserReportModal } from "../../store/store";
import styles from "./RoomUserProfile.module.css";

const RoomUserRepotModal = ({ userData }: { userData: any }) => {
  let dispatch = useAppDispatch();
  const { username, nickname } = userData.data;
  const [reportReason, setReportReason] = useState<string>("");
  const [reportType, setReportType] = useState<number>(0);
  const bgDiv = useRef<any>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "사유":
        setReportReason(value);
        break;
      case "타입":
        setReportType(Number(value));
        break;
    }
  };

  // 신고하는 함수
  const reportUser = async (event: any) => {
    event.preventDefault();
    console.log(username, reportReason, reportType);
    try {
      const rreport = await axios({
        method: "POST",
        url: "https://i8e201.p.ssafy.io/api/user/report",
        data: {
          attackerId: username,
          reportReason: reportReason,
          reportType: reportType,
          reporterId: 0,
        },
      });
      console.log("report", rreport);
    } catch (error) {
      console.log(error);
    }
    dispatch(showRoomUserReportModal());
  };

  // 취소 클릭시 모달 끄는 함수
  const closeReportModal = () => {
    dispatch(showRoomUserReportModal());
  };

  return (
    <div
      ref={bgDiv}
      className="bg-slate-800 bg-opacity-50 flex justify-center z-10 items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="bg-black w-[22%] px-14 pt-14 pb-7 rounded-md text-center">
        <form onSubmit={reportUser}>
          <div className="text-xl mb-4 font-bold text-white">
            <span className="font-bold text-red-500">{`${nickname}`}</span>
            님을 신고하시겠습니까?
          </div>
          <div className="flex justify-center">
            <div className="text-white w-1/2 flex-col justify-evenly">
              <div className="text-start">
                <input onChange={onChange} type="radio" name="타입" value={0} />
                <span className="text-lg pl-3">욕설</span>
              </div>
              <div className="text-start">
                <input onChange={onChange} type="radio" name="타입" value={1} />
                <span className="text-lg pl-3">성희롱</span>
              </div>
              <div className="text-start">
                <input onChange={onChange} type="radio" name="타입" value={2} />
                <span className="text-lg pl-3">부적절한 닉네임</span>
              </div>
              <div className="text-start">
                <input onChange={onChange} type="radio" name="타입" value={3} />
                <span className="text-lg pl-3">못생김</span>
              </div>
              <div className="text-start mt-5">
                <input
                  className="p-1 w-full text-black"
                  name="사유"
                  type="text"
                  value={reportReason}
                  placeholder="신고사유"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <input
              className={`${styles.createBtn} cursor-pointer`}
              type="submit"
              value="신고"
            />
            <input
              onClick={closeReportModal}
              className={`${styles.cancelBtn} cursor-pointer`}
              type="button"
              value="취소"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomUserRepotModal;
