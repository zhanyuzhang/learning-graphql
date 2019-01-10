var express = require('express');
var graphHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
 type Query {
   hello: String
 }
`)

var root = {
  hello: () => {
    return 'Hello world'
  }
}

var app = express();

app.use('/graphql', graphHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))
app.listen(4000)
console.log('Running a GraphQLAPI server at http://localhost:4000/graphql')
