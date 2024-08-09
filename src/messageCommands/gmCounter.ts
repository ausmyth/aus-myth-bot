import { Message } from "discord.js";
import {
  persistentStore,
  savePersistentStoreToFile,
} from "../managers/PersistentStoreManager";
import { DEFAULT_GM_COUNT } from "../utils/constants";

const trigger = /gm/i;

export default {
  name: "Gm Counter",
  trigger,
  run: async (message: Message): Promise<void> => {
    if (trigger.test(message.content)) {
      // Use the persistent store for counting "gm"
      let currentCount = persistentStore["gmCount"] ?? DEFAULT_GM_COUNT;
      persistentStore["gmCount"] = currentCount + 1;

      // Optional: Save the store immediately if needed
      // savePersist  entStoreToFile();
    }
  },
};
