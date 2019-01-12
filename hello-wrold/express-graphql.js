var express = require('express');
var graphHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
 type Query {
   hello: String
 }
`)

var schema2 = buildSchema(`
 type Query {
   rollDice(numDice: Int!, numSides: Int): [Int]
 }
`)

var root = {
  hello() {
    return 'Hello world'
  },
  rollDice(numDice = 1, numSides = 2) {
    return [1, 2]
  }
}

var app = express();

app.use('/graphql', graphHTTP({
  schema: schema2,
  rootValue: root,
  graphiql: true
}))
app.listen(4000)
console.log('Running a GraphQLAPI server at http://localhost:4000/graphql')
