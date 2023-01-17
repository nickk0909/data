  var selectedRow = null;

  //show Alert

  function showAlert(message,className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(),8000);

  }


  // date to converter Age

  function ageCount() {

      var now = new Date(); //getting current date
      var currentY = now.getFullYear(); //extracting year from the date
      var currentM = now.getMonth(); //extracting month from the date

      var dobget = document.getElementById("birthday").value; //getting user input
      var dob = new Date(dobget); //formatting input as date
      var prevY = dob.getFullYear(); //extracting year from input date
      var prevM = dob.getMonth(); //extracting month from input date

      if((currentY - prevY )> currentY){
          alert("invalid Date");
          return false;
        }


      var ageY = currentY - prevY ;
      var ageM = Math.abs(currentM - prevM); //converting any negative value to positive
      console.log(ageY);
      document.getElementById("age").value = ageY;

  }

  // Validate Form

  function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var prevY = document.getElementById("age").value;
    var currentY = document.getElementById("age").value;
    var ageY = document.getElementById("age").value;




    if (firstName == "") {
      showAlert("requied fill First Name !!! " , "danger");
      return false;
    } else if (lastName == "") {
      showAlert("requied fill Last Name !!! ", "danger");
      return false;
    } else if (email == "") {
      showAlert("requied fill Email !!! ", "danger");
      return false;
    } else if (!email.includes("@")) {
      showAlert(" Invalid Email Address !!! ", "danger");
      return false;
    }

    if(ageY == ""){
      showAlert("requied fill Date !!! ", "danger");
      return false;
    }

    if((currentY - prevY )> currentY){
      showAlert("invalid Date !!!!!!!!!!", "danger");
      return false;
    }
    if( 18 > ageY){
      showAlert("You are not eligible because 18 years not completed", "danger");
      return false;
    }
    if( 99 < ageY){
      showAlert("You age 100 years more please contact administrator ", "danger");
      return false;
    }




  return true;
  }

  // Show Data In Table

  function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    var html = "";

    peopleList.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.firstName + "</td>";
      html += "<td>" + element.lastName + "</td>";
      html += "<td>" + element.email + "</td>";
      html +=  "<td>"+ '<div type="none" >'+"<span class='badge badge-dark' style='background-color: white; font-size:14px; color:black; margin:2px;'>" + element.age + "</span>" +' <span class="sr-only"> ' +" years" +"</span>"+ "</div>" + "</td>";
      html +=
        '<td>  <button onClick = "updateData(' +
        index +
        ')" class = "btn btn-warning "> Edit </button>  </td>';
      html +=
        '<td> <button onClick = "deleteData(' +
        index +
        ')" class = "btn btn-danger"> Delete </button> </td>';
      html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
  }

  document.onload = showData();

  // Add Data

  function AddData() {
    if (validateForm() == true) {
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var email = document.getElementById("email").value;
      var birthday = document.getElementById("birthday").value;
      var age = document.getElementById("age").value;
      console.log(age);
      var peopleList;
      if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
      } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }

      peopleList.push({
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        age: age,
      });

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("birthday").value = "";
      document.getElementById("age").value = "";
      showAlert("Successfully Insert Data " , "primary");
    }
  }

  // Delete Data
  function deleteData(index) {
    var peopleList;

    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    if (confirm("Are U Sure Delete  Data ?")) {
      peopleList.splice(index, 1);
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
      showAlert("Successfully Delete Data " , "danger");
    }
  }

  // Update Data
  function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peopleList;

    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstName").value = peopleList[index].firstName;
    document.getElementById("lastName").value = peopleList[index].lastName;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("birthday").value = peopleList[index].birthday;
    document.getElementById("age").value = peopleList[index].age;

    console.log(age);

    document.querySelector("#update").onclick = function () {
      if (validateForm() == true) {
        peopleList[index].firstName = document.getElementById("firstName").value;
        peopleList[index].lastName = document.getElementById("lastName").value;
        peopleList[index].email = document.getElementById("email").value;
        peopleList[index].birthday = document.getElementById("birthday").value;
        peopleList[index].age = document.getElementById("age").value;

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("birthday").value = "";
        document.getElementById("age").value = "";

        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
        showAlert("Successfully update Data " , "info");
      }
    };
  }

  function deleteItems() {
    if (confirm("Are U Sure Delete All Data ?")) {
      localStorage.clear();
      window.location.reload();
      alert("Successfully Delete All Data " );
    }
    

  }
