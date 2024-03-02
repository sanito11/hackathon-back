const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 1234;

const userRoute = require('./routes/userRoutes')
const applicantsRoute = require('./routes/applicantsRoute')
const applicationsRoute = require('./routes/applicationsRoute')
const companiesRoute = require('./routes/companiesRoute')
const workersRoute = require('./routes/workersRoute')
const jobsRoute = require('./routes/jobsRoute')
const usersRoute = require('./routes/usersRoute') //job-seekers

app.use(cors());
app.use(express.json());

app.use('/', userRoute)
app.use('/applicants', applicantsRoute)
app.use('/applications', applicationsRoute)
app.use('/companies', companiesRoute)
app.use('/workers', workersRoute)
app.use('/jobs', jobsRoute)
app.use('/users', usersRoute)



app.listen(PORT, () => console.log(`Running na bro at ${PORT}!`));

