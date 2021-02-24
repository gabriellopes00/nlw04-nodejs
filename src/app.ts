import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'

import connection from './database/connection'
import { router } from './router'

connection().then(() => console.log('PostgreSQL connected successfully'))
const app = express()
app.use(express.json())
app.use(router)

export { app }
