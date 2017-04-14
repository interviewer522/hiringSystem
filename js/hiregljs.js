$(document).ready(function() {
  var firstName, lastName, photoUrl, token;
  firstName=localStorage.getItem("firstName");
  lastName=localStorage.getItem("lastName");
  photoUrl=localStorage.getItem("photoUrl");
  token="Bearer "+localStorage.getItem("token"); 
  $("#photo").append(photoUrl);
  $("#current-name").append(firstName+" "+lastName);   
  getLocations();  
  getPositions();
  getAssignedPersons();

  //login via button
  $("#button-login").click(function(e) {
    e.preventDefault();    
    var userName = $("#username").val();
    var password = $("#password").val();   
    //call of the verify function
    verify(userName, password);
   // $("#current-name").append(firstName+" "+lastName);    
  });
  //logout via arrow icon
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
  //on click to rooms selector
  $("#select-room").on("click", function() {
    getRooms();     
  });
  //toggling between my interviews and new interview buttons
  $("#side-bottom-bar > a").click(function() {
    var x = $(this).index();
    $("#table-interviews").toggle(x===0);
    $("#content-footer, #tab-interview, #tab-candidate").toggle(x===1);
  });
  //closing of modal window
  $("#closeIcon").click(function() {
    $(".modal").hide();
  });
  $("#save").click(function(){
    newInterview();
  });
  //login verify function for verification of login name and password
  function verify(userName, password) {
    $.ajax({
      url: "http://localhost:8081/api/auth/login",
      type: "POST",
      dataType: "json",
      contentType: "application/json",           
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
      error: function() {        
        $("#error-incorrect").text("Invalid username or password. Please try again.");      
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
      success: function() {        
        window.location.href = "login.html";
      },
      error: function() {
        $("#warning-message").text("Error logging out.");
        var warningMessage = $("#arrow-right").attr("data");
        $(warningMessage).show();
        $(warningMessage).find(".close-modal, #button-warning").click(function(){
          $(warningMessage).hide(); 
        });            
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
      success: function(data) {        
        for (i in data) {      
          $("#select-loc").append("<option>"+data[i]+"</option>");
        }                     
      },
      error: function() {
        $("#warning-message").text("Error getting Locations.");
        var warningMessage = $("#select-loc").attr("data");
        $(warningMessage).show();
        $(warningMessage).find(".close-modal, #button-warning").click(function(){
          $(warningMessage).hide(); 
        });                   
      }
    });
  }
  //get positions function
  function getPositions() {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/positions",
      type: "GET",
      dataType: "json",
      contentType: "application/json",      
      success: function(data) {        
        for (i in data) {                
          $("#select-position").append("<option>"+data[i]+"</option>");
        }        
      },
      error: function() {
        $("#warning-message").text("Error getting Positions.");
        var warningMessage = $("#select-position").attr("data");
        $(warningMessage).show();
        $(warningMessage).find(".close-modal, #button-warning").click(function(){
          $(warningMessage).hide(); 
        });           
      }
    });
  }
  //get assigned persons function
  function getAssignedPersons() {
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/users",
      type: "GET",
      dataType: "json",
      contentType: "application/json",      
      success: function(data) {        
        for (i in data) {                
          $("#select-person").append("<option>"+data[i].firstName+" "+data[i].lastName+"</option>");
        }        
      },
      error: function() {
        $("#warning-message").text("Error getting Assigned persons.");
        var warningMessage = $("#select-person").attr("data");
        $(warningMessage).show();
        $(warningMessage).find(".close-modal, #button-warning").click(function(){
          $(warningMessage).hide(); 
        });    
            
      }
    });
  }
  //get rooms
  function getRooms() {
    var location = $("#select-loc option:selected").text();
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      url: "http://localhost:8081/api/locations/"+location+"/rooms",
      type: "GET",
      dataType: "json",
      contentType: "application/json",      
      success: function(data) {        
        for (i in data){                
          $("#select-room").append("<option>"+data[i]+"</option>");
        }        
      },
      error: function() {   
      $("#warning-message").text("Error getting Rooms.");
        var warningMessage = $("#select-room").attr("data");
        $(warningMessage).show();
        $(warningMessage).find(".close-modal, #button-warning").click(function(){
          $(warningMessage).hide(); 
        });         
          
      }
    });
  }
 

});