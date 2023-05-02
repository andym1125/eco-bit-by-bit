import puppeteer, {Browser, Page} from 'puppeteer'
import {ScraperBody, ESG} from '../../types'

const MSCI_URL = 'https://www.msci.com/our-solutions/esg-investing/esg-ratings-climate-search-tool'
function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function checkEval<T>(promise: Promise<T>, sleepNum: number = 0, fatal: boolean = true)
{
    if(sleepNum !== 0)
        await sleep(sleepNum)
    let ret = null

    if(fatal)
        ret = await promise
    else {
        try {
            ret = await promise
        } catch(e) {
            console.log(e)
        }
    }

    return ret
}


async function scrapeAmazon(body: ScraperBody, url : string, browser : Browser) {
    const page = await browser.newPage()
    await page.goto(url)

    body.title = (await page.$eval('#productTitle', (el) => el.innerHTML)).trim()

    await sleep(5000)

    // Get reviews
    await page.bringToFront()
    const reviewQuery = '.AverageCustomerReviews > div > div.a-col-right > div > span > span' // #reviewsMedley > div > .a-col-left > span.cr-widget-TitleRatingsHistogram > span >
    const reviewText = await page.$eval(reviewQuery, (el) => el.innerText)
    body.customer_rating = parseFloat(reviewText.match(/\d+\.\d+/g)[0])

    // Get description
    await page.bringToFront()
    await page.waitForSelector('div#feature-bullets')
    body.description = await page.$eval("div#feature-bullets", (el: HTMLElement) => {return el.innerHTML})
    console.log(body.description)

    // Get manufacturer
    body.manufacturer = await page.$eval('#detailBullets_feature_div > ul', (ul: HTMLUListElement) => {
        for(const child of ul.children)
        {
            const span: HTMLSpanElement = child.children.item(0) as HTMLSpanElement
            span.children.item(0)

            if((span.children.item(0) as HTMLSpanElement).innerText.match('^[^\\w]*Manufacturer[^\\w]*:[^\\w]*$'))
                return span.children.item(1).innerHTML
        }
        return null
    })
    console.log(`Manufacturer: ${body.manufacturer}`)
}

async function scrapeMsci(body: ScraperBody, browser: Browser) {
    const page = await browser.newPage()
    await page.goto(MSCI_URL)

    // Search for company
    await page.waitForSelector('#_esgratingsprofile_keywords')
    await page.type('#_esgratingsprofile_keywords', body.manufacturer, {'delay': 250}) // TODO: Replace with maufacturer
    await sleep(2000)
    const noresult = await checkEval (
        page.$eval('#_esgratingsprofile_noResultMessageWrapper', (el: HTMLDivElement) => el.style.display),
        0
    )
    // await page.$eval('#_esgratingsprofile_noResultMessageWrapper', (el: HTMLDivElement) => el.style.display)
    if(noresult !== 'none')
    {
        console.log('No MSCI result')
        return
    }

    await page.click('#ui-id-1 > li')
    await sleep(750)

    // Begin retrieving data
    console.log("Retrieving " + await page.$eval('#_esgratingsprofile_esg-ratings-profile-container > .esg-ratings-profile-header-coredata > .header-company-title', (el: HTMLHeadingElement) => el.innerText))

    // Retreive rating
    await page.click('#esg-transparency-toggle-link')
    body.esg = await page.$eval('#_esgratingsprofile_esg-ratings-profile-header > div > div.ratingdata-container > div.ratingdata-outercircle > div.ratingdata-company-rating',
        (el : HTMLDivElement) => {
            for(const className of el.classList)
            {
                const result = /esg-rating-circle-(\w+)/.exec(className)
                if(result !== null)
                {
                    return result[1] as ESG
                }
            }
            return null
        })
    console.log(body.esg)

    // Retreive temp
    await page.click("#esg-climate-toggle-link")
    body.temp = await page.$eval('span.implied-temp-rise-value', (el: HTMLSpanElement) =>
    {
        const match = el.innerText.match(/-?\d+(\.\d+)?/);
        if (!match) {
          return null;
        }
        const num = parseFloat(match[0]);
        return num
    })
    console.log(body.temp)
}

function runScraper(url : string): ScraperBody|null {
    const browserPromise = puppeteer.launch({headless:false})
    let browser : Browser

    let ret: ScraperBody|null
    browserPromise.then(async (result) => {
        browser = result
        const body: ScraperBody = {}
        await scrapeAmazon(body, url, browser)
        await scrapeMsci(body, browser)

        console.log(body)
        ret = body
    }).catch((e) => {
        console.error(e)
    }).finally(async () => {
        if(browser) {
            await browser.close()
            console.log('Browser successfully closed')
        } else
            console.error('Browser FAILED to close')
    })
    return ret
}
runScraper("https://www.amazon.com/Skechers-Expected-Avillo-Relaxed-Fit-Loafer/dp/B00P6LHCAO/");
// runScraper("https://www.amazon.com/Gildan-Mens-T-Shirt-Assortment-X-Large/dp/B077ZJXCTS");
// runScraper("https://www.amazon.com/Simple-Joys-Carters-4-Pack-Stripes/dp/B08XWJJPFK/");
