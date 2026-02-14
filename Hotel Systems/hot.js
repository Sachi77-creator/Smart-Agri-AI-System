let rooms = [];
fetch("hots.xml")
    .then((response) => response.text())
    .then((xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const roomNodes = xmlDoc.getElementsByTagName("room");
        for (let i = 0; i < roomNodes.length; i++) {
            const roomNode = roomNodes[i];
            let room = {
                type: roomNode.getElementsByTagName("type")[0].textContent,
                price: roomNode.getElementsByTagName("price")[0].textContent,
                status: roomNode.getElementsByTagName("status")[0].textContent
            };

            rooms.push(room);
        }
        displayRooms(rooms);
    });
// Display Rooms
function displayRooms(roomArray) {
    let output = "";
    for (let i = 0; i < roomArray.length; i++) {
        let room = roomArray[i];
        output += `
        <p>
            ${room.type} Room - ₹${room.price} - ${room.status}
        </p>
        `;
    }
    document.getElementById("roomData").innerHTML = output;
}
// Book Room
function bookRoom() {
    let name = document.getElementById("name").value.trim();
    let selectedRoom = document.getElementById("roomType").value;
    if (name === "") {
        alert("Enter Name");
        return;
    }
    for (let i = 0; i < rooms.length; i++) {

        if (rooms[i].type === selectedRoom &&
            rooms[i].status === "Available") {

            rooms[i].status = "Booked";
            break;
        }
    }
    document.getElementById("result").innerHTML =
        "Room booked successfully for " +
        name + " (" + selectedRoom + " Room)";
    displayRooms(rooms);
    updateRoomSelect();
    clearInputs();
}
function clearInputs(){
    document.getElementById("name").value="";
}
function updateRoomSelect() {
    let select = document.getElementById("roomType");
    select.innerHTML = "";
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].status === "Available") {
            let option = document.createElement("option");
            option.value = rooms[i].type;
            option.textContent = rooms[i].type;
            select.appendChild(option);
        }
    }
}