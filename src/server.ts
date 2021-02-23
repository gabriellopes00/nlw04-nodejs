import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'

import './database/connection'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(router)

const port = process.env.PORT
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
)
