import puppeteer, {Browser, Page} from 'puppeteer'

async function scrapePage(page : Page) {
    const title = (await page.$eval('#productTitle', (el) => el.innerHTML)).trim()

    const reviewQuery = '#reviewsMedley > div > .a-col-left > span.cr-widget-TitleRatingsHistogram > span > .AverageCustomerReviews > div > div.a-col-right > div > span > span'
    const reviewText = await page.$eval(reviewQuery, (el) => el.innerText)
    const reviewNum = parseFloat(reviewText.match(/\d+\.\d+/g)[0])


    console.log(`title: ${title}`)
    console.log(`review: ${reviewNum}`)

}

function runScraper(url : string) {
    const browserPromise = puppeteer.launch()
    let browser : Browser

    browserPromise.then(async (result) => {
        browser = result
        const page = await browser.newPage()
        await page.goto(url)
        await scrapePage(page)
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
runScraper("https://www.amazon.com/Gildan-Mens-T-Shirt-Assortment-X-Large/dp/B077ZJXCTS");
runScraper("https://www.amazon.com/Simple-Joys-Carters-4-Pack-Stripes/dp/B08XWJJPFK/");
