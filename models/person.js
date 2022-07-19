const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  }catch (error){
    console.log(`ERROR: ${error.message}`)
    process.exit(1)
  }
}
connectDB()


const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
  })
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model("Person",personSchema)