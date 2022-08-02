const Person = require("./models/person")
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const axios = require('axios')
const { response } = require("express")
// const morgan = require('morgan')
require('dotenv').config()
app.use(express.json())
app.use(express.static('build'))
// app.use(morgan((tokens, req, res) => {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     JSON.stringify(req.body)
//   ].join(' ')
// }))




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
    if(newperson.name.length === 0 || newperson.number.length === 0 ){
        response.status(404).send({error: "name or number is empty"})
    }
    const person = new Person({
      id : Math.floor(Math.random() * 10000),
      name : newperson.name,
      number : newperson.number
    })
    Person.create(person,function(err,res){
      if(err) throw err;
      console.log("one document inserted")
      response.json(res.body)
    })
    // Person.replaceOne(person,{name:newperson.name,number:newperson.number},{upsert:true})
})

app.post("/api/deletePerson",(request,response,next) =>{
  const name = request.body.name
  const deleted =Person.deleteOne({name:name})
  .then(result => {
    if(deleted){
      response.status(200).end()
    }else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/updatePerson',(request,response) =>{
  let newperson = request.body
  Person.findOneAndUpdate({"name":newperson.name},{$set: {number:newperson.number}}).then(result => {
    response.status(200).json(result).end()
  }
  ).catch(error => {console.log(error)})

  // try{
  //   const person = Person.updateOne({ name : newperson.name,number : newperson.number},{ $set: { number : newperson.number} })
  //   response.status(200).json(person) 
  // }catch(e){
  //   console.log(e)
  // }

})

app.get('/api/person/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})





const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})