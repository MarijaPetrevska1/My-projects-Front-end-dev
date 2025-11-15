export class ApiService {
    constructor() {
        this.baseUrl = "https://restcountries.com/v3.1";
    }

    async getCountriesByRegion(region) {
        const response = await fetch(`${this.baseUrl}/region/${region}`);
        const data = await response.json();
        return data;
    }

    async getCountriesByName(name) {
        const response = await fetch(`${this.baseUrl}/name/${name}`);
        const data = await response.json();
        return data;
    }

    async getMacedoniaNeighbours() {
        const response = await fetch(`${this.baseUrl}/all`);
        const data = await response.json();
        return data.filter(c => c.borders?.includes("MKD"));
    }
}