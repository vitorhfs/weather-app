const linkUrl = `https://api.openweathermap.org/data/2.5/weather?q=curitiba&appid=9d12ad16f1977f8d849595f48d5ac394&lang=pt_br`;

fetch(linkUrl)
    .then((data) => data.json())
    .then((json) => jsonAttributes(json));

const weatherContainer = document.querySelector('.weather-container');

const convertToCelsius = (value) => {
    return Math.round(value - 273.15);
}

const convertUnix = (value) => {
    let date = new Date(value * 1000);
    let hours = (date.getHours() < 10 ? '0' : '' ) + date.getHours();
    let minutes = (date.getMinutes() < 10 ? '0' : '' ) + date.getMinutes();
    let seconds = (date.getSeconds() < 10 ? '0' : '' ) + date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
}

const changeBackgroundImage = (source) => {
    weatherContainer.style.backgroundImage = `url(${source})`;
}

const jsonAttributes = (data) => {
    const imgSource = `images/${data.weather[0].main}.jpg`
    changeBackgroundImage(imgSource);

    const html = `
        <section class="main-container blur">
            <div class="none ">
            <button><img src="images/sound.png"></button>
            </div>
            <h1>${convertToCelsius(data.main.temp)}º c</h1>
            <h2>sensação de ${convertToCelsius(data.main.feels_like)}º C</h2>
            <p>${data.weather[0].description}</p>
            <img class="w-icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">
        </section>
        <section class="informations blur">
            <div class="info-box">
                <p>Temperatura Máxima</p><span>${convertToCelsius(data.main.temp_max)}º c</span>
            </div>
            <div class="info-box">
                <p>Temperatura Mínima</p><span>${convertToCelsius(data.main.temp_min)}º c</span>
            </div>
            <div class="info-box">
                <p>Nascer do sol</p><span>${convertUnix(data.sys.sunrise)}</span>
            </div>
            <div class="info-box">
                <p>Pôr do sol</p><span>${convertUnix(data.sys.sunset)}</span>
            </div>
            <div class="info-box">
                <p>Humidade do ar</p><span>${data.main.humidity}%</span>
            </div>
            <div class="info-box">
                <p>Pressão Atmosférica</p><span>${data.main.pressure}hPa</span>
            </div>
        </section>
    `
    weatherContainer.innerHTML += html;
}
