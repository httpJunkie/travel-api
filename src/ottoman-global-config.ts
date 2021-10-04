import { Ottoman } from 'ottoman'

const ottoman = new Ottoman({
  modelKey: 'type',
  collectionName: '_default',
  scopeName: 'travel',
  keyGeneratorDelimiter: '_'
})

export { ottoman }
