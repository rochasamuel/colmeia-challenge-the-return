const Parse = require('../../src/database/connection');

describe("DBConnection", () => {
    it("Should return Darth Vader height", async () => {
        var query = new Parse.Query("Character");
        query.equalTo("name", "Darth Vader");

        var char = await query.first();
        var result = char.get("height");
        
        expect(char).toBeInstanceOf(Parse.Object);
        expect(result).toBe(202);
    })
})