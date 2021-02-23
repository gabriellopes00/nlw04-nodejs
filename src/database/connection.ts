import { createConnection } from 'typeorm'

createConnection().then(() => console.log('PostgreSQL connected successfully'))
