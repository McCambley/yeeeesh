import express, { Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

const spotifyUrl = "https://api.spotify.com/v1";
const playlistId = "6SeniaKv8gLd9XDKASj2Oi";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getAccessToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = await response.json();
    return access_token;
  } catch (error) {
    return { error };
  }
};

const getPlaylistData = async (accessToken: string) => {
  let items: Array<any> = [];
  const fetchData = async (offset: number): Promise<any> => {
    console.count("Fetching!");
    const response = await fetch(
      `${spotifyUrl}/playlists/${playlistId}/tracks?limit=100&offset=${offset}&fields=total,limit,offset,items(added_at,track(name,external_urls(spotify),artists(name)))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    items.push(data.items);
    return data.items.length === data.limit
      ? fetchData(data.offset + data.items.length)
      : items;
  };
  try {
    const data = await fetchData(0);
    return data;
  } catch (error) {
    return { error };
  }
};

app.get("/", async (req: Request, res: Response) => {
  try {
    const accessToken = await getAccessToken();
    const data = await getPlaylistData(accessToken);
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

app.listen(port, () => {
  // cron.schedule("* * * * *", () => console.log("Soooon!"));
  console.log("Welcome back to ✨ Express ✨ my friend");
});
