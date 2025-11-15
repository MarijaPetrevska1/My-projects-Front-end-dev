export class Country {
    constructor(flag, name, population, capital) {
        this.flag = flag;
        this.name = name;
        this.population = population;
        this.capital = capital ?? "N/A";
        this.wikiLink = `https://en.wikipedia.org/wiki/${this.name}`;
    }
}