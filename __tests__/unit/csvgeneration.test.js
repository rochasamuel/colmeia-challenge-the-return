const CSVController = require('../../src/controllers/CSVController');

it("Should return 'true' if csv was sucessfuly created", () => {
    const csv = new CSVController('test film', ['testspecie','testspecie','testspecie'], [10, 20],
                                  ['2','1','2'], ['char1','char2','char3'], 6);

    var result = csv.makeCSV('./__tests__/utils/answertest.csv');

    expect(result).not.toBeUndefined();
    expect(result).toBeTruthy();
});