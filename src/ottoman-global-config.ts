const { Ottoman } = require('ottoman')

const ottoman = new Ottoman({
  modelKey: 'type',
  collectionName: '_default',
  scopeName: 'travel',
  keyGeneratorDelimiter: '_'
})

ottoman.connect({
  bucketName: 'travel-api',
  connectionString: 'couchbase://localhost:8091',
  username: 'Administrator',
  password: 'password'
})
