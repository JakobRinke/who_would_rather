const adminbtn1 = document.getElementById("adminBtn1");
const adminbtn2 = document.getElementById("adminBtn2");

const gamestate_names = document.getElementById("gamestate_names");
const gamestate_vote = document.getElementById("gamestate_vote");
const gamestate_show = document.getElementById("gamestate_show");
const gamestate_admin = document.getElementById("gamestate_admin");

const bar = document.getElementById("progressBar");

const p1_btn = document.getElementById("p1_btn");
const p2_btn = document.getElementById("p2_btn");


const p1_label = document.getElementById("p1_label");
const p2_label = document.getElementById("p2_label");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);



const roomID = parseInt(urlParams.get("roomID"));
var PlayerWordMap = {}

document.getElementById("RoomID").innerHTML = "Raum ID: " + roomID


var Round = 0;
var started = false;


function changeVisibility(el, d)
{
    if (d) {
        el.classList.add("gamestate_visible");
        el.classList.remove("gamestate_invisible");
    } else {
        el.classList.remove("gamestate_visible");
        el.classList.add("gamestate_invisible");
    }
}

if (!urlParams.has("create")){
    adminbtn1.classList.add("gamestate_invisible");
    adminbtn2.classList.add("gamestate_invisible");
    changeVisibility(document.getElementById("p1"), false);
    changeVisibility(document.getElementById("p2"), false);
    changeVisibility(document.getElementById("endbtn"), false);
}

function set_gamestate(state){
    switch (state) {
        case 0:
            changeVisibility(gamestate_names, true);
            changeVisibility(gamestate_vote, false);
            changeVisibility(gamestate_show, false);
            changeVisibility(gamestate_admin, false);
            break;
        case 1:
            reset_indicators(roomID); 
            vote1 = 0;
            vote2 = 0;
            changeVisibility(gamestate_names, false);
            changeVisibility(gamestate_vote, true);
            changeVisibility(gamestate_show, false);
            changeVisibility(gamestate_admin, false);
            break;
        case 2:
            changeVisibility(gamestate_names, false);
            changeVisibility(gamestate_vote, false);
            changeVisibility(gamestate_show, true);
            changeVisibility(gamestate_admin, false);
            break;
        case 3:
            changeVisibility(gamestate_names, false);
            changeVisibility(gamestate_vote, false);
            changeVisibility(gamestate_show, false);
            changeVisibility(gamestate_admin, true);
            break;
        default:
            changeVisibility(gamestate_names, false);
            changeVisibility(gamestate_vote, false);
            changeVisibility(gamestate_show, false);
            changeVisibility(gamestate_admin, false);
    }
}

var player1;
var player2

function onUpdatePlayer1(data, key) {
    player1 = data;
    p1_btn.innerHTML = player1;
    p1_label.innerHTML = player1 + ": " + vote1;
}

function onUpdatePlayer2(data, key) {
    player2 = data;
    p2_btn.innerHTML = player2;
    p2_label.innerHTML = player2 + ": " + vote2;
}

var vote1 = 0;
var vote2 = 0


function update_bar()
{
    bar.max = vote1 + vote2;
    bar.value = vote1;
}

function onUpdateVote1(data, key) {
    vote1 = data;
    p1_label.innerHTML = player1 + ": " + vote1;
    update_bar()
}

function onUpdateVote2(data, key) {
    vote2 = data;
    p2_label.innerHTML = player2+ ": " + vote2;
    update_bar()
}

function onGamestateChange(data, key) {
    console.log("Gamestate: " + data)
    set_gamestate(data);
}

function reset()
{
    change_gamestate(roomID, 1);
    reset_indicators(roomID); 
}

subscribeRoomEvents(roomID,  onGamestateChange, onUpdatePlayer1, onUpdatePlayer2, onUpdateVote1, onUpdateVote2)