var socket = io.connect(window.location.host);
var userType = null;
socket.on("Start_Chat",function(){
    //Setting Message On Connection..
    $("#stat").html("<strong>Status:</strong>Connected");
    $("#field").attr("placeholder","Your Name..");
    $("#field").focus();              
})
socket.on("disconnect",function(){
    //Setting Message On Disconnection
    $("#stat").html("<strong>Status:</strong>Disconnected From Server Refresh!");
})
console.log($("#btn").html());
// $("#btn").click(function(){
//     if($("#field").attr("placeholder") ==="Your Name.."){
//          socket.emit("Register_Name",$("#field").val());
//          $("#field").val("");
//          $("#field").attr("placeholder","Your Text..");
//     } else if($("#field").attr("placeholder") == "Your Text.."){
//          socket.emit("Send_msg",$("#field").val());
//          $("#field").val("");
//          $("#field").focus();
//     }else alert("Wait...");
// })
$("#createGame").click(function(){
    console.log("creating Game");
    $('body').load("sourceHTML/createGame.html")
})
$("#joinGame").click(function(){
    console.log("going to join Game");
    $('body').load("sourceHTML/join.html")
})
$("#selectRoles").click(function(){
    console.log("Selecting Roles");
    var selected =[];
    $("input:checked").each(function() {
        selected.push($(this).attr('name'));
    })
    console.log(selected);
    socket.emit("select_roles", selected);
    $('body').load("sourceHTML/join.html")
})

$("#addUser").click(function(){
    console.log("Adding User");
    socket.emit("add_user", $('#usernameInput').val());
    $('body').load("sourceHTML/waiting.html")
})

socket.on("r_name",function(data){
    $("ul").append("<li>"+data+"</li>");
})
socket.on("msg",function(data){
    $("ul").append("<li>"+data+"</li>");
})