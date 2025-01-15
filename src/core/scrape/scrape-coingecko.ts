import { createBrowser } from "@/module/browser";
import cheerio from "cheerio";

export const startScrape = async () => {
  const { browser, page } = await createBrowser();

  try {
    console.log("browser", browser);

    await page.goto(
      "https://www.coingecko.com/en/categories/anime-themed-coins",
      { waitUntil: "networkidle2" }
    );

    const nameXPath =
      "/html/body/div[3]/main/div/div[5]/div[1]/div[3]/table/tbody/tr[1]/td[3]/a/div/div/text()";
    const symbolXPath =
      "/html/body/div[3]/main/div/div[5]/div[1]/div[3]/table/tbody/tr[1]/td[3]/a/div/div/div";

    const content = await page.content();

    const $ = cheerio.load(content);

    const list = $(
      `.body > div:nth-child(5) > main > div > div:nth-child(5) > div:nth-child(1) > div.tw-overflow-x-auto.\\32 lg\\:tw-overflow-x-visible.\\32 lg\\:tw-flex.\\32 lg\\:tw-justify-center > table > tbody > tr:nth-child(1) > td.tw-sticky.\\32 lg\\:tw-static.tw-left-\\[62px\\].md\\:tw-left-\\[72px\\].tw-px-1.tw-py-2\\.5.\\32 lg\\:tw-p-2\\.5.tw-bg-inherit.tw-text-gray-900.dark\\:tw-text-moon-50 > a > div > div`
    );

    console.log("list", list);
  } catch (err) {
    console.error("Failed to scrape", err);
  }
};
