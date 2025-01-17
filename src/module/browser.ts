import { logger } from "@/main";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export const createBrowser = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    puppeteer.use(StealthPlugin());
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.setViewport({
      width: 1440,
      height: 1240,
    });

    await page.waitForSelector("body");

    return { browser, page };
  } catch (error) {
    logger.error("Failed to create browser", error);
    throw error;
  }
};
