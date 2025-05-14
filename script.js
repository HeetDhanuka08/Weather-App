const apiKey = '32ce18b4650a5b84e3d2f41a7b63510d';

function getWeatherIcon(weatherCode) {
    const icons = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    return icons[weatherCode] || 'fa-cloud';
}

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherDesc = document.getElementById('weather-desc');
    const errorMessage = document.getElementById('error-message');
    const weatherIcon = document.getElementById('weather-icon');

    if (!cityInput.value) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please enter a city name';
        return;
    }

    try {
        console.log('Fetching weather for:', cityInput.value);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'City not found');
        }
        
        // Update weather icon
        const iconClass = getWeatherIcon(data.weather[0].main);
        weatherIcon.className = `fas ${iconClass} weather-icon`;
        
        cityName.textContent = `Weather in ${data.name}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;
        weatherDesc.textContent = data.weather[0].description;
        errorMessage.style.display = 'none';

        // Add animation to the container
        document.querySelector('.container').classList.add('weather-loaded');
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Error: ${error.message}. Please check the city name and try again.`;
    }
}

// Allow Enter key to trigger search
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});