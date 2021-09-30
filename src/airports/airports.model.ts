import { model, Schema } from 'ottoman'

import GeolocationSchema from '../shared/geolocation.schema'

const AirportSchema = new Schema({
  airportname: { type: String, required: true },
  faa: String,
  geo: GeolocationSchema,
})

AirportSchema.index.findByName = { by: 'name', type: 'n1ql' }

const AirportModel = model('airport', AirportSchema, { 
  collectionName: 'airports' 
})

export default AirportModel
