const AnswersController = require('./controllers/AnswersController');
const CSVController = require('./controllers/CSVController');

var answer = new AnswersController();

class TheOracle {

     constructor() {}

     //function that will init all the process
     async init(){
          console.log('Processing answers. Hold on');
          var r1 = await answer.firstFilm();
          // console.log(r1);
          var r2 = await answer.shortLife();
          // console.log(r2);
          var r3 = await answer.charGender();
          // console.log(r3);
          var r4 = await answer.charHeight();
          // console.log(r4);
          var r5 = await answer.charLanguage();
          // console.log(r5);
          var r6 = await answer.charInMostPopulatedPlanet();
          // console.log(r6);
          
          var csv = new CSVController(r1,r2,r3,r4,r5,r6);
          csv.makeCSV();
     
          console.log('The Oracle is waiting for you with all answers that you need :) in the root of the project');
     }
}

var theOracle = new TheOracle();
theOracle.init();
