import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import { HttpErrors } from './errors/http-errors'
import { router } from './router'

const app = express()
app.use(express.json())
app.use(router)

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof HttpErrors)
    return res.status(error.statusCode).json({ message: error.message })
  else return res.status(500).json({ message: 'Internal Server Error' })
})

export { app }
