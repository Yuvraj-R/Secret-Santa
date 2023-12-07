require("dotenv").config();

const https = require('https');
const fs = require('fs');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const assignmentRoutes = require("./routes/router");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log("Time:", Date.now);
  next();
});
app.use(cors());
app.use((req, res, next) => {
  {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
})

// middleware: use assignmentRoutes for routing
app.use("/api/assignments", assignmentRoutes);

var key = fs.readFileSync('/etc/letsencrypt/live/secret-santa-generator.net/privkey.pem');
var cert = fs.readFileSync('/etc/letsencrypt/live/secret-santa-generator.net/fullchain.pem');
var credentials = {
  key: key,
  cert: cert
};

const httpsServer = https.createServer(credentials, app);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests, (port number, corresponding function)
    httpsServer.listen(process.env.PORT, () => {
      console.log("connected to db, and listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });