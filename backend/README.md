
### Desafio backend Goomer
![alt text](https://github.com/goomerdev/job-dev-backend-interview/raw/master/media/logo-azul.png "Goomer")
![alt text](https://github.com/goomerdev/job-dev-backend-interview/raw/master/media/may-the-force-be-with-you.jpg")


### Instruções
Após clonar o projeto 
- cd backend/
- usar como sugestão o comando "npm install" e rodar a aplicação com "npm start";
- rodar configuração do docker com postgres para servidor:
    `docker run --name goomer -p 5432:5432 -e POSTGRES_PASSWORD=goomer -d postgres`
- também criar servidor de testes:
    `docker run --name goomer-test -p 5432:5432 -e POSTGRES_PASSWORD=goomertest -d postgres`
- consultar documentação: 
-- [Docker + postgres](https://hub.docker.com/_/postgres);
- criação de migrations e tabelas no banco com o comando "npx prisma migrate dev" vide documentação:
-- [Prisma Migrate](https://www.prisma.io/docs/guides/migrate-to-prisma/migrate-from-sequelize);
- Rodar projeto e para testar as rotas usar como sugestão o Insomnia
-- [Insomnia](https://insomnia.rest/download);
-- Como sugestão para visualização do banco de dados, o prisma oferece uma ferramenta com o comando "npx prisma studio";


### Estrutura
Foi usada a estrutura dentro da pasta **src**:
*config*:
-url de co*nfiguração da api.
-configurações do multer para criação de path e imagens;
*controller e services*
- foi criada controllers e services para organização das regras de negócio;
*functions*
- foi criada uma pasta de functions ser compartilhada por toda a aplicação;
*models*
- foi criada uma pasta de models para tipar a entrada de dados;
*routes*
- foi feita a separação de cada arquivo de rotas com seus respectivos serviços para organização;
*uploads*
- local onde as imagens são armazenadas;
*unit*
- foi criada uma pasta com *assets* (imagens a ser usadas nos testes) e *tests* com todos os arquivos de testes;

**raíz do projeto**
- Foi criado um arquivo (routes.ts) com todas as bases das rotas para distribuição na pasta de rotas;
- Criado o server.ts para gerenciar todas as importações principais e rodar o projeto;

### Packages
**prisma** -- [Prisma](https://www.prisma.io/docs/getting-started/quickstart);
Usei o prisma para conectar ao banco de dados e criar as tabelas, para as regras de negócio do sql foram usados os métodos:
- `$queryRawUnsafe`;
- `$executeRaw`;
- `$queryRaw`;

**.env** -- [Dotenv](https://www.npmjs.com/package/dotenv);
Foi usado varáveis de ambiente com um arquivo *.env* criado na raiz do projeto;
O arquivo *.env* foi configurado da seguinte forma:
`APP_URL=http://localhost:3333` -> porta escolhida
`DATABASE_URL=postgresql://postgres:goomer@localhost:5432/postgres` -> caso siga o run docker conforme explicado acima.
`DATABASE_URL="postgresql://postgres:goomertest@localhost:5432/postgres` -> ao fazer os testes alterar DATABASE_URL para essa.
`TEST_ORDER="jest src/unit/tests/Restaurant.spec.ts && jest src/unit/tests/PhotoRestaurant.spec.ts && ..."` -> colocar todos os arquivos de teste, caso opte por usar essa variável de ambiente, alterar o script de test no *package.json* para:
scripts: {
    "test": "dotenv cross-var %TEST_ORDER%"
};

**YUP** --[Yup](https://www.npmjs.com/package/yup);
Usei o yup para validações;

**Multer** --[Multer](https://www.npmjs.com/package/multer);
Usei o multer para organizar o upload de imagens e gerenciar arquivos file;

Também foram usados:
**express-handler-errors, express, cors, helmet, typescript, express-rate-limit**;

### Métodos e regras de negócio
Como exemplo para explicação do projeto vou usar o **RestaurantService**;
*index GET*
- traz todos os restaurantes listados;
*show GET* 
- mediante a "id" enviado exibe o restaurante;
- fiz três consultas no banco para montar uma estrutura mais organizada e separada na saída ao invés de usar um JOIN e trazer todos os dados juntos;
*store POST*
- realiza a validação com o **YUP** e salva os dados conforme informações passadas;
*update PUT*
- atualiza os dados mediante envio do id;
*delete DELETE* 
- deleta um restaurante mediante envio de id;

No service **ScheduleService** foram criados mais dois métodos para trazer os dados mediante:
*getByRestaurant GET*
- caso a pesquisa for pelo id_restaurant;
*getBySale GET*   
- caso a pesquisa for pelo id_sale;

### Validações
- Para as validações foi usado o *YUP*, porém no service de `Schedule` foi feita uma validação através de uma function compartilhada para os métodos de store e update.
- Segui as seguintes regras:
- o horário precisa ser no formato `HH:mm`;
- o horário inicial não pode ser menor do que o final;
- o intervalo entre os horários precisa ser no mínimo de 15 minutos;

### Tabelas
Explicação sobre as tabelas criadas e a organização das mesmas para solução do desafio:
`Restaurant` -> tabela criada com informações necessárias do restaurante e tem relação com `PhotoRestaurant` e `Schedule`;
`PhotoRestaurant` -> tabela criada para armazenar informações da foto do Restaurante, relacionada com `Restaurant`;
`Product` -> tabela criada com informações necessárias do produto e relacionada com `PhotoProduct` e `Restaurant`, também pode ter relação com `Sale`;
`PhotoProduct` -> tabela criada para armazenar informações da foto do Produto, relacionada com `Product`;
`Sale` -> tabela criada com informações necessárias da promoção e relacionada com `Product`, e também relação com `Schedule`;
`Schedule` -> essa tabela foi criada com o intuito de atender tanto aos horários do Restaurante `Restaurant` quanto aos horários de um eventual promoção em `Sale`;

### Testes
- Foi criado um arquivo **jest.config.cjs* na raíz do projeto.
- Na pasta *unit* contém:
*assets* com os arquivos a serem usados nos testes de `PhotoRestaurant` e `PhotoProduct`;
*tests* com todos os testes abaixo:
`Restaurant` -> criei testes de todos os métodos e um Post a mais para teste do delete;
`PhotoRestaurant` -> criei testes de todos os métodos;
`Product` -> criei testes de todos os métodos e um Post a mais para teste do delete;
`PhotoProduct` -> criei testes de todos os métodos;
`Sale` -> criei testes de todos os métodos e um Post a mais para teste do delete;
`Schedule` -> criei testes de todos os métodos e um Post a mais para teste do delete;

**#** NOTAS IMPORTANTES SOBRE OS TESTES **#**
* No arquivo *package.json* foram criados os seguintes scripts:
- pretest -> cria as migrations e as tabelas no banco de dados;
- test -> executa todos os testes na ordem para evitar erros, visto que temos tabelas com relação entre elas;
- posttest -> executa um reset nas migrations para limpeza do banco. O mesmo questiona sobre apagar ou não os testes, 
caso queira visualizar os testes no banco de dados selecione a opção N, se quiser excluir selecione a opção Y;

### Melhorias e desafios da aplicação
**Desafio**
- Acho que uma boa solução foi usar a table `Schedule` que organiza os horários tanto para `Restaurant` quanto para `Sale`.
- O meu maior desafio foi na execução das consultas do banco com SQL, tenho um certo conhecimento de sql, porém havia feito apenas um projeto que tive a necessidade de usar
essas consultas, portanto, meu desafio foi conseguir encontrar uma solução para trazer os dados de maneira mais correta e fácil de execução para um frontend;
- Como é a primeira vez que uso testes na prática (excluindo projetos de estudo) tive um pouco de dificuldades principalmente na organização de sequências dos arquivos a serem
testados, porém tentei achar a melhor solução.

**Melhorias**
- A melhoria se baseia no que expliquei acima na guia **Desafio**, acredito que através de um estudo mais aprofundado posso executar de uma forma que melhore a performance
de consulta do banco SQL.
- Para os testes existem outras soluções de sequência de testes, ou poderia ser criada uma variável de ambiente no *.env* conforme feito, mas a visualização foi prejudicada
e preferi deixar no *package.json* com todos os arquivos no script: test.
- Poderiam ter algumas validações mais aprofundadas, também um tratamento de erros mais específico.
- Imaginando que essa api atenda mais de um restaurante poderia ser criado um middleware que usado na rota impediria um usuário de acessar determinada rota inacessível.

### Considerações finais
- Encontrei o desafio ao buscar algo para estudar e melhorar como desenvolvedor, tentei utilizar os conceitos que conheço atualmente em node, deixando o código o mais limpo possível. 
- Atualmente sou fullstack trabalhando: 
frontend-> *React* e *Angular*; 
backend-> *Node* e *PHP* 
-Já trabalhei em alguns projetos de estudo mobile com *React Native* e *Ionic* e também na criação de web-components para design com *Stencil*;
- Agradeço a oportunidade. Obrigado.





