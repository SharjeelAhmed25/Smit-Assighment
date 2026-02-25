var caurses = [];
var editindex = null;

function addcaurses() {

    var caursename = document.getElementById("cuarseinput").value.trim();
    var instructor = document.getElementById("instructorinput").value.trim();
    var duration = document.getElementById("durationinput").value.trim();
    var level = document.getElementById("levelinput").value.trim();
    var message = document.getElementById("message");

    if (caursename === "" || instructor === "" || duration === "" || level === "") {
        message.innerText = "all feilds are required";
        message.style.color = "red";
        return
    }
    var dataobj = {
        id: (new Date().getTime()) + Math.floor(Math.random() * 999),
        caursename: caursename,
        instructor: instructor,
        duration: duration,
        level: level,
    };
    caurses.push(dataobj);
    var caursename = document.getElementById("cuarseinput").value = "";
    var instructor = document.getElementById("instructorinput").value = "";
    var duration = document.getElementById("durationinput").value = "";
    var level = document.getElementById("levelinput").value = "";
      message.innerText = "";
    document.getElementById("updatebtn").style.display = "none";

   



displayscreen();
}

function edit(index){
    var selected = caurses[index];

     var caursename = document.getElementById("cuarseinput").value = selected.caursename;
    var instructor = document.getElementById("instructorinput").value = selected.instructor;
    var duration = document.getElementById("durationinput").value = selected.duration;
    var level = document.getElementById("levelinput").value = selected.level;

    editindex = index;
   document.getElementById("addbtn").style.display = "none";
    document.getElementById("updatebtn").style.display = "inline-block";

}

function update(){

    if(editindex === null){
        return
    }

     var caursename = document.getElementById("cuarseinput").value.trim();
    var instructor = document.getElementById("instructorinput").value.trim();
    var duration = document.getElementById("durationinput").value.trim();
    var level = document.getElementById("levelinput").value.trim();
    var message = document.getElementById("message");

    if(caursename === "" || instructor === "" || duration === "" || level === ""){
        message.innerText = "all feild are required";
        message.style.color = "red";
        return
    }
 
    caurses[editindex].caursename = caursename;
    caurses[editindex].instructor = instructor;
    caurses[editindex].duration = duration;
    caurses[editindex].level = level;

    editindex = null;

     var caursename = document.getElementById("cuarseinput").value = "";
    var instructor = document.getElementById("instructorinput").value = "";
    var duration = document.getElementById("durationinput").value = "";
    var level = document.getElementById("levelinput").value = "";
      message.innerText = "";

 document.getElementById("addbtn").style.display = "inline-block";
    document.getElementById("updatebtn").style.display = "none";
displayscreen()

}

function deleteCourse(index){
 caurses.splice(index , 1);
 displayscreen();
}


function displayscreen(){
    var list = document.getElementById("listcaurses");
    list.innerHTML = "";

    for(var i = 0; i < caurses.length; i++){
        list.innerHTML += `
        <li>
            <b> caurse : ${caurses[i].caursename}</b> | instructor : ${caurses[i].instructor} | duration : ${caurses[i].duration} | level :${caurses[i].level}
    
            <button class="edit-btn" onClick="edit(${i})">edit</button>
            <button class="delete-btn" onClick="update(${i})" id="upd">update</button>
            <button onclick="deleteCourse(${i})">Delete</button>
            
         </li>
        
        ` ;
        var caursename = document.getElementById("cuarseinput").value = "";
    var instructor = document.getElementById("instructorinput").value = "";
    var duration = document.getElementById("durationinput").value = "";
    var level = document.getElementById("levelinput").value = "";
      message.innerText = "";
    }
  
}
