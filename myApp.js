require('dotenv').config() //brings in environment variables from .env
let express = require('express');
let app = express();
let bodyParser = require('body-parser')

//Intro to MiddleWare Fn
app.use((req, res, next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`)
 next()
})

app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json()); //req.body returns a JSON

//utilize middleware to add stylesheets, SVGs, imgs
app.use("/public",express.static(`${__dirname}/public`))

//at this route, respond with an HTML file
app.get('/', (req , res)=> {
  res.sendFile(`${__dirname}/views/index.html`)
})

//chaining middle to a route
app.get('/now', (req, res, next)=>{
 req.time = new Date().toString()
  next()
} , (req, res) => {
  res.json({"time" : req.time})
})

//response w/ JSON
app.get('/json', (req, res)=> {
  const style = process.env.MESSAGE_STYLE
  res.json(
    {"message" : style === 'uppercase'? 'hello json'.toUpperCase(): 'hello json',
    })
})

//Route parameter
app.get('/:word/echo', (req, res)=> {
  res.json({"echo" : req.params})
})

//Query Parameter
app.get('/name', (req, res)=> {
  const {firstName, lastName} = req.query
  res.json({"name" : `${firstName} ${lastName}`})
})

//handle post request
app.post('/name', (req, res)=>{
  const {first, middle, last} = req.body
  res.json({"name" : `${first} ${middle} ${last}`})
})

module.exports = app; 



//app.route(path).get(handler).post(handler)






























