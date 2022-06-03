//Inclui a biblioteca
const http = require('http'); // tb vem do site npm e biblioteca http
const url = require('url'); // essa constante foi pesquisada no site do npm.js: "como adionar pacote para manipular url no node"
const querystring = require('query-string');

//define porta e IP onde meu codigo vai rodar
const hostname = '127.0.0.1';
const port = 3000;


//onde esta a logica de programacao
const server = http.createServer((req, res) => {

  //Pega a pergunta na url:
const params = querystring.parse(url.parse(req.url, true).search); // essa funcao esta no site do NPM
//console.log(params);

//Verificar a pergunta e escolher uma resposta:
let resposta;
if (params.pergunta == "melhor-filme"){
  resposta = "Marvel";
}
else if (params.pergunta == "melhor-tecnologia-backend"){
  resposta = "nodejs";
}
else{
  resposta = "Não sei, desculpa :( !";
  }
// Retornando a resposta para o navegador:
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // Retorna a resposta escolhida:
    res.end(resposta);
});

//bloco de sustentacao - é a execucao
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Observações e Dica:
// 1 - para parar o servidor = ctrl+c 
// 2 - https://www.npmjs.com/search?q=query%20string - para pegar elementos 
//        na url. Entap para poder pegar dados da url tem queue baixar um pacote $ npm install query-string.
// 3 - PARA INICIAR : NPM INIT - Depois:  npm install query-string 
//       (instala o pacote desejado na máquina, e criou o node-modules e mais que o query string precisa para rodar )
// 4 - // package.json é o arquivo onde o nmp armazena os pacotes ue ele dentro do projeto.
//       também guarda informacoes do projeto
