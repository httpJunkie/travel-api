import { start } from 'ottoman'
require('./ottoman-global-config')

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


start().then(() => {
  console.info('All the indexes were registered')
  app.listen()
}).catch(e => console.error(e))

