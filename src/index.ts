import { checkForUpdates } from "./tasks/checkForUpdates";
import { Request, Response } from "express";

export const yeeeesh = async (req: Request, res: Response) => {
  try {
    const tweets = await checkForUpdates();
    res.send(tweets);
  } catch (e: unknown) {
    res.send(e);
  }
};
