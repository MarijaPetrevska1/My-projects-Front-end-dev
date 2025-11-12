// 1) DECLARE/INITIALIZE GLOBAL VARIABLES AND CONSTANTS
const BASE_API_URL = "https://swapi.dev/api/";
let currentPage = 1;// Tracks the current page of results (for pagination)
const swapiResource = {
    people: "people",
    starships: "starships",
    currentResource: null // Tracks the current resource being displayed (people or starships)
}
const tableHeaders = {
    people: ["Name", "Height", "Mass", "Gender", "Birth Year", "Appearances"],
    starships: ["Name", "Model", "Manufacturer", "Cost", "People Capacity", "Class"]
}

// 2) SELECTING ELEMENTS
// const peopleBtn = document.getElementById("peopleBtn");
// const shipsBtn = document.getElementById("shipsBtn");
// const loader = document.getElementById("loader");
// const resultDiv = document.getElementById("result");
// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");
const elements = {
    peopleBtn: document.getElementById("peopleBtn"),
    shipsBtn: document.getElementById("shipsBtn"),
    loader: document.getElementById("loader"),
    resultDiv: document.getElementById("result"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
}


// 3) FUNCTION DEFINITIONS

// Constructor Functions
function Person(name, height, mass, gender, birthYear, appearances) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
    this.birthYear = birthYear;
    this.appearances = appearances;
}

function Starship(name, model, manufacturer, cost, peopleCapacity, shipClass) {
    this.name = name;
    this.model = model;
    this.manufacturer = manufacturer;
    this.cost = cost;
    this.peopleCapacity = peopleCapacity;
    this.shipClass = shipClass;
}

/**
 * Fetches data from Star Wars API for the specified resource (people or starships)
 * @param {string} resource - The type of data to fetch from the API
 * @returns {Promise<object>} - A promise that resolves to the fetched data
 */
async function getDataAsync(resource) {
    try {
        toggleLoader(true);
        const url = `${BASE_API_URL}${resource}?page=${currentPage}`;
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! Status ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        elements.resultDiv.innerHTML = `<p class="text-danger text-center">An error occurred. Please try again later.</p>`
    } finally {
        // Typical usecase for the finally block
        toggleLoader(false);
    }
}

/**
 * Generates the full HTML structure for a table.
 * @param {string} headersHtml - The HTML for the table headers.
 * @param {string} dataHtml - The HTML for the table rows.
 * @returns {string} - The full HTML for the table.
 */
function generateTableHtml(headers, dataRows) {
    return `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    ${headers}
                </tr>
            </thead>
            <tbody>
                ${dataRows}
            </tbody>
        </table>
    `;
}

/**
 * Renders a table displaying people data.
 * @param data - The data fetched from the API.
 */
function renderPeopleTable(data) {
    // 1) Map Api results to Person objects
    const people = data.results.map(p => new Person(p.name, p.height, p.mass, p.gender, p.birth_year, p.films.length));
    console.log(people);

    // 2) Generate headers html
    // ===> with forEach
    // let headersHtml = "";
    // tableHeaders.people.forEach(header => {
    //     headersHtml += `<th>${header}</th>`
    // })

    // ===> with map (better way)
    let headersHtml = tableHeaders.people.map(header => `<th>${header}</th>`).join("");

    // 3) Generate data rows
    let rowsDataHtml = people.map(person => `
        <tr>
            <td>${person.name}</td>
            <td>${person.height}</td>
            <td>${person.mass}</td>
            <td>${person.gender}</td>
            <td>${person.birthYear}</td>
            <td>${person.appearances}</td>
        </tr>
    `).join("");

    // 4) Display the whole table html in the results div
    elements.resultDiv.innerHTML = generateTableHtml(headersHtml, rowsDataHtml);
}

/**
 * Renders a table displaying starships data.
 * @param data - The data fetched from the API.
 */
function renderShipsTable(data) {
    const ships = data.results.map(ship => new Starship(ship.name, ship.model, ship.manufacturer, ship.cost_in_credits, ship.passengers, ship.starship_class));

    const headersHtml = tableHeaders.starships.map(h => `
        <th>${h}</th>
    `).join("");

    const shipsRowsHtml = ships.map(ship => `
        <tr>
            <td>${ship.name}</td>
            <td>${ship.model}</td>
            <td>${ship.manufacturer}</td>
            <td>${ship.cost}</td>
            <td>${ship.peopleCapacity}</td>
            <td>${ship.shipClass}</td>
        </tr>
    `).join("");

    elements.resultDiv.innerHTML = generateTableHtml(headersHtml, shipsRowsHtml);
}

/**
 * Toggles the visibility of the pagination buttons.
 * @param {string | null} previous - Whether the "Previous" button should be visible.
 * @param {string | null} next - Whether the "Next" button should be visible.
 */
function togglePaginationButtons(previous, next) {
    // if (!previous) {
    //     elements.prevBtn.style.display = "none"
    // } else {
    //     elements.prevBtn.style.display = "block"
    // }
    // if (!next) {
    //     elements.nextBtn.style.display = "none"
    // } else {
    //     elements.nextBtn.style.display = "block"
    // }
    // ===> Using Ternary Operator for simpler syntax
    // same thing as above, just better, more concise syntax
    elements.prevBtn.style.display = !previous ? "none" : "block";
    elements.nextBtn.style.display = next ? "block" : "none";
}

/**
 * Toggles the visibility of the loader (spinner).
 * @param {boolean} show - Whether the loader should be shown or hidden.
 */
function toggleLoader(show) {
    elements.loader.style.display = show ? "block" : "none";
}

/**
 * Handles the fetching and rendering of data based on the selected type.
 * @param {string} resource - The type of data to fetch and render (people or starships).
 */
async function handleDataAsync(resource) {
    const data = await getDataAsync(resource);
    if (resource === swapiResource.people) {
        renderPeopleTable(data);
    } else if (resource === swapiResource.starships) {
        renderShipsTable(data);
    }
    togglePaginationButtons(data.previous, data.next);
}


// 4) HANDLING EVENTS
elements.peopleBtn.addEventListener("click", async () => {
    currentPage = 1; // Reset to the first page when selecting "people"
    swapiResource.currentResource = swapiResource.people;
    // ===> TIP: Avoid using hard-coded strings
    // const data = await getDataAsync("people");
    // ===> Solution:
    // const data = await getDataAsync(swapiResource.people);
    await handleDataAsync(swapiResource.people);
});

elements.shipsBtn.addEventListener("click", async () => {
    currentPage = 1; // Reset to the first page when selecting "starships"
    swapiResource.currentResource = swapiResource.starships;
    // const data = await getDataAsync("starships");
    // const data = await getDataAsync(swapiResource.starships);
    await handleDataAsync(swapiResource.starships);
})

elements.nextBtn.addEventListener("click", async () => {
    currentPage++;
    await handleDataAsync(swapiResource.currentResource);
})

elements.prevBtn.addEventListener("click", async () => {
    currentPage--;
    await handleDataAsync(swapiResource.currentResource);
})

