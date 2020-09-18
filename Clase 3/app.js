const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

const gatitoRouter = require("./routes/gatitoRoutes");
const userRouter = require("./routes/userRoutes");
const refugiosRouter = require("./routes/refugiosRoutes");

app.use(express.json());

app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("estoy en un middleware");
//   next();
// });

// app.use((req, res, next) => {
//   req.requestedAt = new Date().toISOString();
//   next();
// });

app.use("/gatitos", gatitoRouter);
app.use("/users", userRouter);
app.use("/refugios", refugiosRouter);

module.exports = app;
