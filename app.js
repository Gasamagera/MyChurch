const express = require("express");
const memberRouter = require("./routes/memberRoutes");
const adminRouter = require("./routes/adminRoutes");
const countryRouter = require("./routes/countryRoutes");
const occupationRoute = require("./routes/occupationRoutes");
const app = express();

app.use(express.json({ limit: "10kb" }));

//ROUTES
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/occupation", occupationRoute);
module.exports = app;
