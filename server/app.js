require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const tripRouter = require("./api/trips/trip.router");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server running");
});
