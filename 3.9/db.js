const { response, request } = require('express')
const express = require('express')
const app = express()
const morgan = require("morgan")
const cors = require('cors')
app.use(cors())

morgan.token('ob', function (req) {
  console.log(req);
  return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :response-time :req[header] :ob'))

app.get('/', function (req, res) {
  res.send('hello, morgan!')
})
app.use(express.json())
let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]
let time = new Date()


app.get('/api/info', (request, response) => {
  response.send(`<h1>Phone has info for ${persons.length} people<br><h1>${time}</h1></h1>`)
})

app.get('/api/persons', (request, response) => {

  response.json(persons)
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
    if(newperson.name.length === 0 || newperson.number.length === 0 ){
        response.status(404).send({error: "name or number is empty"})
    }
    if(persons.find(person => person.name === newperson.name)){
        response.status(404).send({error: "the user is alreay in persons."})
    }


    const newid =  Math.floor(Math.random() * 1000)
    newperson = {"id":newid,...newperson}
    persons.push(newperson)
    response.json(newperson)

})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})