# gov.br News Web Scraping

<div style="display: flex; justify-content: center; align-items: center; gap: 2rem">
  <img 
    style="width: 40%; height: auto" 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" 
  />
  <img 
    style="width: 40%; height: auto" 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Gov.br_logo.svg/1200px-Gov.br_logo.svg.png" 
  />
</div>

<br />
<br />

API construída em NodeJS que extrai os dados das notícias mais recentes disponíveis na página [gov.br/notícias](www.gov.br/pt-br/noticias/) recursivamente através da paginação do próprio site.

## Como rodar

Instale as dependências

```bash
$ npm install
```

Inicie o projeto

```bash
$ npm run start
```

Depois que o servidor iniciar a rota, `/` estará disponível e você poderá receber as notícias através da url `http://localhost:3000/`

A resposta virá como um array de objeto em JSON no seguinte formato:

```json
[
  {
    "subtitle": "string",
    "title": "string",
    "link": "string"
  }
]
```
