import express, { RequestHandler } from 'express'
import { ScoreResponseBody } from './../../types'
import runScraper from './../../scraper/src'

import cors from 'cors';
import score from './algo';

const app = express()
const PORT = 3001

const CLIENT_PATH = '/'
const SCORE_PATH = '/score'

app.use(cors())

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

function dummyScoreResponse(): ScoreResponseBody {
    return {
        name: "Lorem Product",
        url: "amazon.com/loremipsumproduct",
        score: 98,
        breakdown: {
            water: 71,
            carbon: 52,
            esg: 'bbb',
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

async function getScorePath(req: any, res: any) {

    const request = req as Request
    const response = res as Response

    let newUrl = request.url.substring(7, request.url.length)
    newUrl = "https://www.amazon.com/" + newUrl
    // tslint:disable-next-line:no-console
    console.log(newUrl)

    const scraperBody = await runScraper(newUrl)
    // tslint:disable-next-line:no-console
    console.log(scraperBody)

    res.send(dummyScoreResponse())
}
