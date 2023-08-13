// for server
Running de migration:
npx mikro-orm migration:create
npx mikro-orm migration:create --run

yarn add express apollo-server-express graphql type-graphql pg @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql
yarn add -D @types/express
yarn add reflect-metadata
yarn add argon2

yarn add redis connect-redis express-session
yarn add -D @types/redis @types/express-session
yarn add cors
yarn add -D @types/cors
yarn add nodemailer
yarn add -D @types/nodemailer

req.session.userId = user.id; // store user id session

{userId: 1} => send this to redis

1
sess: ihioehierhioerhoier => {userId: 1}

2
express-session => will set a cookie on browser

3
when user makes a request to server, cookie will be sent to server

4
decrypt cookie and get session id
ihioehierhioerhoier => sess: ihioehierhioerhoier => {userId: 1}

5
make a request to redis
sess: ihioehierhioerhoier => {userId: 1}

req.session.userId = {user.id} // store user id session

//web
yarn create next-app --example with-chakra-ui web
yarn add formik
yarn add urql graphql
yarn add --dev typescript @graphql-codegen/cli
npx graphql-code-generator init
yarn add --dev @graphql-codegen/typescript-urql
yarn add @urql/exchange-graphcache
yarn add next-urql react-is

//apuntesm doc:

URQL:
https://formidable.com/open-source/urql/docs/basics/react-preact/

CODEGEN:
https://graphql-code-generator.com/docs/getting-started/installation

estoy en el min :4:029:08 -about login page

// about next.js
me => browse http://localhost:3000
=> nextsjs server
=> request to graphql server localhost:4000/graphql
=> build the HTML
=> sending back to your browser
