/* Create a custom type and constraints */
const { Ottoman, Schema, IOttomanType, registerType, ValidationError, SearchConsistency } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})

// Steps to createcustom type: 1. Define 2. Register 3. And use it!

// Step 1 : Define Custom Type extending IOttomanType
class LinkType extends IOttomanType {
  constructor(name) {
    super(name, 'Link')
  }
  cast(value) {
    this.validate(value)
    return String(value)
  }

  validate(value, strict) {
    if (value && !isLink(String(value))) {
      throw new ValidationError(`Field ${this.name} only allows a Link`)
    }
    return String(value)
  }
}

/* NOTE: You would extend IOttoman type instead of using a validator to provide 
  your appl with a custom data type, not simply to provide validation.
  A validator is just a constraint for this type */

function isLink(value) {
  const regExp = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
  )
  return regExp.test(value)
}

// Step 2 Register Custom Type
const linkTypeFactory = (name) => new LinkType(name)
registerType(LinkType.name, linkTypeFactory)

// Step 3 Use it
const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String,
  link: LinkType
})

const Airline = ottoman.model('Airline', airlineSchema)

const unitedAirlines = new Airline({
  callsign: 'United',
  country: 'United States',
  name: 'United Airline',
  link: 'http://www.united.com'
})

const saveAirline = async() => {
  try {
    await unitedAirlines.save()
    console.log('success: airline added')
  } catch (error) {
    throw error
  }
}

const findAirline = async() => {
  try {
    const filter = { callsign: 'United'}
    const options = { consistency: SearchConsistency.LOCAL }
    const result = await Airline.findOne(filter, options)
    console.log('Airline Retrieved: ', result)
  }
  catch (error) {
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
  
  saveAirline()
    .then(() => {
      findAirline()
        .then(() => process.exit(0))
        .catch((error) => console.log(error))
    })
    .catch((error) => console.log(error))
}

main()
