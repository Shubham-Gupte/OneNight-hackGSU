var socket = io.connect(window.location.host);
var userType = null;
socket.on("Start_Chat",function(){
    //Setting Message On Connection..           
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


$("#selectRoles").click(function(){
    console.log("Selecting Roles");
    var selected =[];
    $("input:checked").each(function() {
        selected.push($(this).attr('name'));
    })
    socket.emit("select_roles", selected);
    $('body').load("sourceHTML/join.html")
})


$('#requestRole').click(function(){
    console.log("requested my role")
    socket.emit('request_Role', Cookies.get('socketID'))
})

socket.on("timeToStart", function(){
    console.log("hi")
    $('body').load("sourceHTML/reveal.html"); //CHANGE WEBSITE
})

socket.on("yourUserIs", function(data){
    userType = data;
    console.log('user: ', userType);
    $('#revealClass').html(data[1]);
    $('#roleCard').attr('src', 'img/portfolio/'+data[1].toLowerCase() +'.jpg');
    
    console.log($('#revealClass').html())
})

socket.on('connection', function() {
    console.log("client connected");
});

socket.on('connect_error', function(err) {
    console.log("client connect_error: ", err);
});

socket.on('connect_timeout', function(err) {
    console.log("client connect_timeout: ", err);
});

$("#createGame").click(function(){
    console.log("creating Game");
    $('body').load("sourceHTML/createGame.html")
})
$("#joinGame").click(function(){
    console.log("going to join Game website");
    $('body').load("sourceHTML/join.html")
})

$("#addUser").click(function(){
    console.log("Adding User");
    Cookies.set('socketID', socket.id)
    socket.emit("add_user", $('#usernameInput').val());
    $('body').load("sourceHTML/waiting.html")
})



//On Modal Window click, request role
//get corresponding role.

//On Modal Window click, request role
//get corresponding role.