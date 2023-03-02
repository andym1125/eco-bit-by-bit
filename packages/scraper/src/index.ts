import puppeteer from 'puppeteer'

async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.amazon.com/Skechers-Expected-Avillo-Relaxed-Fit-Loafer/dp/B00P6LHCAO/")

    console.log(await page.$eval('#title', (el) => el.innerHTML))

    await browser.close()
}
start()