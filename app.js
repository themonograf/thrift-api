require("dotenv").config();
const express = require("express");
const expressValidator = require("express-validator");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productCategory = require("./routes/product_category");
const upload = require("./routes/upload");
const catalog = require("./routes/catalog");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator.check());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product-category", productCategory);
app.use("/api/upload", upload);
app.use("/api/catalog", catalog);

app.listen(process.env.APP_PORT, () => {
  console.log("server is running");
});
