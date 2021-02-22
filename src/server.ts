import express from 'express'

const app = express()
app.use(express.json())

app.get('/users', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.post('/post', (request, response) => {
  response.json({ data: request.body })
})

const port = 9899
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
)
