const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
require('./Database/DataBaseConnection');
const routes=require('./Routes/Routes');

app.use(express.json());
app.use(express.static("./public"));
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
