const express = require('express');
const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`Web API is running on port ${port}`)
});