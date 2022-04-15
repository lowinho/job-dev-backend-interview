
### Desafio backend Goomer
![alt text](https://github.com/goomerdev/job-dev-backend-interview/raw/master/media/logo-azul.png "Goomer")
![alt text](https://github.com/goomerdev/job-dev-backend-interview/raw/master/media/may-the-force-be-with-you.jpg")


### Instruções
Após clonar o projeto 
- cd backend/
- usar como sugestão o comando "npm install" e rodar a aplicação com "npm start";
- rodar configuração do docker com postgres, consultar documentação: 
-- [Docker + postgres](https://hub.docker.com/_/postgres);
- criação de migrations e tabelas no banco com o comando "npx prisma migrate dev" vide documentação:
-- [Prisma Migrate](https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-sequelize);
- Rodar projeto e para testar as rotas usar como sugestão o Insomnia
-- [Insomnia](https://insomnia.rest/download);


### Estrutura
Foi usada a estrutura dentro da pasta **src**:
*config*:
-url de co*nfiguração da api.
-configurações do multer para criação de path e imagens;
*controller e services*
- foi criado controllers e services para organização das regras de negócio;
*models*
- foi criado um arquivo de models para tipar a entrada de dados;
*routes*
- foi feita a separação de cada arquivo de rotas com seus respectivos serviços para organização;
*uploads*
- local onde as imagens são armazenadas;

**raíz do projeto**
- Foi criado um arquivo (routes.ts) com todas as bases das rotas para distribuição na pasta de rotas;
- Criado o app.ts para gerenciar todas as inportações principais e rodar o projeto;

### Packages
**prisma** -- [Prisma](https://www.prisma.io/docs/getting-started/quickstart);
Usei o prisma para conectar ao banco de dados e criar as tabelas, para as regras de negócio do sql foram usados os métodos:
- `$queryRawUnsafe`;
- `$$executeRaw`;
- `$queryRaw`;
Foi usado varáveis de ambiente com um arquivo ".env" criado na raiz do projeto;
**YUP** --[Yup](https://www.npmjs.com/package/yup);
Usei o yup para validações;
**Multer** --[Multer](https://www.npmjs.com/package/multer);
Usei o multer para organizar o upload de imagens e gerenciar arquivos file;

Também foram usados:
**express-handler-errors, express, cors, helmet, typescript**;

### Métodos e regras de negócio
Como exemplo para explicação do projeto vou usar o **RestaurantService**;
*index GET*
- traz todos os restaurantes listados;
*show GET* 
- mediante a "id" enviado exibe o restaurante;
- fiz três consultas no banco para montar uma estrutura mais organizada e separada na saída ao invés de usar um JOIN e trazer todos os dados juntos;
*store POST*
- realiza a validação com o **YUP** salvo os dados conforme informações passadas;
*update PUT*
- atualiza os dados mediante envio do id;
*delete DELETE* 
- deleta um restaurante mediante envio de id;
No service **ScheduleService** foram criados mais dois métodos para trazer os dados mediante:
*getByRestaurant GET*
- caso a pesquisa for pelo id_restaurant;
*getBySale GET*   
- caso a pesquisa for pelo id_sale;

### Tables
Explicação sobre as tables criadas e a organização das mesmas para solução do desafio:
`Restaurant` -> tabela criada com informações necessárias do restaurante e tem relação com `PhotoRestaurant` e `Schedule`;
`PhotoRestaurant` -> tabela criada para armazenar informações da foto do Restaurante, relacionada com `Restaurant`;
`Product` -> tabela criada com informações necessárias do produto e relacionada com `PhotoProduct` e `Restaurant`, também pode ter relação com `Sale`;
`PhotoProduct` -> tabela criada para armazenar informações da foto do Produto, relacionada com `Product`;
`Sale` -> tabela criada com informações necessárias da promoção e relacionada com `Product`, e também relação com `Schedule`;
`Schedule` -> essa tabela foi criada com o intuito de atender tanto aos horários do Restaurante `Restaurant` quanto aos horários de um eventual promoção em `Sale`;

### Melhorias e desafios da aplicação
**Desafio**
- O meu maior desafio foi na execução das consultas do banco com SQL, tenho um certo conhecimento de sql, porém havia feito apenas um projeto que tive a necessidade de usar
essas consultas, portanto, meu desafio foi conseguir encontrar uma solução para trazer os dados de maneira mais correta e fácil de execução de um frontend;

**Melhorias**
- A melhoria se baseia no que expliquei acima na guia **Desafio**, acredito que através de um estudo mais aprofundado posso executar de uma forma que melhore a performance
de consulta do banco SQL.
- Acho que uma boa solução foi usar a table `Schedule` que organiza os horários tanto para `Restaurant` quanto para `Sale`.

### Considerações finais
- Encontrei o desafio ao buscar algo para estudar e melhorar como desenvolvedor, tentei utilizar os conceitos que conheço atualmente em node, deixando o código o mais limpo possível. 
- Atualmente sou fullstack trabalhando: 
frontend-> *React* e *Angular*; 
backend-> *Node* e *PHP* 
-Já trabalhei em alguns projetos de estudo mobile com *React Native* e *Ionic* e também na criação de web-components para design com *Stencil*;
- Agradeço a oportunidade. Obrigado.
