'use strict'
const hoursArray = ['1am', '2am', '3am', '4am', '5am', '6am', '7am'];
let shopsArray = [];
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
console.log(randomNum(1, 3));
function Locations(name, minCust, maxCust, avgCus) {
    this.name = name,
        this.minCust = minCust,
        this.maxCust = maxCust,
        this.avgCus = avgCus,
        this.cookiesPh = [],
        this.total = 0,
        shopsArray.push(this)
}



Locations.prototype.randomCust = function () {
    for (let i = 0; i < hoursArray.length; i++) {
        let randomCust = randomNum(this.minCust, this.maxCust);
        this.cookiesPh.push(Math.floor(randomCust * this.avgCus));
        this.total += this.cookiesPh[i];
    }
}
function call() {
    for (let i = 0; i < shopsArray.length; i++) {
        shopsArray[i].randomCust();
    }
}

console.log(shopsArray);
function renderTable() {
    let table = document.getElementById('table');
    let hearerRow = document.createElement('tr');
    hearerRow.setAttribute('class', 'heads')
    let lName = document.createElement('th');
    table.appendChild(hearerRow);
    hearerRow.appendChild(lName);
    lName.textContent = 'Location name';
    for (let i = 0; i < hoursArray.length; i++) {
        let workHours = document.createElement('th');
        hearerRow.appendChild(workHours);
        workHours.textContent = hoursArray[i];

    }
    let totalH = document.createElement('th');
    hearerRow.appendChild(totalH);
    totalH.textContent = 'Total';

    for (let i = 0; i < shopsArray.length; i++) {
        let shopRow = document.createElement('tr');
        table.appendChild(shopRow);
        let shopName = document.createElement('th');
        shopName.setAttribute('class', 'heads')
        shopRow.appendChild(shopName);
        shopName.textContent = shopsArray[i].name;
        let totalHrs = 0;
        for (let j = 0; j < hoursArray.length; j++) {
            let result = document.createElement('th');
            shopRow.appendChild(result);
            result.textContent = shopsArray[i].cookiesPh[j];
            totalHrs += shopsArray[i].cookiesPh[j];
        }
        let totally = document.createElement('th')
        shopRow.appendChild(totally);
        totally.textContent = totalHrs;
    }
}
let form = document.getElementById('addLocation');
form.addEventListener('submit', handler);
function handler(event) {
    event.preventDefault();
    console.log(event);
    let newName = event.target.name.value;
    console.log(newName);
    let newMinCust = parseInt(event.target.minCust.value);
    console.log(newMinCust);
    let newMaxCust = parseInt(event.target.maxCust.value);
    console.log(newMaxCust);
    let newAvg = parseFloat(event.target.avgCust.value);
    console.log(newAvg);

    new Locations(newName, newMinCust, newMaxCust, newAvg,);
    table.textContent = '';
    call();
    renderTable();

    let stringArray = JSON.stringify(shopsArray);
    localStorage.setItem('locations', stringArray);
    console.log(shopsArray);
    console.log(stringArray);
}

let savedShopsArray = localStorage.getItem('locations');
console.log(savedShopsArray);
let parsedShopsArray = JSON.parse(savedShopsArray);
console.log(parsedShopsArray);

console.log(shopsArray);
if (parsedShopsArray) {
    for (let i = 0; i < parsedShopsArray.length; i++) {
        let reIn = new Locations(parsedShopsArray[i].name, parsedShopsArray[i].minCust, parsedShopsArray[i].maxCust, parsedShopsArray[i].avgCus)
    }

} else {
    new Locations('amman', 16, 20, 1.2,);
    new Locations('zarqa', 10, 15, 1.9,);
    new Locations('irbid', 9, 12, 0.7,);
}
call();
renderTable();

