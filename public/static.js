$("#createGame").click(function(){
    console.log("creating Game");
    $('body').load("sourceHTML/createGame.html")
})
$("#joinGame").click(function(){
    console.log("going to join Game");
    $('body').load("sourceHTML/join.html")
})

$("#addUser").click(function(){
    console.log("Adding User");
    socket.emit("add_user", $('#usernameInput').val());
    $('body').load("sourceHTML/waiting.html")
})
