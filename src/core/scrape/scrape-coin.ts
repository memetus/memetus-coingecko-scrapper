import { createBrowser } from "@/module/browser";
import { getAllCoins } from "@/module/data";
import { executeRead, executeReadAsync, executeWrite } from "@/utils/io";
import { sleep } from "@/utils/sleep";
import * as cheerio from "cheerio";

export const setCoinData = async () => {
  const { browser, page } = await createBrowser();

  type CoinType = {
    name: string;
    symbol: string;
    url: string;
  };

  const coins: CoinType[] = getAllCoins();

  type CoinTypeWithAddress = {
    name: string;
    symbol: string;
    address: string | undefined;
    url: string;
  };
  const values: CoinTypeWithAddress[] = [];

  try {
    console.log("coins", coins);
    for (const coin of coins) {
      await page.goto(`https://www.coingecko.com${coin.url}`);

      const content = await page.content();
      const $ = cheerio.load(content);

      const addressElement = $(
        `#gecko-coin-page-container > div.\\32 lg\\:tw-row-span-2.\\32 lg\\:tw-pr-6.\\32 lg\\:tw-border-r.tw-border-gray-200.dark\\:tw-border-moon-700.tw-flex.tw-flex-col > div.tw-relative.\\32 lg\\:tw-mb-6.tw-grid.tw-grid-cols-1.tw-divide-y.tw-divide-gray-200.dark\\:tw-divide-moon-700.\\[\\&\\>\\*\\:last-child\\]\\:\\!tw-border-b > div:nth-child(1) > div.tw-pl-2.tw-text-right.tw-text-gray-900.dark\\:tw-text-moon-50.tw-font-semibold.tw-text-sm.tw-leading-5 > div > span > button.tw-pointer-events-none.\\!tw-py-1.hover\\:\\!tw-bg-gray-200.hover\\:dark\\:\\!tw-bg-moon-700.\\!tw-border-r-2.tw-border-gray-300.dark\\:tw-border-moon-600.tw-rounded-r-none.tw-bg-gray-200.dark\\:tw-bg-moon-700.hover\\:tw-bg-gray-300.dark\\:hover\\:tw-bg-moon-600.tw-items-center.tw-justify-center.tw-font-semibold.tw-text-inline.tw-rounded-lg.tw-select-none.focus\\:tw-outline-none.tw-px-2\\.5.tw-py-1\\.5.tw-inline-flex > div > tag > div > div > span`
      );

      const addressElement2 = $(
        `#gecko-coin-page-container > div.\\32 lg\\:tw-row-span-2.\\32 lg\\:tw-pr-6.\\32 lg\\:tw-border-r.tw-border-gray-200.dark\\:tw-border-moon-700.tw-flex.tw-flex-col > div.tw-relative.\\32 lg\\:tw-mb-6.tw-grid.tw-grid-cols-1.tw-divide-y.tw-divide-gray-200.dark\\:tw-divide-moon-700.\\[\\&\\>\\*\\:last-child\\]\\:\\!tw-border-b > div:nth-child(1) > div.tw-pl-2.tw-text-right.tw-text-gray-900.dark\\:tw-text-moon-50.tw-font-semibold.tw-text-sm.tw-leading-5 > div > span > button > div > tag > div > div > span`
      );

      console.log("addressElement", addressElement.attr("data-content"));
      console.log("addressElement2", addressElement2.attr("data-content"));

      console.log(`${coin.symbol} url: https://www.coingecko.com${coin.url}`);
      sleep(5000);

      values.push({
        name: coin.name,
        symbol: coin.symbol,
        address:
          addressElement.attr("data-content") ||
          addressElement2.attr("data-content"),
        url: coin.url,
      });
    }

    console.log("values", values);

    const legacy = await executeReadAsync("output.json");

    if (!legacy) {
      executeWrite("output.json", JSON.stringify([...values]));
    } else {
      const legacyValues = JSON.parse(legacy);
      executeWrite("output.json", JSON.stringify([...legacyValues, ...values]));
    }
  } catch (err) {
    console.log("error", err);
  }
};
