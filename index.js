const Application = require("./app/server");
const dotenv = require('dotenv').config();

const DB_URL = "mongodb+srv://ali:12345@cluster0.v8vmkjb.mongodb.net/";
new Application(3000, DB_URL);
