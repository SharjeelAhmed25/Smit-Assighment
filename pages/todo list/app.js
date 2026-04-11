

var todos = [];
var perent = document.getElementById("todo-perent");
var message = document.getElementById("message");
var indexupdatetodo = null;

function storage(){
    var data = localStorage.getItem("todos");
    data = JSON.parse(data);

    if(data !== null){
        todos = data;
    }
    renderTodos();
}

storage();

function addtodo(){

    var todoinp = document.getElementById("todo-input").value;

    if(todoinp.trim().length < 1){
        message.innerText = "please enter this field";
        message.style.color = "red";
        return;
    }

    var todoobject = {
        id: new Date().getTime(),
        userinp: todoinp,
        iscompleted: false
    }

    todos.push(todoobject);
    localStorage.setItem('todos', JSON.stringify(todos));

    document.getElementById("todo-input").value = "";
    message.innerText = "";

    renderTodos();
}

function edit(id){

    var todoinp = document.getElementById("todo-input");

    for(var i = 0; i < todos.length; i++){
        if(todos[i].id == id){

            todoinp.value = todos[i].userinp;
            indexupdatetodo = i;

            document.getElementById("add_btn").style.display = "none";
            document.getElementById("update_btn").style.display = "block";
            break;
        }
    }
}

function update(){

    var todoinp = document.getElementById("todo-input");

    if(todoinp.value.trim() === ""){
        message.innerText = "enter value";
        message.style.color = "red";
        return;
    }

    todos[indexupdatetodo].userinp = todoinp.value;

    localStorage.setItem('todos', JSON.stringify(todos));

    document.getElementById("add_btn").style.display = "block";
    document.getElementById("update_btn").style.display = "none";

    document.getElementById("todo-input").value = "";
    message.innerText = "";

    renderTodos();
}

function deleteTodo(id){

    for (var i = 0; i < todos.length; i++){
        if (todos[i].id == id){
            todos.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function deleteall(){

    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function done(id){

    for(var i = 0; i < todos.length; i++){
        if(todos[i].id == id){
            todos[i].iscompleted = true;
            break;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function renderTodos(){

    perent.innerHTML = '';

    for(var i = 0; i < todos.length; i++){

        var doneclass = todos[i].iscompleted ? "done" : "";
        var disabled = todos[i].iscompleted ? "disabled" : "";

        perent.innerHTML += `
        <div class="todo ${doneclass}">
            <span>${todos[i].userinp}</span>
            <button onClick="edit(${todos[i].id})">✏️</button>
            <button onClick="deleteTodo(${todos[i].id})">🗑️</button>
            <button ${disabled} onClick="done(${todos[i].id})">✅</button>
        </div>
        `;
    }
}

