const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

const HandleError = require('./src/middleware/errorHandler')
const logger = require('./src/middleware/logger')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger')

app.use(express.json())
app.use(cookieParser())
app.use(logger)


const AuthRoutes = require('./src/routes/AuthRoutes')
const UserRoutes = require('./src/routes/UserRoutes')


app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/auth',AuthRoutes)
app.use('/user',UserRoutes)

app.use(HandleError)



module.exports = app