import NodeCache from "node-cache";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

// Path to the file where the count and other data will be stored
const dataFilePath = path.join(__dirname, "../../data/cacheData.json");

// Create a cache with a default TTL (Time to Live) of 1 hour and a check interval of 5 minutes
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });

// todo: this isnt reading from the docker data file afaik, it resets to 0 on gmCount on restart...

// Ensure the file exists and load initial data
function initializeCache() {
  if (existsSync(dataFilePath)) {
    const data = JSON.parse(readFileSync(dataFilePath, "utf8"));
    for (const key in data) {
      cache.set(key, data[key]);
    }
  }
}

// Function to periodically save cache data to the file
function saveCacheToFile() {
  const data = cache.keys().reduce((acc, key) => {
    acc[key] = cache.get(key);
    return acc;
  }, {} as Record<string, any>);

  writeFileSync(dataFilePath, JSON.stringify(data), "utf8");
}

// Initialize cache and set up periodic save
initializeCache();
setInterval(saveCacheToFile, 3600000); // Save every hour

export { cache };
