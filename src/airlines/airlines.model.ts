import { model, Schema } from 'ottoman'

const AirlineSchema = new Schema({
  id: { type: Boolean, required: true },
  name: { type: String, required: true },
  callsign: { type: String, required: true }
})

AirlineSchema.index.findByName = { by: 'name', type: 'n1ql' }
// Callsign Search?

const AirlineModel = model('airline', AirlineSchema, {
  idKey: 'id',
  collectionName: 'airlines' 
})

export default AirlineModel
