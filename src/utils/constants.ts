// Default values for various constants used in the bot.
export const DEFAULT_GM_COUNT = 0;

// Time-to-Live (TTL) for cache entries in seconds.
// Entries will be automatically removed after this duration unless refreshed.
export const CACHE_TTL = 3600; // 1 hour

// Interval (in seconds) for checking and cleaning up expired cache entries.
// The cache will periodically scan for expired entries and remove them.
export const CACHE_CHECK_PERIOD = 300; // 5 minutes

// Interval (in milliseconds) for saving the cache to a file.
// This determines how frequently the cache is persisted to disk.
export const SAVE_INTERVAL = 60000 * 15; // 15 minute

export const TEMP_CACHE_FILE_NAME = "tempCacheData.json";
export const PERSISTENT_DATA_FILE_NAME = "persistentData.json";
