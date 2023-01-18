import "./App.css";
import axios from "axios";
import React, {useState} from 'react'
function App() {
  let [data,setData] = useState()
  return (
    <div className="App">
      <div>
        <button
          onClick={() => {
            axios.get("http://54.237.250.181:8080/")
            .then((r)=> {
              console.log(r.data);
            })
          }}
        >
          버튼
        </button>
      </div>
    </div>
  );
}

export default App;
