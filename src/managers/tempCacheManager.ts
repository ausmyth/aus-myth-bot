import NodeCache from "node-cache";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import {
  CACHE_TTL,
  CACHE_CHECK_PERIOD,
  SAVE_INTERVAL,
  TEMP_CACHE_FILE_NAME,
} from "src/utils/constants";

/* This cache manager is for temporary memory use. It has an hour long TTL. */
/* For persistent storage, use persistentStoreManager.ts */

// Use an environment variable for the data directory
// todo: implement this env var in the dockerfile
const dataDir = process.env.DATA_DIR || path.join(__dirname, "../../data");
const dataFilePath = path.join(dataDir, TEMP_CACHE_FILE_NAME);

const tempCache = new NodeCache({
  stdTTL: CACHE_TTL,
  checkperiod: CACHE_CHECK_PERIOD,
});
let isSaving = false;

function initializeTempCache() {
  try {
    if (existsSync(dataFilePath)) {
      const data = JSON.parse(readFileSync(dataFilePath, "utf8"));
      for (const key in data) {
        tempCache.set(key, data[key]);
      }
      console.log("Cache initialized from file:", dataFilePath);
    } else {
      console.log(
        "No existing cache file found. Starting with an empty cache."
      );
    }
  } catch (error) {
    console.error("Error initializing cache:", error);
  }
}

async function saveTempCacheToFile() {
  if (isSaving) return;
  isSaving = true;
  try {
    const data = tempCache.keys().reduce((acc, key) => {
      acc[key] = tempCache.get(key);
      return acc;
    }, {} as Record<string, any>);
    writeFileSync(dataFilePath, JSON.stringify(data), "utf8");
    console.log("Cache saved to file:", dataFilePath);
  } catch (error) {
    console.error("Error saving cache to file:", error);
  } finally {
    isSaving = false;
  }
}

initializeTempCache();
setInterval(saveTempCacheToFile, SAVE_INTERVAL);

// Save cache on process exit
process.on("SIGINT", () => {
  saveTempCacheToFile();
  process.exit(0);
});

export { tempCache, saveTempCacheToFile };
