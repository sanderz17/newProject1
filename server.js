const express = require('express');
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const booksRouter = require('./routes/books');
const userRouter = require('./routes/users');

app.use("/", booksRouter);
app.use("/", userRouter);

app.get("*", (req, res, next) => {
    res.status(404).json("message API not found");
});

app.listen(port, () => {
    console.log(`Web API is running on port ${port}`)
});