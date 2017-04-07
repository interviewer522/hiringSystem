$(document).ready(function(){
	$("#my-interviews").click(function(){
		$("#sub-heading").text("My Interviews");
	});
	$("#new-interview").click(function(){
		$("#sub-heading").text("New Interview");	
	});
	$("#side-bottom-bar > a").click(function() {    
    var x = $(this).index();   
    $("#table-interviews").toggle(x===0);
    $("#content-footer, #tab-interview, #tab-candidate").toggle(x===1);

    
    
  });
});