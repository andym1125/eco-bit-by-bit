import puppeteer from 'puppeteer'

async function scrape(url : string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.amazon.com/Skechers-Expected-Avillo-Relaxed-Fit-Loafer/dp/B00P6LHCAO/")

    console.log((await page.$eval('#productTitle', (el) => el.innerHTML)).trim())

    await browser.close()
}
scrape("https://www.amazon.com/Skechers-Expected-Avillo-Relaxed-Fit-Loafer/dp/B00P6LHCAO/");