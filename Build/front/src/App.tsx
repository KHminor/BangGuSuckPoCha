import axios from 'axios';
import React from 'react';
import './App.css';

function App() {
  axios({
    method: 'get',
    url: 'http://54.162.253.127:8080/',
  })
  .then((r)=> {
    console.log(r.data);
  })
  return (
    <div className="App">
      <img src="https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="사진" style={{width: '100vw', height: '100vh'}} />
    </div>
  );
}

export default App;
