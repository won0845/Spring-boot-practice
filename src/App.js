import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/test')
        .then((res) => {
          setHello(res.data);
        })
  }, []);
  return (
      <div className="App">
          Spring Boot로 부터 받은 데이터 : {hello}
      </div>
  );
}


export default App;
