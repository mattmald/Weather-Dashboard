
const init = async () => {
    let city = document.querySelector('input').value;
    if(!city) return;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

    let coord = await fetch(url).then(data=>data.json());
    let { name, lat, lon } = coord[0];

    let url2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

    let data = await fetch(url2).then(data=>data.json());
    // console.log(data);
    let { daily, current: {dt,temp,humidity,wind_speed, uvi, weather:[{description,icon}]}} = data;
    console.log(daily,dt,temp)
  
    let showData = `
        <article class="data">
        <h2>${city}</h2>
        <h3>${data.current.weather[0].description}</h3>
        <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="">
        <p>Temperature: ${data.current.temp}°F</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_speed}mph</p>
        <p>UV Index: ${data.current.uvi}</p>
        </article>
    `;
    document.querySelector('#current').innerHTML = showData;

    let forecastHTML =""
    for(let i=0;i<5;i++){
        forecastHTML += `
        <article class="data">
      
        <h3>${daily[i].weather[0].description}</h3>
        <img src="https://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png" alt="">
        <p>Temperature: ${daily[i].temp.day}°F</p>
        <p>Humidity: ${daily[i].humidity}%</p>
        <p>Wind Speed: ${daily[i].wind_speed}mph</p>
        <p>UV Index: ${daily[i].uvi}</p>
        </article>
        `
    }
    document.querySelector('#forecast').innerHTML = forecastHTML;
}


//   <h2>${moment().unix(daily[i].dt).format("MM/DD/YYYY")}</h2>
//function to get 5 day forecast

document.querySelector('button').addEventListener('click', init);

