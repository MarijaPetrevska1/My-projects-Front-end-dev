import { ApiService } from "./api-service.js"
import { Country } from "../models/country.js";
import { CountryCard } from "../components/country-card.js";
import { Loader } from "./loader.js";

export class CountryService {
    constructor() {
        this.apiService = new ApiService();
        this.htmlElements = {
            searchInput: document.getElementById("searchInput"),
            searchBtn: document.getElementById("searchBtn"),
            resetBtn: document.getElementById("resetBtn"),
            countriesContainer: document.getElementById("cardContainer"),
            notification: document.getElementById("notification"),
            btnEurope: document.getElementById("btnEurope"),
            btnNeighbours: document.getElementById("btnNeighbors"),
            btnMacedonia: document.getElementById("btnMacedonia"),
        }
    }

    async renderMacedoniaNeighbours() {
        this.resetContainers();
        try {
            Loader.show();
            const countriesData = await this.apiService.getMacedoniaNeighbours();
            if (!countriesData.length) {
                this.displayError("No neighbours for Macedonia found!");
                return;
            }
            const mappedCountries = this.mapCountryData(countriesData);
            this.renderCountries(mappedCountries);
        } catch (error) {
            this.displayError(error.message);
        } finally {
            Loader.hide();
        }
    }

    async searchCountries(searchInput) {
        this.resetContainers();
        const searchValue = searchInput.trim();
        if (!searchValue) {
            this.displayError("Please enter value!");
            return;
        }

        try {
            Loader.show();
            const countriesData = await this.apiService.getCountriesByName(searchValue);
            console.log(countriesData);
            if (!countriesData.length) {
                this.displayError(`No countries found! Search value: ${searchInput}`);
                return;
            }
            const mappedCountries = this.mapCountryData(countriesData);
            this.renderCountries(mappedCountries);
        } catch (error) {
            this.displayError(error.message);
        } finally {
            Loader.hide();
        }
    }

    async renderCountriesInEurope() {
        this.resetContainers();
        try {
            Loader.show();
            // 1) Fetching data
            const countries = await this.apiService.getCountriesByRegion("europe");
            console.log(countries);
            if (!countries.length) {
                this.displayError("No countries from Europe found!");
                return;
            }

            // 2) Mapping data
            const mappedCountries = this.mapCountryData(countries);

            // 3) Render data
            this.renderCountries(mappedCountries);

        } catch (error) {
            this.displayError(error.message);
        } finally {
            Loader.hide();
        }

    }

    renderCountries(countries) {
        const countriesHTML = countries.map(country => CountryCard.create(country)).join("");
        this.htmlElements.countriesContainer.innerHTML = countriesHTML;
    }

    mapCountryData(countries) {
        return countries.map(c => new Country(c.flags.png, c.name.common, c.population, c.capital));
    }

    resetContainers() {
        this.htmlElements.countriesContainer.innerHTML = "";
        this.htmlElements.notification.textContent = "";
        this.htmlElements.notification.style.display = "none";
    }

    displayError(message) {
        this.htmlElements.notification.style.display = "block";
        this.htmlElements.notification.textContent = message;
    }

    registerEvents() {
        this.htmlElements.searchBtn.addEventListener("click", () => this.searchCountries(this.htmlElements.searchInput.value));
        this.htmlElements.resetBtn.addEventListener("click", () => this.resetContainers());
        this.htmlElements.btnEurope.addEventListener("click", () => this.renderCountriesInEurope());
        this.htmlElements.btnMacedonia.addEventListener("click", () => this.searchCountries("Macedonia"));
        this.htmlElements.btnNeighbours.addEventListener("click", () => this.renderMacedoniaNeighbours());
    }
}

