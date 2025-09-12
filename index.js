require("dotenv").config();
const Mustache = require("mustache");
const fs = require("fs");
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetch = require("node-fetch");
const MUSTACHE_MAIN_DIR = "./main.mustache";

let DATA = {
  name: "WooSeok",
  date: new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "America/Toronto",
    // timeZone: "Asia/Seoul",
  }),
};

async function getWeatherInfo() {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=4924493&appid=${process.env.OPEN_WEATHER_MAP_KEY}&units=metric`;
  console.log(process.env.OPEN_WEATHER_MAP_KEY);
  console.log(url);
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      DATA.city = "Ottawa";
      DATA.temperature = data.main.temp;
      DATA.temp_min = data.main.temp_min;
      DATA.temp_max = data.main.temp_max;
      DATA.percentage =
        ((DATA.temperature - DATA.temp_min) / (DATA.temp_max - DATA.temp_min)) *
        100;
      DATA.weather = data.weather[0].description;
      DATA.weatherIcon = data.weather[0].icon;
    });
}

async function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync("README.md", output);
  });
}

async function run() {
  await getWeatherInfo();
  await generateReadMe();
}

run();
