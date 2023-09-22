function searchWeather() {
    const apiKey = 'a49757af6c49f10fecc442dc2f2f7bfe';
    const cityName = document.getElementById('search').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const location = data.name + ', ' + data.sys.country;
            const temperature = data.main.temp + '°C';
            const condition = data.weather[0].description;

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = 'Temperature: ' + temperature;
            document.getElementById('condition').textContent = 'Condition: ' + condition;

            document.querySelector('.weather-info').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}
