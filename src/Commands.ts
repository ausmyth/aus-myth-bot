import { Command } from "./Command";
import { Hello } from "./commands/Hello";
import { TalalCheck } from "./commands/TalalCheck";
import { DiceRoll } from "./commands/DiceRoll";

export const Commands: Command[] = [Hello, TalalCheck, DiceRoll];
