const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Web REST API" });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Web API is running on port ${port}`)
});