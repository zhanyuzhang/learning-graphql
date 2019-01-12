var express = require('express')
var graphHTTP = require('express-graphql')
var { buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    getString: String,
    getInt: Int,
    getFloat: Float,
    getBoolean: Boolean,
    getIntArray: [Int]!
  }
`);

var rootValue = {
  getString() {
    return Math.random() > 0.5 ? '666' : '000'
  },
  getInt() {
    return parseInt(Math.random() * 10)
  },
  getFloat() {
    return Math.random()
  },
  getBoolean() {
    return Math.random() > 0.5;
  },
  getIntArray() {
    return Array.from(Array(parseInt(Math.random() * 10))).fill(6)
  }
}

const app = express();

app.use('/graphql', graphHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(4000)

console.log('Running a GraphQLAPI server at http://localhost:4000/graphql')