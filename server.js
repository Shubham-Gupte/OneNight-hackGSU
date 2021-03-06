var express = require('express');//Importing Express
var app = express();//Getting App From Express
var fs = require('fs');//Importing File System Module To Access Files
const port = 8080;//Creating A Constant For Providing The Port
//Routing Request : http://localhost:port/
users = {} //socketID : username
numUsers = 0
numPlayers = 0
roles = {	"Werewolf1":"Werewolf", "Werewolf2":"Werewolf",
			"Minion":"Minion", "Seer":"Seer", "Mason1":"Mason",
			"Mason2":"Mason", "Robber":"Robber", "Villager1": 'Villager',
      "Villager2": 'Villager', "Villager3": 'Villager'

		}//full list of roles?
selectedRoles = {} //(Role: socketID)

app.get('/',function(request,response){
  //Telling Browser That The File Provided Is A HTML File
  response.writeHead(200,{"Content-Type":"text/html"});
  //Passing HTML To Browser
  response.write(fs.readFileSync("./public/index.html"));
  //Ending Response
  response.end();
})
//Routing To Public Folder For Any Static Context
app.use(express.static(__dirname + '/public'));
console.log("Server Running At:localhost:"+port);
var io = require('socket.io').listen(app.listen(port));//Telling Express+Socket.io App To Listen To Port
io.sockets.on("connection",function(socket){
    socket.emit("Start_Chat");
    //On Event Registar_Name
    socket.on("Register_Name",function(data){
       io.sockets.emit("r_name","<strong>"+data+"</strong> Has Joined The Chat");
       socket.nickname = data;   
       users[socket.id] = data
       console.log(users)
       console.log(Object.keys(users).length )
       //Now Listening To A Chat Message
       socket.on("Send_msg",function(data){
       io.sockets.emit("msg",data);
       //Now Listening To A Chat Message
    })
    })
    socket.on("select_roles", function(array) {
    	array.forEach(function(element) {selectedRoles[element] = null})
    	console.log(selectedRoles)
    	numPlayers = array.length - 3
    	console.log(numPlayers)
    })
    socket.on("add_user", function(data) {
    	socket.nickname = data;   
       	users[socket.id] = data
       	numUsers++;
       	console.log(users)
       	console.log(numUsers)
       	if(numUsers == numPlayers) {
       		array = Object.keys(selectedRoles)
       		//permute the players
       		var currentIndex = array.length, temporaryValue, randomIndex;

    			// While there remain elements to shuffle...
    			while (0 !== currentIndex) {

    				// Pick a remaining element...
    			    randomIndex = Math.floor(Math.random() * currentIndex);
    			    currentIndex -= 1;

    			    // And swap it with the current element.
    			    temporaryValue = array[currentIndex];
    			    array[currentIndex] = array[randomIndex];
    			    array[randomIndex] = temporaryValue;
    			}
    			randomizedArray = array
    			userList = Object.keys(users)
    			for(var i = 0; i < userList.length; i++) {
    				selectedRoles[randomizedArray[i]] = userList[i]
    			} for(var i = userList.length; i < randomizedArray.length; i++) {
    				selectedRoles[randomizedArray[i]] = 'CENTER';
    			}
    			// for(var i = 0; i < userList.length-3; i++) {
    			// 	selectedRoles[randomizedArray[i]] = userList[i]
    			// }
    			console.log("selected Roles: ", selectedRoles);
          io.sockets.emit( "timeToStart");
          console.log('sent');
         }
    })

    socket.on('request_Role', function(data) {
      console.log('socketID: ', data)
      Object.keys(selectedRoles).forEach(function(element) {
        console.log('Element: ', element)
        if (selectedRoles[element] == data) {
          io.sockets.emit("yourUserIs", [data, roles[element]] );
        }
      })
    })
    socket.on("shuffle",function(array){
  //   	var currentIndex = array.length, temporaryValue, randomIndex;

		// // While there remain elements to shuffle...
		// while (0 !== currentIndex) {

		// 	// Pick a remaining element...
		//     randomIndex = Math.floor(Math.random() * currentIndex);
		//     currentIndex -= 1;

		//     // And swap it with the current element.
		//     temporaryValue = array[currentIndex];
		//     array[currentIndex] = array[randomIndex];
		//     array[randomIndex] = temporaryValue;
		// }
		// randomizedArray = array
		// userList = Object.keys(users)
		// for(int i = 0; i < userList.length; i++) {
			
		// }
    })
})