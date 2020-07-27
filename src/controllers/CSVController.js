const fs = require('fs');

//class responsible to store the answers
class CSVController {

    constructor(q1, q2, q3, q4, q5, q6) {
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
        this.q4 = q4;
        this.q5 = q5;
        this.q6 = q6;
    }

    //method responsible to create a .csv file with the answers.
    async makeCSV(dir = './theoracle/answer.csv') {
        var data = `Pergunta 1; Pergunta 2; Pergunta 3; Pergunta 4; Pergunta 5; Pergunta 6\n${this.q1};"${this.q2}";"${"M:"+this.q3[0]},${"F:"+this.q3[1]}";${this.q4[0]+'.'+this.q4[1]+this.q4[2]};"${this.q5}";${this.q6}`;
        await fs.writeFile(dir , data, (err) => {
            if (err) throw err;
        });
        return true;
    }

}

module.exports = CSVController;