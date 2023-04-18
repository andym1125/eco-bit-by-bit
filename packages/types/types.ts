export interface ScoreResponseBody {
    name: string,
    url: string,
    score: number,
    breakdown: {
        water: number,
        carbon: number,
        esg: 'CCC'|'B'|'BB'|'BBB'|'A'|'AA'|'AAA',
        bio: number,
        recycle: number,
        durable: number,
        ctx: string // extra context of breakdown if needed
    },
    expl: string, // explanation of scores
    err: string, // if error exists, this will not be empty
    reli_expl: string,
    reliability: number,
}

export interface ScraperBody {
    title: string,
    customer_rating: number,
    esg: 'CCC'|'B'|'BB'|'BBB'|'A'|'AA'|'AAA',
    temp: number,
    msci_rating: number
}