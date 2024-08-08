import { Message } from "discord.js";
import { cache } from "../utils/cacheManager";
import { DEFAULT_GM_COUNT } from "../utils/constants";

export async function handleGmCounter(message: Message) {
  const gmRegex = /\bgm\b/i;
  if (gmRegex.test(message.content)) {
    // Get the current count or initialize it to 0 if it doesn't exist
    let currentCount = cache.get<number>("gmCount");

    if (currentCount === undefined) {
      console.log("Defaulting gmCount to 0");
      currentCount = DEFAULT_GM_COUNT;
      cache.set("gmCount", currentCount);
    }

    // Update the count
    cache.set("gmCount", currentCount + 1);
  }
}
