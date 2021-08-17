import { model, Schema } from 'ottoman'

const ScheduleSchema = new Schema({
  day: Number,
  flight: String,
  utc: String,
})

const FlightPathSchema = new Schema({
  id: String,
  airlineid: String,
  sourceairport: String,
  destinationairport: String,
  distance: Number,
  equipment: String,
  stops: Number,
  schedule: [ScheduleSchema]
})

const FlightPathModel = model('flightPath', FlightPathSchema, { 
  collectionName: 'flightPaths' 
})

export default FlightPathModel
