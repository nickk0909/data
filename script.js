
// date to converter Age  

function ageCount() {
    var now =new Date();                            //getting current date
    var currentY= now.getFullYear();                //extracting year from the date
    var currentM= now.getMonth();                   //extracting month from the date
      
    var dobget = document.getElementById("birthday").value; //getting user input
    var dob= new Date(dobget);                             //formatting input as date
    var prevY= dob.getFullYear();                          //extracting year from input date
    var prevM= dob.getMonth();                             //extracting month from input date
      
    var ageY =currentY - prevY;
    var ageM =Math.abs(currentM- prevM);          //converting any negative value to positive
      console.log(ageY)
      document.getElementById("age").value = ageY ;

    }

// Validate Form

function validateForm(){



    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;

 

// if(firstName == ""){
//     alert("First Name is required ! ");
//     return false;
// }
// if(lastName == ""){
//     alert("Last Name is required ! ");
//     return false;
// }


if(firstName == "" ||lastName == "" || email == ""){
    alert("Please fill the all filled !!! ");
    return false;
}
else if(!email.includes("@gmail.com")){
    alert(" Invalid Email Address Only Allow to '@gmail.com' ! ");
    return false;
}

return true;
}



// Show Data In Table

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
    html += "<td>" + element.age + " years" + "</td>";
    html += '<td>  <button onClick = "updateData('+index+')" class = "btn btn-warning "> Edit </button>  </td>';
    html += '<td> <button onClick = "deleteData('+index+')" class = "btn btn-danger"> Delete </button> </td>'
    html += "</tr>";
});

document.querySelector('#crudTable tbody').innerHTML = html;
}

document.onload = showData();

// Add Data

function AddData(){
if(validateForm() == true){
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var birthday = document.getElementById("birthday").value;
    var age = document.getElementById("age").value;
console.log(age);
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
    birthday : birthday,
    age : age,

});

localStorage.setItem("peopleList",JSON.stringify(peopleList));
showData();
 document.getElementById("firstName").value = "";
 document.getElementById("lastName").value = "";
 document.getElementById("email").value ="";
 document.getElementById("birthday").value="";
 document.getElementById("age").value="";


}
}

// Delete Data
function deleteData(index){
    
    var peopleList;
    
    if(localStorage.getItem("peopleList")==null){
        peopleList =[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
if(confirm("Are U Sure Delete All Data ?")){
    peopleList.splice(index,1);
    localStorage.setItem("peopleList",JSON.stringify(peopleList));
    showData();
    alert("successfull Delete Data ");
}

}


// Update Data
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
        document.getElementById("birthday").value = peopleList[index].birthday;
        document.getElementById("age").value = peopleList[index].age;
        
        console.log(age);

        document.querySelector("#update").onclick = function(){
            if(validateForm() == true){
                peopleList[index].firstName = document.getElementById("firstName").value;
                peopleList[index].lastName = document.getElementById("lastName").value;
                peopleList[index].email = document.getElementById("email").value;
                peopleList[index].birthday = document.getElementById("birthday").value;
                peopleList[index].age = document.getElementById("age").value;
              
                localStorage.setItem("peopleList",JSON.stringify(peopleList));
                showData();
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("email").value = "";
                document.getElementById("birthday").value = "";
                document.getElementById("age").value = "";
              

                document.getElementById("submit").style.display = "block";
                document.getElementById("update").style.display = "none";

            }  
        }
}

function deleteItems() {
    if(confirm("Are U Sure Delete All Data ?")){
    localStorage.clear();
    window.location.reload();
  }
}