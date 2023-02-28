// Personal API Key for OpenWeatherMap API
const server = 'http://localhost:5678'
const apiKey = "7f08434367c2ba250fa357c9da4847a7";


// Function called by event listener 
const search = function () {
  const zip = document.getElementById("zip").value
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${apiKey}&units=metric`


  getApiData(apiUrl).then((data) => {
    return neededData = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      feelslike: data.main.feels_like,
      windspeed: data.wind.speed,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
    }
  })

    .then((neededData) => postData(server + "/add", neededData))

    .then(() => retrieveData(server + "/all"))

    .then((projectData) => updateThePage(projectData))
};

// Event listener to add function to existing HTML DOM element
document.getElementById("search").addEventListener("click", search);



// Function to get API Data
const getApiData = (url) => {
  return fetch(url)
    .then((res) => res.json())
  //.then((data) => console.log(data))

};


// Function to post data to the server
const postData = function (server, neededData) {
  fetch(server,
    {
      method: 'POST',
      credentials: "same-origin",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(neededData)
    })

};


// Function to get Project Data from the server
const retrieveData = (url) => {

  return fetch(url)
    .then((res) => res.json())
  //.then((result) => console.log(result))

};



// Function to update the page
const updateThePage = function (projectData) {
  console.log(projectData)

  document.getElementById("city").innerHTML = projectData.city;
  document.getElementById("temp").innerHTML = projectData.temp + '&degC';
  document.getElementById("description").innerHTML = projectData.description;
  document.getElementById("feels-like").innerHTML = 'feels like ' + projectData.feelslike;
  document.getElementById("wind-speed").innerHTML = 'speed ' + projectData.windspeed;
  document.getElementById("pressure").innerHTML = 'pressure ' + projectData.pressure;
  document.getElementById("humidity").innerHTML = 'humidity ' + projectData.humidity;
  document.getElementById("weather-data").style.opacity = '1';
};

