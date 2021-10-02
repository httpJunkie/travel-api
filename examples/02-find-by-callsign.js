/* Demonstrate data retrieval with <Model>.find() 
  using a filter by callsign */
const { Ottoman, model, Schema, SearchConsistency } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})

/* To retrieve doc by a field other than id, if no ref index is used,
  we do a full scan which is expensive */
const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String
})

const Airline = model('Airline', airlineSchema)

const findByCallsign = async() => {
  try {
    const filter = { callsign: 'Couchbase'}
    const options = { consistency: SearchConsistency.LOCAL }
    const result = await Airline.find(filter, options)
    return result.rows
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
  
  findByCallsign()
    .then((result) => {
      console.log('Query Result: ', result)
      process.exit(0)
    })
    .catch((error) => console.log(error))

}

main()
