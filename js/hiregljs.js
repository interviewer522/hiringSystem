$(document).ready(function() {
  var firstName, lastName, photoUrl, token;
  firstName=localStorage.getItem("firstName");
  lastName=localStorage.getItem("lastName");
  photoUrl=localStorage.getItem("photoUrl");
  token="Bearer "+localStorage.getItem("token"); 

  getLocations();
  getPositions();

  //login via button
  $("#button-login").click(function(e) {
    e.preventDefault();
    var userName = $("#username").val();
    var password = $("#password").val();
    //call the verify function
    verify(userName, password);
  });

  //logout button
  $("#arrow-right").click(function () {
    logout();
  });
  //my interviews button
  $("#my-interviews").click(function(){    
    $("#sub-heading").text("My Interviews");    
  });
  //new interview button
  $("#new-interview").click(function(){
    $("#sub-heading").text("New Interview");    
  }); 
  //toggling between my interviews and new interview buttons
  $("#side-bottom-bar > a").click(function() {
    var x = $(this).index();
    $("#table-interviews").toggle(x===0);
    $("#content-footer, #tab-interview, #tab-candidate").toggle(x===1);
  });
  //closing of modal window
  $("#closeIcon").click(function(){
    $(".modal").hide();
  });
  //login verify function for verification of login name and password
  function verify(userName, password) {
    $.ajax({
      url: "http://localhost:8081/api/auth/login",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      async: false,
      //json object to be sent to the authentication url
      data: JSON.stringify({
              "userName": userName,
              "password": password
            }),
      success: function(data) {
        var user = data.user;
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        localStorage.setItem("photoUrl", user.photoUrl);
        localStorage.setItem("token", data.token);
        window.location.href = "hiregl.html";
      },
      error: function(){
        alert("nefunguje");
      }
    });
  }
  //logout function
  function logout() {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/auth/logout",
      type: "POST",
      async: false,
      success: function() {        
        window.location.href = "login.html";
      },
      error: function(){
        alert("nefunguje "+token);
      }
    });
  }  
  //get locations function
  function getLocations() {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/locations",
      type: "GET",
      dataType: "json",
      contentType: "application/json",      
      //json object to be sent to the authentication url
      success: function(data) {        
        for (i in data) {      
          $("#select-loc").append("<option>"+data[i]+"</option>");
        }        
      },
      error: function(){
        alert("Neviem nacitat lokacie.");
      }
    });
  }
  //get locations function
  function getPositions() {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/positions",
      type: "GET",
      dataType: "json",
      contentType: "application/json",      
      //json object to be sent to the authentication url
      success: function(data) {        
        for (i in data) {                
          $("#select-position").append("<option>"+data[i]+"</option>");
        }        
      },
      error: function(){
        alert("Neviem nacitat rooms");
      }
    });
  }

});

