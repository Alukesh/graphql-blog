const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.json({ msg: `hello world ${PORT}` })
})

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);

})