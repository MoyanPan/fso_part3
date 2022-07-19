const Person = require("./models/person")
const express = require('express')
const app = express()
const cors = require('cors')
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
let time = new Date()
app.get('/', function (req, res) {
  res.send('hello, morgan!')
})




app.get('/api/info', (request, response) => {
  response.send(`<h1>Phone has info for ${persons.length} people<br><h1>${time}</h1></h1>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(204).end()
    }
  })
app.get('/api/delete/:id',(request,response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

})

app.post('/api/persons',(request,response) =>{
    let newperson = request.body
    console.log(newperson);
    if(newperson.name.length === 0 || newperson.number.length === 0 ){
        response.status(404).send({error: "name or number is empty"})
    }
    if(persons.find(person => person.name === newperson.name)){
        response.status(404).send({error: "the user is alreay in persons."})
    }
    const newid =  Math.floor(Math.random() * 1000)
    newperson = {"id":newid,...newperson}
    Person.create({newperson})
    response.json(newperson)

})




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})