const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')

const { connectDB } = require('./db')
const app = express()
dotenv.config()
const PORT = process.env.PORT

connectDB()

app.get('/', (req, res) => {
    res.json({ msg: `Welcome! go to /graphql` })
})


app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);

})