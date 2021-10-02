/* Show referential integrity (relationship constraint) */ 
const { Ottoman, model, Schema, SearchConsistency } = require('ottoman')
const ottoman = new Ottoman({collectionName: '_default'})

const airlineSchema = new Schema({
  callsign: String,
  country: String,
  name: String
})

const Airline = model('Airline', airlineSchema)

const routeSchema = new Schema({
  source_airport: String,
  destination_airport: String,
  airline: { type: String, ref: 'Airline' },
  stops: { type: Number, default: 0 }
})

const Route = model('Route', routeSchema)

const americanAirlines = new Airline({
  callsign: 'AA',
  country: 'United States',
  name: 'American Airlines'
})

const createAndSaveAirline = async() => {
  try {
    await americanAirlines.save()
    console.log(`success: ${americanAirlines.name} added`)
  } catch (error) {
    throw error
  }
}

const createAndSaveRoute = async() => {
  try {
    const route = new Route({
      source_airport : 'LAX',
      destination_airport : 'DFW',
      airline: americanAirlines // Saving refs: assign id from airline
    })

    /* Populated paths are no longer set to their original id, their value is 
      replaced with the Ottoman document returned from the database by performing 
      a separate query before returning the results.

      NOTE: We can check to see if a model has been populated or specify the depth
      in which to populate children, or depopulate. See docs! */

    await route.save()
    console.log('success: Route between LAX and DFW for American Airlines added')

  } catch (error) {
    throw error
  }
}

const findRoutePopulateAirline = async() => {
  try {
    const filter = { source_airport: 'LAX'}
    const options = { consistency: SearchConsistency.LOCAL }
    const laxRoute = await Route.findOne(filter,options)

    // Ottoman shortcut, normally you would have to find these 
    // docs seperately and join them together increasing boilerplate!
    await laxRoute._populate('airline')
    console.log('Route Retrieved : ', laxRoute)
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
  
  createAndSaveAirline()
    .then(() => {
      createAndSaveRoute()
        .then(() => {
          findRoutePopulateAirline()
            .then(() => process.exit(0))
        })
    })
    .catch((error) => console.log(error))
}

main()
