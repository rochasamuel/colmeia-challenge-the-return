const AnswersController = require('../../src/controllers/AnswersController');
const Parse = require('../../src/database/connection');

describe("Answers", () => {
    const answer = new AnswersController();

    it("Should return a valid result about the first film", async () => {
        query = new Parse.Query("Film");
        var objects = await query.find();
        var possibleValues = objects.map(film => film.get("title"));

        var result = await answer.firstFilm();

        expect(result).not.toBeUndefined();
        expect(possibleValues).toContain(result);
    });

    it("Should return a valid result about the species that lives less", async () => {
        query = new Parse.Query("Specie");
        var objects = await query.find();
        var possibleValues = objects.map(specie => specie.get("name"));

        var result = await answer.shortLife();

        expect(result).not.toBeUndefined();
        expect(possibleValues).toContain(result[0]);
        expect(possibleValues).toContain(result[1]);
        expect(possibleValues).toContain(result[2]);
    });

    it("Should return a valid result about the gender count", async () => {
        query = new Parse.Query("Character");
        var response = await query.count();

        var result = await answer.charGender();

        expect(result).not.toBeUndefined();
        expect(result.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(response);
    });

    it("Should return a valid value about the average height", async () => {
        var result = await answer.charHeight();

        expect(result).not.toBeUndefined();
        expect(parseInt(result.concat())).toBeGreaterThan(0);
    });

    it("Should return a valid result about the characters that speak Gungan basic", async () => {
        query = new Parse.Query("Character");
        var objects = await query.find();
        var possibleValues = objects.map(char => char.get("name"));

        var result = await answer.charLanguage();

        expect(result).not.toBeUndefined();
        expect(possibleValues).toContain(result[0]);
    });

    it("Should return a valid result about the characters who have the most polupulated planet as home world ", async () => {
        var result = await answer.charInMostPopulatedPlanet();

        expect(result).not.toBeUndefined();
        expect(result).toBeGreaterThan(0);
    });
})