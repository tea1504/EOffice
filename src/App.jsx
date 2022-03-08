import logo from "./logo.svg";
import "./App.css";
import lg from "./apis/Login";
import dv from "./apis/DonVi";
import { useEffect, useState } from "react";
import cookie from 'js-cookie'

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const { data: response } = await lg.login({'ma': '000001', 'matkhau': '12345'});
        // cookie.set('jwt', response);

        const { data: response } = await dv.get();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
