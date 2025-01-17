import { executeReadAsync, executeWrite } from "@/utils/io";
import categories from "data/politics.json";

export const filterCoinData = async (file: string) => {
  const coins = JSON.parse(file);

  const uniqueArray = Array.from(
    new Map(coins.map((item: any) => [item.address, item])).values()
  );

  executeWrite(`${file}-output.json`, JSON.stringify(uniqueArray));
};

export const fillCoinData = async (file1: string, file2: string) => {
  const coins = JSON.parse(file1);
  const dests = JSON.parse(file2);

  const shouldFill = coins.filter((sol: any) => {
    return !dests.some((coin: any) => coin.url === sol.url);
  });

  executeWrite(`${file1}-output.json`, JSON.stringify(shouldFill));
};

export const addCoinCategory = async (file1: string, file2: string) => {
  const coins = await executeReadAsync(file1);
  const category = await executeReadAsync(file2);

  const value = JSON.parse(coins).map((coin: any) => {
    const category = categories.find(
      (ai) => ai.name === coin.name && ai.symbol === coin.symbol
    );
    return {
      ...coin,
      category: category ? [...coin.category, "politics"] : [...coin.category],
    };
  });

  executeWrite(`${file1}-output.json`, JSON.stringify(value));
};

export const addAnimal = async (file: string) => {
  const coins = await executeReadAsync(file);

  const value = JSON.parse(coins).map((coin: any) => {
    if (coin.category.join(" ").includes("animal")) {
      return {
        ...coin,
        category: [...coin.category, "animal"],
      };
    } else {
      return {
        ...coin,
        category: [...coin.category],
      };
    }
  });

  executeWrite(`${file}-output.json`, JSON.stringify(value));
};

export const filterCategory = async (file: string) => {
  const coins = await executeReadAsync(file);
  const value = JSON.parse(coins).map((coin: any) => {
    return {
      ...coin,
      category: coin.category.filter((c: any) => {
        return (
          !c.includes("solana") &&
          !c.includes("binance") &&
          !c.includes("aptos") &&
          !c.includes("arbitrum") &&
          !c.includes("ethereum") &&
          !c.includes("shibarium") &&
          !c.includes("base") &&
          !c.includes("sui") &&
          !c.includes("polygon") &&
          !c.includes("bnb-chain") &&
          !c.includes("avalanche") &&
          !c.includes("neon-ecosystem") &&
          !c.includes("airdropped-tokens")
        );
      }),
    };
  });

  executeWrite(`${file}-output.json`, JSON.stringify(value));
};

export const filterCategory2 = async (file: string) => {
  const coins = await executeReadAsync(file);

  const value = JSON.parse(coins).map((coin: any) => {
    return {
      ...coin,
      category: coin.category.filter((c: any) => {
        if (c.includes("gaming")) {
          return {
            ...coin,
            category: [...coin.category, "gaming"],
          };
        }
        if (
          c.includes("animal") ||
          c.includes("dog") ||
          c.includes("cat") ||
          c.includes("duck") ||
          c.includes("frog") ||
          c.includes("zoo")
        ) {
          return {
            ...coin,
            category: [...coin.category, "animal-themed"],
          };
        }
        if (c.includes("pump.fun-ecosystem")) {
          return {
            ...coin,
            category: [...coin.category, "pumpfun"],
          };
        }
        return {
          ...coin,
          category: [...coin.category],
        };
      }),
    };
  });

  executeWrite(`${file}-output.json`, JSON.stringify(value));
};
