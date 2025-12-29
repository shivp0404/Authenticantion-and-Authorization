const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

const HandleError = require('./src/middleware/errorHandler')
const logger = require('./src/middleware/logger')

app.use(express.json())
app.use(cookieParser())
app.use(logger)


const AuthRoutes = require('./src/routes/AuthRoutes')
const UserRoutes = require('./src/routes/UserRoutes')

app.use('/auth',AuthRoutes)
app.use('/user',UserRoutes)

app.use(HandleError)



module.exports = app