const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000

// middle ware
app.use(cors())
app.use(express.json())

// server test
app.get('/', (req, res) => {
    res.send('Task manager assignment server is running...........')
})

app.listen(port, () => {
    console.log(`Task manager assingment server is running on port:${port}`)
})

