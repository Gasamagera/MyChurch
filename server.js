const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  encodeURIComponent(process.env.DATABASE_PASSWORD)
);
console.log(DB)
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection failed:", err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});
