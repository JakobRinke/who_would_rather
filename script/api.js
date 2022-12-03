const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
const gameName = "wwr"


function getSecretID()
{
    const n = localStorage.getItem("SID") || Math.random();
    localStorage.setItem("SID", n);
    return n;
}
const secretID = getSecretID();


function createRoom()
{
    roomID = parseInt(Math.random() * 100000)
    gun.get(gameName + "/rooms/").get(roomID).get("gamestate").put(0);
    return roomID;
}


function logRoom(data, key)
{
    console.log(data!=null)
    console.log(data)
}





function change_gamestate(roomID, state)
{
    gun.get(gameName + "/rooms/").get(roomID).get("gamestate").put(state)
}



function writePlayerSlot(roomID, p1, p2)
{
    console.log("WRITING PLAYERSLOTS")
    gun.get(gameName + "/rooms/").get(roomID).get("player1").put(p1);
    gun.get(gameName + "/rooms/").get(roomID).get("player2").put(p2);
    change_gamestate(roomID, 1)
    reset_indicators(roomID);
}




function loadPlayerNames(roomID, p1_callback, p2_callback)
{
    gun.get(gameName + "/rooms/").get(roomID).get("player1").once(p1_callback);
    gun.get(gameName + "/rooms/").get(roomID).get("player2").once(p2_callback);

}


function loadPlayerSlot(roomID, callback) 
{
    gun.get(gameName + "/rooms/").get(roomID).get("players").get(secretID).map().once(callback)
}

function reset_indicators(roomID) 
{
    gun.get(gameName + "/rooms/").get(roomID).get("player1_ind").put(0);
    gun.get(gameName + "/rooms/").get(roomID).get("player2_ind").put(0);
}

function add_vote(roomID, playerid) {
    gun.get(gameName + "/rooms/").get(roomID).get("player"+playerid+"_ind").once((data,key)=>{
        gun.get(gameName + "/rooms/").get(roomID).get("player"+playerid+"_ind").put(data+1);
    })
} 

function subscribeRoomEvents(roomID, onGameStateChange, onPlayer1Change, onPlayer2Change, onVote1Change, onVote2Change)
{
    gun.get(gameName + "/rooms/").get(roomID).get("gamestate").on(onGameStateChange);
    gun.get(gameName + "/rooms/").get(roomID).get("player1").on(onPlayer1Change);
    gun.get(gameName + "/rooms/").get(roomID).get("player2").on(onPlayer2Change);
    gun.get(gameName + "/rooms/").get(roomID).get("player1_ind").on(onVote1Change);
    gun.get(gameName + "/rooms/").get(roomID).get("player2_ind").on(onVote2Change);
}
