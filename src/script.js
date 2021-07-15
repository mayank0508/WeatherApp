let weather = {
  apiKey: 'f81584a7e55b2e65c19748fc62248e48', // i went to open weather.org and then made my account after doing these things i just
  // went to the option of API Key and fetch the Key from that place.
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then(response => response.json())
      .then(data => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;
    function whenSunset(sunset) {   /// these are the function that converted UTC to local date formate
      let sunSet = sunset * 1000;
      const dateObject = new Date(sunSet);
      const humanDateFormat = dateObject.toLocaleString();
      return humanDateFormat;
    }
    function whenSunrise(sunrise) {
        let sunRise = sunrise * 1000;
        const dateObject = new Date(sunRise);
        const humanDateFormat = dateObject.toLocaleString();
        return humanDateFormat;
      }
    console.log(
      name,
      icon,
      description,
      temp,
      humidity,
      speed,
      sunrise,
      sunset
    );
    document.querySelector('.city').innerText = name;
    document.querySelector('.temp').innerText = temp.toFixed(1) + '°C';  // here toFixed is used to retrict the temp to one decimals
    document.querySelector('.description').innerText = description.toUpperCase();
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png" 
    document.querySelector('.wind').innerText =
      'Wind Speed: ' + (speed*3.6).toFixed(1) + ' km/h'; // here i converted m/s to km/h by multiplying it by 3.6
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.sunset').innerText = "Sunset : " + whenSunset(sunset); // here i made 2 function that converted UTC to normal date formate
    document.querySelector('.sunrise').innerText = "Sunrise : " + whenSunrise(sunrise);
  }
};
