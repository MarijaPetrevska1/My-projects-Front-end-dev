import { CountryService } from "./services/country-service.js";

const countryService = new CountryService();

document.addEventListener("DOMContentLoaded", async () => {
    await countryService.renderCountriesInEurope();
    countryService.registerEvents();
})