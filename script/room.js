var WordInputs = document.getElementsByClassName("inputField")

const gamestate_names = document.getElementById("");
const gamestate_vote = document.getElementById("");
const gamestate_show = document.getElementById("");


const Container = document.getElementById("wordContainer");
const gameStateWordDiv = document.getElementById("gamestate_word");
const gameStateGameDiv = document.getElementById("gamestate_game");
const dbutton = document.getElementById("endbtn")


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (!urlParams.has("create")){
    dbutton.style.visibility = "hidden"
}

const roomID = parseInt(urlParams.get("roomID"));
var PlayerWordMap = {}

document.getElementById("RoomID").innerHTML = "Raum ID: " + roomID


var Round = 0;
var started = false;


function set_gamestate(state){
    switch (state) {
        case 1:
            break;
    }
}

function onUpdatePlayernames(data, key) {

}