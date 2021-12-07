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
      connectionString: 'couchbases://cb.ch48rafgmf36syp.cloud.couchbase.com?ssl=no_verify',
      username: 'abc',
      password: 'EasyAs123!'
    })
    //await ottoman.connect('couchbases://cb.ch48rafgmf36syp.cloud.couchbase.com/xyz@abc:EasyAs123!?ssl=no_verify');

    // await new Promise((resolve) => setTimeout(resolve, 5000))

    ottoman.start()
    app.listen()

  } catch (e) {
    console.log(e)
  }
}

main()

