async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = `<div class="text-center">Loading...</div>`;

  const apiKey = '391844afcb99ca717a98a3db3f99e589';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p class="text-danger">City not found. Please try again.</p>`;
      return;
    }

    const html = `
      <h4>${data.name}, ${data.sys.country} <img src="https://flagsapi.com/${data.sys.country}/flat/32.png"></h4>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="mb-2 animate__animated animate__fadeInDown">
      <p class="text-capitalize">${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp.toFixed(1)}°C</p>
      <p><strong>Feels like:</strong> ${data.main.feels_like.toFixed(1)}°C</p>
      <p><strong>Min:</strong> ${data.main.temp_min.toFixed(1)}°C | <strong>Max:</strong> ${data.main.temp_max.toFixed(1)}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      <p class="text-muted small">Last updated: ${new Date().toLocaleString()}</p>
    `;
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `<p class="text-danger">Error fetching weather data.</p>`;
  }
}
