const app = require('./app')
const port = process.env.Port || 3000

const StartServer = ()=>{
    app.listen(port,()=>{
        console.log(`Server is running on: http://localhost:${port}`)
    })
}

StartServer()