import nodeCron from "node-cron";
import { Crons } from "../types/types";
import { checkForUpdates } from "./checkForUpdates";
import { logStatus } from "./logStatus";
import { checkFile } from "./checkFile";

const crons: Crons = [
  { cron: "0 * * * *", task: checkForUpdates },
  { cron: "* * * * *", task: logStatus },
  // { cron: "* * * * *", task: checkFile },
];

const setCrons = (): void => {
  for (const job of crons) {
    const { cron, task } = job;
    nodeCron.schedule(cron, task);
    console.log(`Setting up job ${task.name} at interval '${cron}'`);
  }
};

export default setCrons;
