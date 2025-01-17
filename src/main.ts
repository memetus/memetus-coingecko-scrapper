import { createLogger } from "@/config/log-config";
import { startScrape } from "@/core/scrape/scrape-coingecko";

export const logger = createLogger("memetus-module");

const main = async () => {
  startScrape();
};

main();
