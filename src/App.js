import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState} from 'react';
import { BsSearch } from 'react-icons/bs'


const appConstants = {
  apiKey: "f767a11b24fd482a6c98df730f9398d9",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  units: "metric",
  unknownValue: "NA",
  imageUrl: "http://openweathermap.org/img/wn/",
}
function getDateInformation() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return {
    day,
    date,
    month,
    year,
  };
}

function App() {

  const [city,setCity] = useState("");  
  const [weather,setWeather] =useState();
  const dateInformation = getDateInformation();

function submit(){
  
  fetch(
    `${appConstants.baseUrl}?q=${city?city:"hyderabad"}&units=${appConstants.units}&APPID=${appConstants.apiKey}`
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw Error("Error fetching data.");
    })
    .then((data) => {
    
      setWeather(data);   
      console.log(weather);

    })
    .catch((error) => {
      console.error(error);
      alert(`Error getting information`);
    });


}

useEffect(() =>
{
  submit()
},[]);
  return (
    <>
    <div className={"outerdiv"}>
    <div className={"searchbox"}>
      <input className={"searchinput"}
      type="text"
      placeholder="Enter City Name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />  
      <button onClick={submit}>
        <BsSearch/>
      </button>
    </div>
    <div className={"weatherDisplay"}>
      
    <img src={weather?`${appConstants.imageUrl}`+ `${weather.weather[0].icon}.png`:"http://openweathermap.org/img/wn/50d.png"}/>
      <h1 className="weatherinfo">{weather?parseInt(weather.main.temp):"Fetching data"}&deg;C</h1>
      <h1 className="weatherinfo">{weather?weather.name:"Fetching data"}</h1>
      <h2 className="weatherinfo" >{dateInformation.day}</h2>
      <h3 className="weatherinfo" >{dateInformation.date} {dateInformation.month} {dateInformation.year} </h3>
      <h2 className="weatherinfo" >{weather?weather.sys.country:"Fetching data"}</h2>
      <h3 className="weatherinfo">{weather?weather.weather[0].main:"Fetching data"}</h3>
      <p className="weatherinfo">{weather?weather.weather[0].description:"Fetching data"}</p>
    
    </div>
    </div>
    </>
  );
}

export default App;
