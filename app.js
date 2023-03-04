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
const product = require("./routes/product");
const productImage = require("./routes/product_image");
const masterImage = require("./routes/master_image");
const reseller = require("./routes/reseller");
const productItem = require("./routes/product_item");
const order = require("./routes/order");

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
app.use("/api/product", product);
app.use("/api/upload", upload);
app.use("/api/catalog", catalog);
app.use("/api/product-image", productImage);
app.use("/api/master-image", masterImage);
app.use("/api/reseller", reseller);
app.use("/api/product-item", productItem);
app.use("/api/order", order);

app.listen(process.env.APP_PORT, () => {
  console.log("server is running");
});
