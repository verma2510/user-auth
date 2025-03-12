// import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './pages/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/signup/Signup';

function App() {
  // const [data, setData] = useState(null);
  // useEffect(()=>{
  //   fetch("http://localhost:8081/api")
  //   .then(res => res.json())
  //   .then(data => setData(data.message))
  //   .catch(error => console.log(error))
  // })
  return (
    <div className="App">
    {/* <h1 className="title">{data ? data : 'Loadingggggg'}</h1> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
