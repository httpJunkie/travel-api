import { ottoman } from "./ottoman-global-config"

import App from './app'
import HotelsController from './hotels/hotels.controller'
import AirportsController from './airports/airports.controller'
import AirlinesController from './airlines/airlines.controller'
import FlightPathsController from './flightPaths/flightPaths.controller'

const app = new App(
  [
    new HotelsController('/hotels'),
    new AirportsController('/airports'),
    new AirlinesController('/airlines'),
    new FlightPathsController('/flightPaths'),
  ],
  4500
)


const main = async () => {
  try {
    await ottoman.connect({
      bucketName: 'travel-api',
      connectionString: 'couchbase://localhost:8091',
      username: 'Administrator',
      password: 'password',
    })
    await ottoman.start()
    app.listen()
  } catch (e) {
    console.log(e)
  }
}

main()

