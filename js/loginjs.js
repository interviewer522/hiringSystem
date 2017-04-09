 $(document).ready(function () {
        //event handler for submit button
        $("#button-login").click(function () {
            //collect userName and password entered by users
            var userName = $("#username").val();
            var password = $("#password").val();

            //call the authenticate function
            verify(userName, password);
        });
    });

    //authenticate function to make ajax call
    function verify(userName, password) {
        $.ajax({            
            url: "http://localhost:8081/api/auth/login",
            type: "POST",
            dataType: "json",
            async: false,
            //json object to sent to the authentication url
            data: JSON.stringify({
                     "userName": userName,
                     "password": password
                  }),
            success: function(data) {
                var user = data.user;
                     // creating local storage items with user data that will be sent to main.js
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