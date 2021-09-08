import React, { useState,useEffect,useRef } from "react";

function Weather_app() {
  const [name,setName] = useState("")
  const [place,setPlace] = useState("")
  const [country,setCountry] = useState("")
  const [temperature,setTemperature] = useState("")
  const [climate,setClimate] = useState("")
  const [img,setImg] = useState("")
  const p = useRef(null)

  useEffect(()=>{
    p.current.focus()
  })

  const change = (event) =>{
    setName(event.target.value)
  }

  const data = (eve) => {
      fetch(`https://api.weatherapi.com/v1/current.json?key=a5f43da630fd4dde84674851210709&q=${name}`)
      .then(response => response.json())
      .then(res => { 
       setPlace(res.location.name)
       setCountry(res.location.country)
       setTemperature(res.current.temp_c)
       setClimate(res.current.condition.text)
       setImg(res.current.condition.icon)
       setName("")
      })
  }

  const today = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days =["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return ` ${day} , ${date}th ${month} ${year}`
  }
  return (  
    <div className ={
      (typeof place != "undefined")? 
      (temperature > 20)? "warm" : "cold"
      : "cold"
    }>
      <main>
      {(typeof place != "undefined")? 
        (
        <div>
          <div className ="searchbox">
            <input
             type="text"
             placeholder = "search proper place name...."
             value ={name}
             onChange ={change}
             className="searchbar"
             ref={p}
             />
             <button className ="button" onClick ={data}>search</button>
          </div>
          <div className ="location">
            <div className ="name">{place} , {country}</div>
            <div className ="current-info">{today(new Date())}</div>
          </div>
          <div className = "weather">
            <div className ="temp"> {Math.floor(temperature)}°C</div>
            <br />
            <div className ="climate"> {climate}</div>
            <img src = {img} alt= ""/>
          </div>
        </div>
        ) : ("")}
         <form className ="owner">
            <input type="test" value ="Made with ❤️ Akhil" disabled = "true" className = "input" />
          </form> 
      </main>
    </div>
  );
}

export default Weather_app;
