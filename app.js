const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

const HandleError = require('./src/middleware/errorHandler')
const logger = require('./src/middleware/logger')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger')


app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
console.log("ENV CHECK:", process.env.Frontend_URL);


app.use(express.json())
app.use(cookieParser())
app.use(logger)



const AuthRoutes = require('./src/routes/AuthRoutes')
const UserRoutes = require('./src/routes/UserRoutes')


app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/auth',AuthRoutes)
app.use('/user',UserRoutes)

app.use(HandleError)



module.exports = app