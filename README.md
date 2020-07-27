# Colmeia Challenge The Return

Aplicação construída com [NodeJs](https://nodejs.org/en/) com o intuito de cumprir o desafio proposto pela [Colmeia](https://aulascolmeia.com.br) no âmbito do processo seletivo para estágio.

## O que o App faz?
O app consiste em responder algumas perguntas por meio de progamação, fazendo a análise e extração de dados do banco previamente criado utilizando a plataforma [Parse](https://parseplatform.org/) (Criado pelo Facebook e que atualmente é Open Source) e gerenciado pela [Back4app](https://www.back4app.com/). Ao término da execução a aplicação gera um arquivo no formato .csv que as contém as respostas para cada pergunta.

![img]()

---

## As perguntas: 
A base consiste em um compilado de informações variadas sobre os detalhes da franquia de filmes Star Wars. [Visualizar estrutura do banco](https://www.back4app.com/database/davimacedo/swapi-star-wars-api).

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
   
   * `cd C:...\colmeia-challenge-the-return`

**2. Rode o seguinte comando para instalar as dependências de projeto:**

   * `npm install`

**3. Rode o seguinte comando para iniciar a execução dos testes contidos no projeto:**

   * `npm test`

>**Após alguns segundos o console deve retornar o feedback dos testes.**



### Instruções para rodar o projeto:
**1. Ainda na raiz do projeto rode o seguinte comando (no terminal) para executar efetivamente o código:**

   * `npm run answer`

*este comando pode ser substituído por:*

   * `node src/index.js`

>**A resposta do comando dever ser os logs gerados pela execução do projeto, juntamente com a confirmação de geração do arquivo .csv**

