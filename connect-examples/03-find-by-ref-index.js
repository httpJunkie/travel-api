/* Demonstrate data retrieval using refdoc Indexes */
const { Ottoman, model, Schema } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})

const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String
})

/* Refdoc indexes are more performant but less flexible. 
  Allow only a single document to occupy a particular value 
  and do a direct key-value lookup with a referential document 
  to identify that matching document.

  If you need to do key lookups, this is the way to go. */
airlineSchema.index.findByName = {
  by: 'name',
  type: 'refdoc'
}

const Airline = model('Airline', airlineSchema)

const findByRefIndex = async() => {
  try {
    const result = await Airline.findByName('Couchbase Airlines')
    return result
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
  
  findByRefIndex()
    .then((result) => {
      console.log('Query Result: ', result)
      process.exit(0)
    })
    .catch((error) => console.log(error))

}

main()
