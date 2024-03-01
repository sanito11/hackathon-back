const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 1234;

const userRoute = require('./routes/userRoutes')
const applicantsRoute = require('./routes/applicantsRoute')
const applicationsRoute = require('./routes/applicationsRoute')
const companiesRoute = require('./routes/companiesRoute')


app.use(cors());
app.use(express.json());

app.use('/', userRoute)
app.use('/applicants', applicantsRoute)
app.use('/applications', applicationsRoute)
app.use('/companies', companiesRoute)

app.listen(PORT, () => console.log(`Running na bro at ${PORT}!`));

