const express = require('express')
const connectToMongoDB = require('./db')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
let port = 4000

connectToMongoDB()

app.use(cookieParser())
app.use(express.json())
app.use('/api',require('./routes/userroutes'))

app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})