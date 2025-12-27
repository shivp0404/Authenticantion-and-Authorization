const express = require('express')
const app = express();
const HandleError = require('./src/middleware/errorHandler')
const logger = require('./src/middleware/logger')

app.use(express.json())
app.use(logger)

const AuthRoutes = require('./src/routes/AuthRoutes')

app.use('/auth',AuthRoutes)

app.use(HandleError)



module.exports = app