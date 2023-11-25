import "./loadEnvironment";
const express = require("express");
const mongoose = require("mongoose");
const assignmentRoutes = require("./routes/assignments");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log("Time:", Date.now);
  next();
});

// middleware: use assignmentRoutes for routing
app.use("/api/assignments", assignmentRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests, (port number, corresponding function)
    app.listen(process.env.PORT, () => {
      console.log("connected to db, and listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
