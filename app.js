//Inclui a biblioteca
const http = require('http'); // tb vem do site npm e biblioteca http
const querystring = require('query-string');
const url = require('url');
const fs = require('fs');

//define porta e IP onde meu codigo vai rodar
const hostname = '127.0.0.1';
const port = 3000;


//onde esta a logica de programacao
const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true);
    // receber informcoes do usuario
    const params = querystring.parse(urlparse.search);
    //console.log(params);

  //Criar um usuario - Atualizar um usuario
  if (urlparse.pathname == '/criar-atualizar-usuario') {
  
  //Salvar/atualiza as informacoes
      fs.writeFile('users/' + params.id +  '.txt',JSON.stringify(params), function (err) {
        if (err) throw err;
          console.log('Saved!');

          resposta = "Usuario criado com sucesso"

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end(resposta); // Retorna a resposta escolhida:
        });
  } 
  //Selecionar um usuario
    else if (urlparse.pathname =='/selecionar-usuario' ){

      fs.readFile('users/' + params.id +  '.txt', function(err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta); // Retorna a resposta escolhida:
      });
    }
  //Remover um usuario
  else if (urlparse.pathname =='/remover-usuario' ){
    fs.unlink('users/' + params.id +  '.txt', function (err) {
      if (err) throw err;
      console.log('File deleted!');

      resposta =  "Usuario removido!";
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta); // Retorna a resposta escolhida:
    });
  }
});

//bloco de sustentacao - é a execucao
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


//localhost:3000/criar-atualizar-usuario?id=1
//localhost:3000/criar-atualizar-usuario?id=3&idade=37&nome=mysia
//localhost:3000/selecionar-usuario?id=2
//localhost:3000/remover-usuario?id=1
//**vai mudando os dados (numeros, idade) */