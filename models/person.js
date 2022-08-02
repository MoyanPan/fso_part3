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
    id: {type:Number,
        required:true
    },
    name: {type:String,
           minLength:3,
           required:true
    },
    number: {
      type: String,
      // validate: {
      //   validator: function(v) {
      //     return /\{d{3}||d{2}}-\d/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid phone number!`
      // },
      required: [true, 'User phone number required']
    }
  })
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model("Person",personSchema)