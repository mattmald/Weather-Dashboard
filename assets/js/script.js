const init = async () => {
    let city = document.querySelector('input').value;
    if(!city) return;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

    let coord = await fetch(url).then(data=>data.json());
    let { name, lat, lon } = coord[0];

    let url2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

    let data = await fetch(url2).then(data=>data.json());
    let { daily, current: {dt,temp,humidity,wind_speed, uvi, weather:[{description,icon}]}} = data;

//make div for data

    console.log(data);
}

// function showData() {
//     if()
// }

// function forecast(city){
//     var url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;
// }


document.querySelector('button').addEventListener('click', init);