import { getTimezone } from "@/utils/time";
import { createLogger } from "@/config/log-config";

export const logger = createLogger("memetus-module");

const main = () => {
  console.log(getTimezone());
};

main();
