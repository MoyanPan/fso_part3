const Person = require("./models/person")
const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const morgan = require('morgan')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/info', (request, response) => {
  response.send(`<h1>Phone has info for ${persons.length} people<br><h1>${time}</h1></h1>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.post('/api/persons',(request,response) =>{
    let newperson = request.body
    console.log("new person is",newperson);
    if(newperson.name.length === 0 || newperson.number.length === 0 ){
        response.status(404).send({error: "name or number is empty"})
    }
    const person = new Person({
      id : Math.floor(Math.random() * 10000),
      name : newperson.name,
      number : newperson.number
    })
    person.save().then(savedPerson =>{
      response.json(savedPerson)
    })
})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})