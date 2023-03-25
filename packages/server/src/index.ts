import express from 'express'

const app = express()
const PORT = 3000

const CLIENT_PATH = '/'
const SCORE_PATH = '/score'

app.get(CLIENT_PATH, (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running at ${PORT}`)
})