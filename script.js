function validateForm(){



    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
 

if(firstName == ""){
    alert("First Name is required ! ");
    return false;
}
if(lastName == ""){
    alert("Last Name is required ! ");
    return false;
}
if(email == ""){
    alert("email is required ! ");
    return false;
}

return true;
}

function showData(){
var peopleList;
if(localStorage.getItem("peopleList")==null){
    peopleList = [];
}else{
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
}
var html = "";

peopleList.forEach(function(element,index){
    html += "<tr>";
    html += "<td>" + element.firstName + "</td>";
    html += "<td>" + element.lastName + "</td>";
    html += "<td>" + element.email + "</td>";
    html += '<td>  <button onClick = "updateData('+index+')" class = "btn btn-warning "> Edit </button>  </td>';
    html += '<td> <button onClick = "deleteData('+index+')" class = "btn btn-danger"> Delete </button> </td>'
    html += "</tr>";
});

document.querySelector('#crudTable tbody').innerHTML = html;
}

document.onload = showData();

function AddData(){
if(validateForm() == true){
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;

    var peopleList;
if(localStorage.getItem("peopleList")==null){
    peopleList = [];
}else{
    peopleList = JSON.parse(localStorage.getItem("peopleList"))
}

peopleList.push({

    firstName : firstName,
    lastName : lastName,
    email : email,

});

localStorage.setItem("peopleList",JSON.stringify(peopleList));
showData();
 document.getElementById("firstName").value = "";
 document.getElementById("lastName").value = "";
 document.getElementById("email").value ="";


}
}


function deleteData(index){
    var peopleList;
    
    if(localStorage.getItem("peopleList")==null){
        peopleList =[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index,1);
    localStorage.setItem("peopleList",JSON.stringify(peopleList));
    showData();
}

function updateData(index){
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peopleList;

    if(localStorage.getItem("peopleList") == null){
        peopleList =[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstName").value = peopleList[index].firstName;
        document.getElementById("lastName").value = peopleList[index].lastName;
        document.getElementById("email").value = peopleList[index].email;
        

        document.querySelector("#update").onclick = function(){
            if(validateForm() == true){
                peopleList[index].firstName = document.getElementById("firstName").value;
                peopleList[index].lastName = document.getElementById("lastName").value;
                peopleList[index].email = document.getElementById("email").value;
              
                localStorage.setItem("peopleList",JSON.stringify(peopleList));
                showData();
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("email").value = "";
              

                document.getElementById("submit").style.display = "block";
                document.getElementById("update").style.display = "none";

            }  
        }
}