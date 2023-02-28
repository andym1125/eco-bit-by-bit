import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running at ${PORT}`)
})