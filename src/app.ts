import 'dotenv/config'
import express from 'express'
import 'reflect-metadata'
import { router } from './router'

const app = express()
app.use(express.json())
app.use(router)

export { app }
