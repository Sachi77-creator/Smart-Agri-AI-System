let count = 0;
let display = document.getElementById("display");

function add() {
    count++;
    display.textContent = count;
}

function sub() {
    if(count>0)
    {
    count--;
    display.textContent = count;
    }
}

function change() {
    count = 0;
    display.textContent = count;
}
