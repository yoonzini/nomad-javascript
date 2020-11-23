const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");


const TODO_LS = 'toDos';

function filterFn(toDo) {
    return toDo.id === 1 
}


let toDos = [];


function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    console.log(event.target.parentNode);
    const cleanToDos = toDos.filter((toDo) => {
        console.log(li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
    console.log(cleanToDos);
}

function saveTodos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    console.log(text);

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }

    toDos.push(toDoObj);
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function something(toDo) {
    console.log(toDo.text);
    paintToDo(toDo.text);
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS);
    if (loadedToDos !== null) {
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);

        parsedToDos.forEach(something);
    } 
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();