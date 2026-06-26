import { config } from "@/lib/config";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: config.env.upsatsh.redisRestUrl,
  token: config.env.upsatsh.redisRestToken,
});