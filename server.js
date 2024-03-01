const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 1234;

const userRoute = require('./routes/userRoutes')
const applicantsRoute = require('./routes/applicantsRoute')


app.use(cors());
app.use(express.json());

app.use('/', userRoute)
app.use('/applicants', applicantsRoute)


app.listen(PORT, () => console.log(`Running na bro at ${PORT}!`));

