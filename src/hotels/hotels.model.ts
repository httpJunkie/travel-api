import { addValidators, Schema, model } from 'ottoman'

import GeolocationSchema from '../shared/geolocation.schema'
import LinkType from '../shared/link.type'

addValidators({
  phone: (value: any) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (value && !value.match(regex)) {
      throw new Error('Phone number is invalid.')
    }
  },
})

const ReviewSchema = new Schema({
  author: String,
  content: String,
  date: Date,
  ratings: {
    Cleanliness: { type: Number, min: 1, max: 10 },
    Service: { type: Number, min: 1, max: 10 },
    Overall: { type: Number, min: 1, max: 10 },
  },
})

const HotelSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  geo: GeolocationSchema,
  phone: { type: String, validator: 'phone' },
  reviews: [ReviewSchema],
  url: LinkType,
  vacancy: Boolean,
})

HotelSchema.index.findByName = { by: 'name' }
HotelSchema.index.findByCity = { by: 'city', type: 'n1ql' }

const HotelModel = model('hotel', HotelSchema, { 
  collectionName: 'hotels' 
})

export default HotelModel
