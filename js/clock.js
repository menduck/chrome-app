const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date(); // getHours는 number임으로 string로 바꿔줘야함.
    
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");


  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock(); // 새로고침하자마자 00:00:00 표시를 막아줌

setInterval(getClock, 1000);

