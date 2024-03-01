const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 1234;

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoutes')



app.use(cors());
app.use(express.json());

app.use('/', userRoute)

app.listen(PORT, () => console.log(`Running na bro at ${PORT}!`));

