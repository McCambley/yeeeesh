import fetch from "node-fetch";
import dotenv from "dotenv";
import { SongArray, ArtistArray } from "./types";
dotenv.config();

// Spotify
const spotifyUrl = "https://api.spotify.com/v1";
const playlistId = "6SeniaKv8gLd9XDKASj2Oi";
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getAccessToken = async () => {
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

export const getPlaylistData = async (
  accessToken: string
): Promise<SongArray | { message: string }> => {
  let items: SongArray = [];
  const fetchData = async (offset: number): Promise<SongArray> => {
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
    items = [...items, ...data.items];
    return data.items.length === data.limit
      ? fetchData(data.offset + data.items.length)
      : items;
  };
  try {
    const data = await fetchData(0);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return {
      message: "There was a problem with the server. Please try again.",
    };
  }
};

export const getArtists = (artists: ArtistArray) => {
  if (artists.length === 1) {
    return artists[0].name;
  }
  if (artists.length === 2) {
    return `${artists[0].name} & ${artists[1].name}`;
  }
  if (artists.length > 2) {
    const last = artists.pop()!;
    return `${artists.map((artist) => artist.name).join(", ")}, and ${
      last.name
    }`;
  }
  return "Unknown";
};
