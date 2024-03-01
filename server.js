const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 1234

app.use(cors())
app.use(express.json())


app.listen(PORT, () => console.log(`Running at ${PORT}!`))