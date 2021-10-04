import { ValidationError } from 'ottoman'

async function makeResponse(res, action) {
  try {
    const result = await action()
    res.json(result)
  } catch (error:any) {
    console.log(error)
    const status = error.message !== undefined && error.message.indexOf('not found') !== -1 
      ? 404 
        : 500
    res.status(error instanceof ValidationError ? 400 : status)
    res.json({ message: error.message })
  }
}

// function will always response to client
// reuse try-catch logic handling errors and also this
// reduce boilerplate in controllers

export default makeResponse
