import React, { useState} from "react";
import axios from "axios";
import "./style.css";
import { Switch } from "antd";

function Home() {
  const [data, setData] = useState({
    celcius: 32,
    name: "Delhi",
    humidity: 28,
    speed: 3,
    image:'/Images/Clouds.png'
  });
  const [name, setName] = useState("");
  const [error,setError]=useState('');
  const [toggle,setToggle]=useState(false);

  const toggler=()=>{
    toggle?setToggle(false):setToggle(true);
  }

  const handleClick = () => {
    if (name !== "") {
      const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=517164d12889cbc3b88dbda6b05c08b9&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
            let imagePath='';
            if(res.data.weather[0].main==="Clouds"){
                imagePath="/Images/Clouds.png"
            } else if(res.data.weather[0].main==="Clear"){
                imagePath="/Images/Clear.png"
            } else if(res.data.weather[0].main==="Rain"){
                imagePath="/Images/drizzle.png"
            }else if(res.data.weather[0].main==="Drizzle"){
                imagePath="/Images/drizzle.png"
            }else if(res.data.weather[0].main==="Mist"){
                imagePath="/Images/snowy.png"
            }else{
                imagePath="/Images/Clouds.png"
            }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image:imagePath
          })
          setError('');
        })
        .catch((err) =>{
            if(err.response.status===404){
                setError("Invalid City Name")
            }else{
                setError('');
            }
            console.log(err)
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name.."
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="/Images/Search.png" onClick={handleClick} alt="" />
          </button>
        </div>
        <div className="error">
            <p>{error}</p>
            <Switch defaultChecked={false} onClick={toggler} checkedChildren="°F" unCheckedChildren="°C"/>
        </div>
        <div className="winfo">
          <img src={data.image} alt="" className="icon" />
          {toggle?<h1>{Math.round((data.celcius)*9/5+32)}°f</h1>:<h1>{Math.round(data.celcius)}°c</h1>}
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.png" alt="" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.png" alt="" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
