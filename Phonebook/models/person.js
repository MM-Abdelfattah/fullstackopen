const mongoose = require('mongoose')

// Custom validator for phone number format (exercise 3.20)
const phoneValidator = (number) => {
  // Must be at least 8 chars, formed of two parts separated by '-'
  // First part: 2-3 digits, second part: digits only
  const phoneRegex = /^\d{2,3}-\d+$/
  if (!phoneRegex.test(number)) return false
  // Total length must be at least 8
  return number.length >= 8
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'], // exercise 3.19
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    validate: {
      validator: phoneValidator,
      message: (props) =>
        `${props.value} is not a valid phone number! ` +
        'Phone number must have at least 8 digits, ' +
        'formatted as XX-XXXXXXX or XXX-XXXXXXX (e.g. 09-1234556 or 040-22334455)',
    },
  },
})

// Transform _id to id and remove __v in JSON output
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
