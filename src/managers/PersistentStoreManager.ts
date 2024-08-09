import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { SAVE_INTERVAL, PERSISTENT_DATA_FILE_NAME } from "../utils/constants";

// Environment variable for the data directory, similar to cache manager
const dataDir = process.env.DATA_DIR || path.join(__dirname, "../../data");
const dataFilePath = path.join(dataDir, PERSISTENT_DATA_FILE_NAME);

// Object to hold persistent in-memory data
const persistentStore: Record<string, any> = {};

// Initialize the persistent store by loading from file
function initializePersistentStore() {
  try {
    if (existsSync(dataFilePath)) {
      const data = JSON.parse(readFileSync(dataFilePath, "utf8"));
      Object.assign(persistentStore, data);
      console.log("Persistent store initialized from file:", dataFilePath);
    } else {
      console.log(
        "No existing persistent data file found. Starting with an empty store."
      );
    }
  } catch (error) {
    console.error("Error initializing persistent store:", error);
  }
}

// Save the current state of the persistent store to a file
function savePersistentStoreToFile() {
  try {
    writeFileSync(dataFilePath, JSON.stringify(persistentStore), "utf8");
    console.log("Persistent store saved to file:", dataFilePath);
  } catch (error) {
    console.error("Error saving persistent store to file:", error);
  }
}

// Initialize the store on startup
initializePersistentStore();
setInterval(savePersistentStoreToFile, SAVE_INTERVAL);

// Save store on process exit
const handleExit = () => {
  savePersistentStoreToFile();
  process.exit(0);
};

process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

export { persistentStore, savePersistentStoreToFile };
