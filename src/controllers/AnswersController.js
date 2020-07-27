const Parse = require('../database/connection');

class AnswersController {

    constructor() {}

    //How many characters for each genre?
    async charGender() {
        var query = new Parse.Query("Character");
        query.equalTo("gender", "male");
        const responseMale = await query.count();

        // console.log(responseMale);

        query.equalTo("gender", "female");
        const responseFemale = await query.count();

        // console.log(responseFemale);

        return [responseMale, responseFemale];
    }

    //average height of the characters?
    async charHeight() {
        var query = new Parse.Query("Character");
        query.exists("height");
        query.withCount();
        
        var result = await query.find();

        result = result.results
            .map(item => item.get("height"))
            .reduce((a, b) => a + b, 0) / result.count;
        
        return [...Math.trunc(result).toString()];
    }

    //charcters that speak Gungan basic as native language?
    async charLanguage() {
        let Character = Parse.Object.extend("Character");
        let Specie = Parse.Object.extend("Specie");

        var innerQuery = new Parse.Query(Specie);
        innerQuery.equalTo("language", "Gungan basic");

        var query = new Parse.Query(Character);
        query.matchesQuery("species", innerQuery);

        var results = await query.find();
        results = results.map(item => item.get("name"));

        return results;
    }

    //first film name?
    async firstFilm() {
        var query = new Parse.Query("Film");
        query.ascending("releaseDate");

        var film = await query.first();
        return film.get("title");
    }

    //how many charcters live in the most populous planet?
    async charInMostPopulatedPlanet() {
        let Character = Parse.Object.extend("Character");
        let Planet = Parse.Object.extend("Planet");

        var innerQuery = new Parse.Query(Planet);
        innerQuery.descending("population");

        const planet = await innerQuery.first();

        var query = new Parse.Query(Character);
        query.equalTo("homeworld", planet);

        return await query.count();
    }

    //species that live less?
    async shortLife() {
        var query = new Parse.Query("Specie");
        query.exists("averageLifespan");
        query.ascending("averageLifespan");
        query.limit(3);

        var results = await query.find()
        results = results.map(item => item.get("name"));

        return results;
    }
}

module.exports = AnswersController;