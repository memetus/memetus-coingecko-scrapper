import { ValidEnvType } from "@/types/env";

export const getEnv = (key: ValidEnvType, defaultValue?: string): string => {
  const value = process.env[key as string];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key as string}`);
  }
  return value || defaultValue!;
};
