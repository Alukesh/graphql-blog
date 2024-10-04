const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')

const { connectDB } = require('./db')
const app = express()
dotenv.config()
const PORT = process.env.PORT

const { authenticate } = require('./middleware/auth')
connectDB()

app.use(authenticate)


app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))

app.get('/', (req, res) => {
    console.log(req.verifiedUser);
    res.json({ msg: `Welcome! go to /graphql` })
})

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})