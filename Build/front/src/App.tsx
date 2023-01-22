import axios from "axios";
import React from "react";
import "./App.css";
import { useAppSelector, useAppDispatch } from "./store/hooks";

// store state 변경 함수 불러오기 
// import { increment, incrementByAmount } from "./store/store";

function App() {
  axios({
    method: "get",
    url: "http://54.162.253.127:8080/",
  }).then((r) => {
    console.log(r.data);
  });

  // 아래와 같이 store state 가져오기
  const name = useAppSelector((state) => state.name1);
  const count = useAppSelector((state) => state.counter1.count);
  // 아래와 같이 dispatch 할 수 있도록 변수에 dispatch라고 담아서 사용하기
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      
      {/* 아래와 같이 작성하여 사용 */}
      {/* <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          버튼<p>{count}</p>
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(incrementByAmount(16));
          }}
        >
          버튼2<p>{count}</p>
        </button>
      </div> */}
    </div>
  );
}

export default App;
