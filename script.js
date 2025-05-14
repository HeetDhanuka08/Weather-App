// API Configuration
const apiKey = 'YOUR-API-KEY';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const errorMessage = document.getElementById('error-message');
const container = document.querySelector('.container');

// Weather Icon Mapping
const weatherIcons = {
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

// Get Weather Icon
function getWeatherIcon(weatherCode) {
    return weatherIcons[weatherCode] || 'fa-cloud';
}

// Show Error Message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    container.classList.remove('weather-loaded');
}

// Hide Error Message
function hideError() {
    errorMessage.style.display = 'none';
}

// Update Weather UI
function updateWeatherUI(data) {
    cityName.textContent = `Weather in ${data.name}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    weatherDesc.textContent = data.weather[0].main;
    
    // Update weather icon
    const iconClass = getWeatherIcon(data.weather[0].main);
    weatherIcon.className = `fas ${iconClass} weather-icon`;
    
    // Add animation class
    container.classList.add('weather-loaded');
    hideError();
}

// Get Weather Data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherUI(data);
        } else {
            showError(data.message || 'City not found');
        }
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        console.error('Weather API Error:', error);
    }
}

// Event Listeners
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Initial focus on input
cityInput.focus();