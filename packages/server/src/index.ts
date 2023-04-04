import express, { RequestHandler } from 'express'
import {ScoreResponseBody} from './../../types'

const app = express()
const PORT = 3000

const CLIENT_PATH = '/'
const SCORE_PATH = '/score'

app.get("/", (req, res) => {
    res.send('Hello world')
})

app.get("/score", (req, res) => {
    res.send("{err: 'No parameters'}")
})

app.get("/score/*", getScorePath)

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running at ${PORT}`)
})

function dummyScoreResponse() : ScoreResponseBody
{
    return {
        name: "Lorem Product",
        url: "amazon.com/loremipsumproduct",
        score: 98,
        breakdown: {
            water: 34,
            carbon: 52,
            esg: 'BBB',
            bio: 16,
            recycle: 34,
            durable: 25,
            ctx: "Idk, maybe the carbon or something something" // extra context of breakdown if needed
        },
        expl: "This score is not very accurate. In fact, it is dummy text", // explanation of scores
        err: null, // if error exists, this will not be empty
        reli_expl: "This is dummy data bro",
        reliability: 0,
    }
}

function getScorePath (req: any, res: any)
{
    res.send(dummyScoreResponse())
}