import { Schema } from 'ottoman'

const GeolocationSchema = new Schema({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
})

export default GeolocationSchema
