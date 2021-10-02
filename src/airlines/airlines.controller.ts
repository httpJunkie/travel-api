import express, { Request, Response } from 'express'
import { FindOptions } from 'ottoman'

import makeResponse from '../shared/make.response'
import { CustomRoute } from '../shared/custom.route'
import AirlineModel from './airlines.model'

class AirlinesController extends CustomRoute {

  public router = express.Router()
  public path: string

  constructor(route: string) {
    super()
    this.path = route
    this.initRoutes()
  }

  public getAll() {
    this.router.get('/', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        const { limit, nameSearch, skip } = req.query
        const options = new FindOptions({ 
          limit: Number(limit || 50), 
          skip: Number(skip || 0) 
        })
        const filter = (nameSearch)
          ? { name: { $like: `%${nameSearch}%` } } 
          : {}
        const result = await AirlineModel.find(filter, options)
        const { rows: items } = result
        return { items }
      })
    })
  }

  public getById() {
    this.router.get('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, () => AirlineModel.findById(req.params.id))
    })
  }

  public post() {
    this.router.post('/', async (req: Request, res: Response) => {
      await makeResponse(res, () => {
        res.status(201)
        const airline = new AirlineModel(req.body)
        return airline.save()
      })
    })
  }

  public patch() {
    this.router.patch('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        res.status(204)
        await AirlineModel.updateById(req.params.id, req.body)
      })
    })
  }

  public put() {
    this.router.put('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await AirlineModel.replaceById(req.params.id, req.body)
        res.status(204)
      })
    })
  }

  public delete() {
    this.router.delete('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await AirlineModel.removeById(req.params.id)
        res.status(204)
      })
    })
  }

}

export default AirlinesController
