import express, { Request, Response } from "express";
import { getPlaylistData, getAccessToken, getArtists } from "./spotifyClient";
import twitterClient from "./twitterClient";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken();
    let data = await getPlaylistData(accessToken);
    if (data instanceof Array) {
      for (const song of data) {
        const tweetContent = `${getArtists(song.track.artists)} — ${
          song.track.name
        }\n${song.track.external_urls.spotify}`;

        console.log(tweetContent);
        const tweet = await twitterClient.v2.tweet(tweetContent);
        console.log(tweet);
        await new Promise((resolve) => {
          setTimeout(resolve, 4800);
        });
      }
    }
    res.send(data);
  } catch (error) {
    res.send({ error });
  }
});

app.get("/tweet", async (req: Request, res: Response) => {
  try {
    const data = await twitterClient.v2.tweet("Yeeeesh...");
    res.send(data);
  } catch (error: any) {
    res.send(error);
  }
});

app.listen(port, () => {
  // cron.schedule("* * * * *", () => console.log("Soooon!"));
  console.log("Welcome back to ✨ Express ✨ my friend");
});
