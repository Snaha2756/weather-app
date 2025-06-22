async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">⚠ Please enter a city name.</p>`;
    return;
  }

  const apiKey = "3cf6e3fbb2b520c927c6089bfe889dde"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading message
  document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Debug: view the data in console
    console.log(data);

    if (response.ok) {
      // Show weather info
      const output = `
        <h2>📍 ${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: <strong>${data.main.temp}°C</strong></p>
        <p>🌤 Condition: <strong>${data.weather[0].main} (${data.weather[0].description})</strong></p>
        <p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>
        <p>🌬 Wind: <strong>${data.wind.speed} m/s</strong></p>
      `;
      document.getElementById("weatherResult").innerHTML = output;
    } else {
      // If city not found or other API error
      document.getElementById("weatherResult").innerHTML = `<p style="color:red;">❌ ${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("weatherResult").innerHTML = `<p style="color:red;">⚠ Could not fetch data. Check your internet or API key.</p>`;
  }
}
