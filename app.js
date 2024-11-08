const express = require("express");
const memberRouter = require("./routes/memberRoutes");
const adminRouter = require("./routes/adminRoutes");
const app = express();


app.use(express.json({ limit: "10kb" }));

//ROUTES
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/members", memberRouter);
module.exports = app;
