require("dotenv").config()
const express = require('express')
const expressValidator = require('express-validator')
const app = express()
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productCategory = require("./routes/product_category")
const upload = require("./routes/upload")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressValidator.check())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/product-category", productCategory)
app.use("/api/upload", upload)

app.listen(process.env.APP_PORT,()=>{
    console.log("server is running")
})