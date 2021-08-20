
import { model, Schema } from 'ottoman'

const AirlineSchema = new Schema({
  name: { type: String, required: true },
  callsign: { type: String, required: true }
})

AirlineSchema.index.findByName = { by: 'name', type: 'n1ql' }
// Callsign Search?

const AirlineModel = model('airline', AirlineSchema, { 
  collectionName: 'airlines' 
})

export default AirlineModel

