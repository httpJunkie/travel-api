/* Find airline and update using Model.findOne() & Model.update()  */
const { Ottoman, model, Schema, SearchConsistency } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})

const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String
})

const Airline = model('Airline', airlineSchema)

const findAirline = async() => {
  try {
    const filter = { callsign: 'Couchbase'}
    const options = { consistency: SearchConsistency.LOCAL }
    const result = await Airline.findOne(filter, options)
    console.log(`Airline found: `)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

const updateAirline = async(airline) => {
  try {
    // Update the country using the id from the result above
    await Airline.updateById(airline.id, { country: 'United Kingdom' })
    console.log('Airline update success')
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
  
  findAirline()
    .then((airline) => {
      updateAirline(airline)
        .then(() => {
          findAirline()
          .then(() => process.exit(0))
        })
    })
    .catch((error) => console.log(error))

}

main()
