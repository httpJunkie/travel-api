/* Validate a field on Model.save() using Ottoman addValidators()  */
const { Ottoman, Schema, addValidators } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})
const chalk = require('chalk')

addValidators({
  phone: (value) => {
    const phone = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/
    if(value && !value.match(phone)) {
      throw new Error(`Phone ${chalk.red.bold(value)} is invalid`)
    }
  }
})

const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String,
  phone: { type: String, validator: 'phone'}
})

const Airline = ottoman.model('Airline', airlineSchema)

const cbAirlines = new Airline({
  callsign: 'UA',
  country: 'United States',
  name: 'United Airlines',
  phone: 'XYZ-490-2021'
})

const saveDocument = async() => {
  try {
    await cbAirlines.save()
  } catch (error) {
    throw error
  }
}

const main = async () => {
  await ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'travel',
    username: 'Administrator',
    password: 'password'
  })
  
  // Call Ottoman Start which ensures indexes exist on server
  await ottoman.start()
  
  saveDocument()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log(error)
      process.exit(0)
    })
}

main()
