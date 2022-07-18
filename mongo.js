const mongoose = require('mongoose')
const number = process.argv[4]
const name = process.argv[3]
const password = process.argv[2]
const url = `mongodb+srv://moyanpan:${password}@freestackopen.c4vqjau.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
  })
const Person = mongoose.model('Person', personSchema)
if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log("phonebook: \n");
        result.forEach(note => {
          console.log(note.name, note.number, "\n")
        })
        mongoose.connection.close()
      })
      
}

if(process.argv.length >3){
    const person = new Person({
        id : Math.floor(Math.random() * 100000),
        name : name,
        number : number
    },console.log(`added ${name}, number ${number} to phonebook`))
    person.save().then(result => {
        console.log('note saved!')
        mongoose.connection.close()
      })
}



