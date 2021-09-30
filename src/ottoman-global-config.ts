import { Ottoman, Couchbase } from 'ottoman'

const ottoman = new Ottoman({
  modelKey: 'type',
  collectionName: '_default',
  scopeName: 'travel',
  keyGeneratorDelimiter: '_'
})

export { ottoman }

// ottoman.connect({
//   bucketName: 'travel-api',
//   connectionString: 'couchbase://localhost',
//   username: 'Administrator',
//   password: 'password'
// })
