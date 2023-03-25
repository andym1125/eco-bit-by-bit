import puppeteer, {Browser} from 'puppeteer'

async function runScraper(url : string) {
    const browserPromise = puppeteer.launch()
    let browser : Browser

    browserPromise.then(async (result) => {
        browser = result
        const page = await browser.newPage()
        await page.goto(url)

        console.log((await page.$eval('#productTitle', (el) => el.innerHTML)).trim())
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