const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos" // todos를 계속 사용하기 때문에, 실수하지 않으려고 새로운 변수 생성
//const toDos =[]; 새로운 todo가 생길때마다 toDos에 push를 시킴. 문제점 : toDos의 이전 항목들이 여기서 없어져버림
let toDos =[]; //해결 : let을 이용해 업데이트가 가능하게 해둠.

//localStorage에 array를 저장시킬 수 없고 오직 text형식만 저장됨. array형식이어야 하나하나의 아이템에 function를 쓸 수 있음.
function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos)); // JSON.stringify를 사용하여 string형식으로 저장시킴.

}
function deleteTodo(event) { //todolist중에 어떤 항목을 삭제
    const li = event.target.parentElement; // taget은 클릭된 HTML의 element. parentElement는 클릭된 element의 부모.
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // filter는 전에 array를 수정하는게 아니라 새로운 array를 만듦, 클릭된 항목의 id를 찾아 삭제(클릭한 li.id와 다른 toDo는 남김)
    //li.id는 number임으로 string으로 바꿔줘야함.
    saveToDos();
    li.remove();
} //문제 : "a" 아이템이 두개일때, 어떤 "a"가 지워졌는지 모르고 localstorage에서 삭제가 안됌 해결: 아이템 하나하나 id를 생성하자!


function paintToDo(newTodo){
    const li = document.createElement("li"); //변수이름은 li가 아니여도 상관없는데 createElement("li")는 li여야만 함.
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text; 
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteTodo);
    li.appendChild(span); //li 내부에 span태그 만들기
    li.appendChild(button);
    toDoList.appendChild(li);
}


function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = ""; // input value 비우기
    const newTodoObj = {
        text: newTodo,
        id: Date.now(), //id로 각각의 item을 구별함.
    };
    toDos.push(newTodoObj); //newTodo를 toDos array에 push
    paintToDo(newTodoObj); // 화면에 toDo를 그려줌
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

/* function sayHello(item){
    console.log("this is tge turn of", item);
}
paredToDos.forEach(sayHello); array에 있는 각각의 item 의 function 넣기

parsedToDos.forEach((item) => console.log("this is the turn of",item)); 
아이템에 function를 쓰는 것 보다 더 짧은 방식 (속도 차이는 없음.)
*/

if(savedToDos !== null){ //savedToDos가 null이 아니면 array형식으로 바꿈
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos; // 이젠에 toDos을 복원시킴.
    parsedToDos.forEach(paintToDo);

    
  
}

