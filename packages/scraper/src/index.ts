import puppeteer, {Browser, Page} from 'puppeteer'

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


async function scrapeAmazon(url : string, browser : Browser) {
    const page = await browser.newPage()
    await page.goto(url)

    const title = (await page.$eval('#productTitle', (el) => el.innerHTML)).trim()

    const reviewQuery = '#reviewsMedley > div > .a-col-left > span.cr-widget-TitleRatingsHistogram > span > .AverageCustomerReviews > div > div.a-col-right > div > span > span'
    const reviewText = await page.$eval(reviewQuery, (el) => el.innerText)
    const reviewNum = parseFloat(reviewText.match(/\d+\.\d+/g)[0])


    console.log(`title: ${title}`)
    console.log(`review: ${reviewNum}`)
}

async function scrapeMsci(browser: Browser) {
    const page = await browser.newPage()
    await page.goto(MSCI_URL)

    // Search for company
    await page.waitForSelector('#_esgratingsprofile_keywords')
    await page.type('#_esgratingsprofile_keywords', 'Walmart', {'delay': 250}) // TODO: Replace with maufacturer
    await sleep(2000)
    const noresult = await checkEval (
        page.$eval('#_esgratingsprofile_noResultMessageWrapper', (el: HTMLDivElement) => el.style.display),
        0
    )
    // await page.$eval('#_esgratingsprofile_noResultMessageWrapper', (el: HTMLDivElement) => el.style.display)
    if(noresult !== 'none')
        console.log('noresult')
    await page.click('#ui-id-1 > li')
    await sleep(750)

    // Begin retrieving data
    console.log("Retrieving " + await page.$eval('#_esgratingsprofile_esg-ratings-profile-container > .esg-ratings-profile-header-coredata > .header-company-title', (el: HTMLHeadingElement) => el.innerText))
    await page.click('#esg-transparency-toggle-link')
    const rating = await page.$eval('#_esgratingsprofile_esg-ratings-profile-header > div > div.ratingdata-container > div.ratingdata-outercircle > div.ratingdata-company-rating',
        (el : HTMLDivElement) => {
            for(const className of el.classList)
            {
                const result = /esg-rating-circle-(\w+)/.exec(className)
                if(result !== null)
                {
                    return result[1]
                }
            }
            return null
        })
    console.log(rating)

}

function runScraper(url : string) {
    const browserPromise = puppeteer.launch({headless:false})
    let browser : Browser

    browserPromise.then(async (result) => {
        browser = result
        // await scrapeAmazon(url, browser)
        await scrapeMsci(browser)

        // for(let i = 0; i < 100; i++)
        // {
        //     console.log(`----${i}----`)
        //     await scrapeMsci(browser)
        // }

    }).catch((e) => {
        console.error(e)
    }).finally(async () => {
        if(browser) {
            await browser.close()
            console.log('Browser successfully closed')
        } else
            console.error('Browser FAILED to close')
    })
}
runScraper("https://www.amazon.com/Skechers-Expected-Avillo-Relaxed-Fit-Loafer/dp/B00P6LHCAO/");
// runScraper("https://www.amazon.com/Gildan-Mens-T-Shirt-Assortment-X-Large/dp/B077ZJXCTS");
// runScraper("https://www.amazon.com/Simple-Joys-Carters-4-Pack-Stripes/dp/B08XWJJPFK/");
