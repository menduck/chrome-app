const API_KEY = "4a355879899584bde7c4a156f79235a4";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(reponse => reponse.json().then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name ;
        weather.innerText= `${data.weather[0].main} / ${data.main.temp}`;
    })); //자바스크립트가 대신 URL을 부름
}
function onGeoOkError(){
    alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoOkError); //브라우저에서 위치를줌
