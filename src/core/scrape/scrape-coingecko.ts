import { createBrowser } from "@/module/browser";
import { executeWrite } from "@/utils/io";
import * as cheerio from "cheerio";

export const startScrape = async () => {
  const { browser, page } = await createBrowser();

  try {
    console.log("browser", browser);

    await page.goto("<url>", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const content = await page.content();

    const $ = cheerio.load(content);

    const tokenList = $(
      `body > div:nth-child(5) > main > div > div:nth-child(5) > div:nth-child(1) > div.tw-overflow-x-auto.\\32 lg\\:tw-overflow-x-visible.\\32 lg\\:tw-flex.\\32 lg\\:tw-justify-center > table > tbody`
    );

    const values = tokenList.children().children().children();

    type ResultType = {
      name: string;
      symbol: string;
      url: string;
    };

    const result: ResultType[] = [];
    values.each((index, value) => {
      const meta = $(value).children().text().trim().split("\n");
      const url = $(value).attr("href");

      console.log(index, "url", url);
      const metaValue = meta.map((m) => {
        if (m !== undefined && m.trim() !== "") {
          return m.trim();
        }
      });

      if (metaValue.length >= 2) {
        const filteredValue = metaValue.filter((mValue) => {
          if (mValue !== undefined) {
            return mValue;
          }
        });

        if (
          filteredValue.length > 0 &&
          filteredValue[0] !== undefined &&
          filteredValue[1] !== undefined &&
          url !== undefined
        ) {
          result.push({
            name: filteredValue[0],
            symbol: filteredValue[1],
            url,
          });
        }
      }
    });

    console.log("result", result);

    executeWrite("output.json", JSON.stringify(result));
  } catch (err) {
    console.error("Failed to scrape", err);
  }
};
