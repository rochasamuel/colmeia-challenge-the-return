# Colmeia Challenge The Return

Aplicação construída com [NodeJs](https://nodejs.org/en/) com o intuito de cumprir o desafio proposto pela [Colmeia](https://aulascolmeia.com.br) no âmbito do processo seletivo para estágio.

## O que o App faz?
O app consiste em responder algumas perguntas por meio de progamação, fazendo a análise e extração de dados do banco previamente criado utilizando a plataforma [Parse](https://parseplatform.org/) (Criado pelo Facebook e que atualmente é Open Source) e gerenciado pela [Back4app](https://www.back4app.com/). Ao término da execução a aplicação gera um arquivo no formato .csv que contém as respostas para cada pergunta.

<img src="https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge-the-return/master/markdownutils/qa.gif" width=180 height=90/><img src="https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge-the-return/master/markdownutils/arrow.gif" width=100 height=100/><img src="https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge-the-return/master/markdownutils/csv.png" width=100 height=100/>

---

## As perguntas: 
A base consiste em um compilado de informações variadas sobre os detalhes da franquia de filmes Star Wars. [Visualizar estrutura do banco](https://www.back4app.com/database/davimacedo/swapi-star-wars-api). Com essas informações deve-se responder as seguintes:

* Qual o nome do primeiro filme lançado?
* Quais espécies vivem menos tempo em média?
* Existem quantos personagens de cada gênero?
* Qual a altura média dos personagens?
* Quais personagens falam a língua Gungan basic?
* Quantos personagens vivem no planeta mais populoso?
  
## Estrutura do projeto:
```
 ┣ 📂src
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜AnswersController.js
 ┃ ┃ ┗ 📜CSVController.js
 ┃ ┣ 📂database
 ┃ ┃ ┗ 📜connection.js
 ┃ ┗ 📜index.js
 ┣ 📂theoracle
 ┣ 📂__tests__
 ┃ ┣ 📂integration
 ┃ ┃ ┗ 📜dbconnection.test.js
 ┃ ┣ 📂unit
 ┃ ┃ ┣ 📜answers.test.js
 ┃ ┃ ┗ 📜csvgeneration.test.js
 ┃ ┗ 📂utils
 ┣ 📜.gitignore
 ┣ 📜jest.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
 ```

### Instruções de preparação do projeto e execução dos testes para verifcar o funcionamento das funções essencias da aplicação:

**1.  Na primeira execução abra um terminal e navegue até a pasta raiz do projeto:**
   
   `> cd C:...\colmeia-challenge-the-return`

**2. Rode o seguinte comando para instalar as dependências de projeto:**

   `> npm install`

**3. Rode o seguinte comando para iniciar a execução dos testes contidos no projeto:**

   `> npm test`

>**Após alguns segundos o console deve retornar o feedback dos testes.**



### Instruções para rodar a aplicação:
**1. Ainda na raiz do projeto rode o seguinte comando (no terminal) para executar efetivamente o código:**

   `> npm run answer`

*este comando pode ser substituído por:*

   `> node src/index.js`

>**A resposta do comando dever ser os logs gerados pela execução do projeto, juntamente com a confirmação de geração do arquivo .csv**

# Documentação
* [Database](#database)
* [Controllers](#controllers)
* [Index File](#index-file)
* [Testes](#testes)

## Database
Na pasta database do projeto temos apenas o arquivo `connection.js` que é responsável por gerenciar a conexão da nossa aplicação com o banco de dados.

```Node
const APP_ID = "keydoappBLABLAB098903128904398423432";
const JS_KEY = "JSkeysmalkmda;slkjdflasjd345346534";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";
```

Após a execução é exportado um objeto Parse autenticado para a execução das querys e outros recursos.

**Vale lembrar que para a conexão com o banco e as operações feitas foi utilizado a [biblioteca própria para o gerenciamento do parse no npm](https://www.npmjs.com/package/parse)**

## Controllers
Na pasta controlers temos dois arquivos são eles: `AnswersController.js` e `CSVController.js`

### Answers Controller
O arquivo importa previamente a conexão com o banco. Possui uma classe com o nome AnswersController (construtor vazio), que contem métodos responsáveis por responder cada pergunta com seu devido bloco de código.

#### Métodos (***Todos os métodos são assíncronos***):

**`firstFilm()`:**
Quando chamado executa a busca no banco de dados afim de responder a primeira pergunta requerida (Qual o primeiro filme lançado?).

```Node
var query = new Parse.Query("Film");
query.ascending("releaseDate");

var film = await query.first();
return film.get("title");
```
O método retorna uma string indicando o nome do filme. `'nome_do_filme'`

**`shortLife()`:**
Quando chamado executa a busca no banco de dados afim de responder a segunda pergunta requerida (Quais espécies vivem menos em média?).

```Node
var query = new Parse.Query("Specie");
query.exists("averageLifespan");
query.ascending("averageLifespan");
query.limit(3);

var results = await query.find()
results = results.map(item => item.get("name"));

return results;
```
O método retorna um vetor de strings com os nomes das 3 espécies quem vivem menos. `['specie1', 'specie2', 'specie3']`

**`charGender()`:**
Quando chamado executa a busca no banco de dados afim de responder a terceira pergunta requerida (Existem quantos personagens de cada gênero?).

```Node
var query = new Parse.Query("Character");
query.equalTo("gender", "male");
const responseMale = await query.count();

query.equalTo("gender", "female");
const responseFemale = await query.count();

return [responseMale, responseFemale];
```
O método retorna um vetor de inteiros contendo a quantidade de cada gênero (masculino, feminino). `[00, 00]`

**`charHeight()`:**
Quando chamado executa a busca no banco de dados afim de responder a quarta pergunta requerida (Qual a altura média dos personagens?).

```Node
var query = new Parse.Query("Character");
query.exists("height");
query.withCount();

var result = await query.find();

result = result.results
    .map(item => item.get("height"))
    .reduce((a, b) => a + b, 0) / result.count;

return [...Math.trunc(result).toString()];
```
O método retorna um vetor de strings contendo cada caractere correspondente a altura média. `['0', '0', '0']`
>O retorno foi configurado assim para facilitar a formatação da resposta no arquivo .csv

**`charLanguage()`:**
Quando chamado executa a busca no banco de dados afim de responder a quinta pergunta requerida (Quais personagens falam a língua Gungan basic?).

```Node
let Character = Parse.Object.extend("Character");
let Specie = Parse.Object.extend("Specie");

var innerQuery = new Parse.Query(Specie);
innerQuery.equalTo("language", "Gungan basic");

var query = new Parse.Query(Character);
query.matchesQuery("species", innerQuery);

var results = await query.find();
results = results.map(item => item.get("name"));

return results;
```
O método retorna um vetor de strings contendo o nome dos personagens ques satisfazem a pergunta. `['char1', 'char2', 'char3' ,...]`

**`charInMostPopulatedPlanet()`:**
Quando chamado executa a busca no banco de dados afim de responder a sexta pergunta requerida (Quantos personagens vivem no planeta mais populoso?).

```Node
let Character = Parse.Object.extend("Character");
let Planet = Parse.Object.extend("Planet");

var innerQuery = new Parse.Query(Planet);
innerQuery.descending("population");

const planet = await innerQuery.first();

var query = new Parse.Query(Character);
query.equalTo("homeworld", planet);

return await query.count();
```
O método retorna um número inteiro. `0`

### CSV Controller
O arquivo importa previamente a dependência FileSytem nativa do node para criar e ler arquivos. Possui uma classe com o nome CSVController, no construtor ela recebe as resposta de todas as perguntas sequencialmente. A classe contem um método responsável por formatar as resposta e criar o arquivo .csv.

```Node
constructor(q1, q2, q3, q4, q5, q6) {
    this.q1 = q1;
    this.q2 = q2;
    this.q3 = q3;
    this.q4 = q4;
    this.q5 = q5;
    this.q6 = q6;
}
```
#### Métodos:
**`makeCSV()`:**
O método recebe um parâmetro dir que é padrão. Ele será responsavel por concatenar, formatar as respostas e inseri-las no csv.

```Node
var data = `Pergunta 1; Pergunta 2; Pergunta 3; Pergunta 4; Pergunta 5; Pergunta 6\n${this.q1};"${this.q2}";"${"M:"+this.q3[0]},${"F:"+this.q3[1]}";${this.q4[0]+'.'+this.q4[1]+this.q4[2]};"${this.q5}";${this.q6}`;
        await fs.writeFile(dir , data, (err) => {
            if (err) throw err;
        });
        return true;
}
```
O método retorna um valor booleano indicando se a criação do arquivo foi bem sucedida ou não.

***Ao abrir o CSV em um programa apropriado ele deve ter o seguinte formato:***
<img src="https://raw.githubusercontent.com/RochaSamuel/colmeia-challenge-the-return/master/markdownutils/csvfinal.png"/>

### Index File
O arquivo importa previamente os dois controllers necessários para a execução. Possui uma classe denominada TheOracle. Ao ser construída ela executa seu método em que a chamada está presente no construtor.

```Node
constructor() {
    this.init();
}
```
#### Métodos (***Todos os métodos são assíncronos***):

**`init()`:**
Quando chamado utiliza da instância da classe AnswerController previamente criada fora da classe para responder todas as perguntas. Após isso ele cria uma instância da classe CSVController e chama o método makeCSV() para efetivamente criar o arquivo final.

```Node
console.log('Processing answers. Hold on');
var r1 = await answer.firstFilm();
var r2 = await answer.shortLife();
var r3 = await answer.charGender();
var r4 = await answer.charHeight();
var r5 = await answer.charLanguage();
var r6 = await answer.charInMostPopulatedPlanet();

var csv = new CSVController(r1,r2,r3,r4,r5,r6);

if (csv.makeCSV()) console.log('The Oracle is waiting for you with all answers that you need :) in the root of the project');
```
O método apenas executa alguns logs no console.

## Testes
Foram feitos 8 testes, sendo 7 unitários e 1 de integração.

### Integração
**`dbconnection.test.js`:**
Trata-se de um arquivo que contém um teste de conexão para garantir que a aplicação está se comunicando devidamente com o banco de dados.
```Node
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
```

### Unitários
**`answers.test.js`:**
Trata-se de um arquivo que contém 6 testes sendo cada um deles para garantir uma resposta válida para as questões.

```Node
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
    
    ...
```
[Arquivo Completo](https://github.com/RochaSamuel/colmeia-challenge-the-return/blob/master/__tests__/unit/answers.test.js)

**`csvgeneration.test.js`:**
Trata-se de um arquivo que contém 1 teste para verificar se a função de criação do csv está funcionando corretamente.

```Node
it("Should return 'true' if csv was sucessfuly created", () => {
    const csv = new CSVController('test film', ['testspecie','testspecie','testspecie'], [10, 20],
                                  ['2','1','2'], ['char1','char2','char3'], 6);

    var result = csv.makeCSV('./__tests__/utils/answertest.csv');

    expect(result).not.toBeUndefined();
    expect(result).toBeTruthy();
});
```
Este utiliza valores fictícios e guarda o resultado na pasta própria para os testes `__tests__\utils`.

## Tecnologias Usadas
* **[NodeJS](https://nodejs.org/pt-br/)** - Para construção geral da aplicação.
* **[Parse Package](https://www.npmjs.com/package/parse)** - Para gerenciamento e consultas no banco de dados.
* **[Jest](https://jestjs.io/)** - Para testes.

---
*_Desenvolvido por Samuel da Silva Rocha_*
