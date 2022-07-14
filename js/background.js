const images = [
    "0.jpg", "1.jpg", "2.jpg"
];

const chosenImage = images[Math.floor(Math.random()* images.length)];

const bgImage = document.createElement("img");

bgImage.src =`img/${chosenImage}`; // js에서 <img src="img/0.jpg"> 로 만듦. document에 있는게 아니라서 body에 넣는 코드 필요

document.body.appendChild(bgImage);
