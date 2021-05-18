const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const datahide = document.querySelector(".data_hide");

const fullDate = new Date();
const dayToday = fullDate.getDay();
const month = fullDate.getMonth();
const todayDate = fullDate.getDate();

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const todayDay = days[dayToday];

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const currMonth = months[month];

day.innerText = todayDay;
today_date.innerText = `${todayDate} ${currMonth}`;

const getInfo = async (e) => {
  e.preventDefault();
  //   alert("I am clicked");

  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerHTML = "City name cannot be empty";
    datahide.classList.add("data_hide");
  } else {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7b9fdc9109f22481906b90edb40df664`;

    try {
      const response = await fetch(url);

      let data = await response.json();

      temp.innerText = `${data.main.temp} °C`;
      city_name.innerText = `${data.name}, ${data.sys.country}`;
      const tempMood = data.weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      }

      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Enter the city name properly";
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
