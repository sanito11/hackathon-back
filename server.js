const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 1234;

app.use(cors());
app.use(express.json());


app.use('/test', async (req, res) => {
    res.status(200).json({
        message: 'okay ra bai',
        status: 200
    })
})

app.listen(PORT, () => console.log(`Running na sirr at ${PORT}!`));
