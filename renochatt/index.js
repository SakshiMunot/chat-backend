const http = require("http");
// const app = require("./app");
// const server = http.createServer(app);

// const { API_PORT } = process.env;
// const port = process.env.PORT || 8000;

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require("express");
const app=express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("./config/database")
// require("./login")
require("./router/messages");
require("./router/userlist");
require("./model/messageschema");

// const app = express();
// require('./database/dblogauth');
// const app = require("./app");
// const server = http.createServer(app);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use('/',require('./login'));
app.use('/',require("./router/messages"));


app.listen(3000, () => {
  console.log("Connected");
});