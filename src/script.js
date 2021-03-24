


let now = new Date();
let hours = now.getHours();
if(hours < 10){
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hours}:${minutes}`;

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"  ];
let day = days[now.getDay()];
let currDay = document.querySelector(".date");
currDay.innerHTML = `${day}`;

function showCity(event){
event.preventDefault();
  let input = document.querySelector("#city-name");
  let heading = document.querySelector("li.choose-city");
  let city = input.value;
  heading.innerHTML = `${city} `;
    let units  = "metric";
  let apiKey = "5d480a9ea4973e7dfcb6ca4444c1582f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getTemperature);
} 

function getTemperature(response){

    let roundTemp = Math.round(response.data.main.temp);
  let currTemp = document.querySelector("#temps");
let theHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#hum");
  let roundWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  let roundFeel = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feel");
  feels.innerHTML = `Feels like: ${roundFeel}°C`;
  wind.innerHTML = `Wind: ${roundWind}mph`;
  humidity.innerHTML = `Humidity: ${theHumidity}%`; 
  currTemp.innerHTML = `${roundTemp}`;

}
  
function changeCurr(response){
  console.log(response);
let name = document.querySelector("li.choose-city");
let cityName = response.data.name;
name.innerHTML = `${cityName}`;
let temps = document.querySelector("#temps");
let currTemp = Math.round(response.data.main.temp);
temps.innerHTML = `${currTemp}`;
let hum = document.querySelector("#hum");
hum.innerHTML =`Humidity: ${response.data.main.humidity}`;
let wind = document.querySelector("#wind");
let roundWind = Math.round(response.data.wind.speed);
wind.innerHTML = `Wind: ${roundWind}mph`;
let feel = Math.round(response.data.main.feels_like);
let feels = document.querySelector("#feel");
feels.innerHTML = `Feels like: ${feel}°C`;



}


function getCurrent(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
   let units  = "metric";
  let apiKey = "5d480a9ea4973e7dfcb6ca4444c1582f";
  
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(changeCurr);
}
function getLocation(){
  navigator.geolocation.getCurrentPosition(getCurrent);
}

let buttonCurr = document.querySelector("#current");
buttonCurr.addEventListener("click", getLocation);


let searchButton = document.querySelector("#choose-city");
searchButton.addEventListener("submit", showCity);