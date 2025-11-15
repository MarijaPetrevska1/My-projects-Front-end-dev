import { Country } from "../models/country.js";

export class CountryCard {
    static create(country) {
        if (!(country instanceof Country)) {
            throw new Error("Invalid input!")
        }
        const countryHtml = `
            <div class="col-md-4 mb-5">
                <div class="card shadow-sm">
                    <img src="${country.flag}" class="card-img-top" alt="${country.name} Flag">
                    <div class="card-body">
                        <h5 class="card-title">${country.name}</h5>
                        <p class="card-text">
                            ${country.name} is a country with a population of ${country.population} and the capital ${country.capital?.length === 1 ? "city is" : "cities are"} ${country.capital}.
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                        <a href="${country.wikiLink}" 
                        alt="${country.name} flag" target="_blank" class="btn btn-primary btn-md">Open on Wikipedia</a>
                    </div>
                </div>
            </div>
        `;

        return countryHtml;
    }
}