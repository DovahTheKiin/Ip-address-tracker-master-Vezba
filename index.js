const searchBtn = document.querySelector(".search-btn")
const wrapper = document.querySelector(".wrapper")
const infoCards = document.querySelector(".info-cards")
const mapBox = document.getElementById("map")
const inputIP = document.querySelector(".input-ip")
const inputBar = document.querySelector(".input-bar")
const errorMessage = document.querySelector(".error-message")
const lowerBg = document.querySelector(".lower-bg")


let lat;
let long;
let country;
let count = 0;

let IPRegex = /^(?!0\.0\.0\.0|255\.255\.255\.255)((((2([0-4][0-9]|5[0-5]))|1[0-9]{2}|[0-9]{1,2})\.){3}(((2([0-4][0-9]|5[0-5]))|1[0-9]{2}|[0-9]{1,2})))$/;
let domainRegex = /^(?:\*\.)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,6}$/;

searchBtn.addEventListener('click', () => {
    wrapper.classList.add("is-open")
    country = inputIP.value;
    if(country.match(IPRegex)) {
        getIP();
    } else if(country.match(domainRegex)) {
        getIP();
    } else {
        inputBar.classList.add("error");
        errorMessage.classList.remove("hidden");
    }
})

inputIP.addEventListener('click', () => {
    inputBar.classList.remove("error");
    errorMessage.classList.add("hidden");
})

async function getIP() {
        const ipAddress = document.querySelector(".ip-address")
        const cityState = document.querySelector(".city-state")
        const timeZone = document.querySelector(".time-zone")
        const ispName = document.querySelector(".isp-name")

        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_nc9LEVEximuAWND8gpfAhr3QXZJB9&domain=${country}`);
        const data = await response.json();

        lat = Number(data.location.lat);
        long = Number(data.location.lng);


        let cityName = data.location.city;
        let region = data.location.region;
        let potalCode = data.location.postalCode;

        ipAddress.innerText = data.ip;
        cityState.innerText = `${cityName}, ${region} ${potalCode}`;
        timeZone.innerText = `UTC ${data.location.timezone}`;
        ispName.innerText = data.isp;

        createMap();
}

let map;

async function createMap() {
    if(count === 0) {
        map = L.map('map');
        count = 1;
    }
    map.setView([lat, long], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat, long]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
} 