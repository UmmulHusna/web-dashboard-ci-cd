async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = `<div class="text-center">Loading...</div>`;

  const apiKey = '391844afcb99ca717a98a3db3f99e589';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<p class="text-danger">City not found. Please try again.</p>`;
      return;
    }

    const html = `
      <h4>${data.name}, ${data.sys.country}</h4>
      <p><strong>Temperature:</strong> ${data.main.temp.toFixed(1)}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;
    resultDiv.innerHTML = html;
  } catch (error) {
    resultDiv.innerHTML = `<p class="text-danger">Error fetching weather data.</p>`;
  }
}
