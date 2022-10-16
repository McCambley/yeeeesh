import twitterClient from "../utils/twitterClient";
import { getPlaylistData, getAccessToken, getArtists } from "../utils/spotifyClient";
import { getTimeValues } from "../utils/time";

export const checkFile = async () => {
  const { ONE_HOUR_AGO, PAST_TIMESTAMP } = getTimeValues();
  let count = 0;
  let data;
  try {
    const accessToken = await getAccessToken();
    data = await getPlaylistData(accessToken);
  } catch (error) {
    console.error(error);
  }

  console.log(JSON.stringify({ data }, null, 2));
  // if (data instanceof Array) {
  //   for (const song of data) {
  //     const isNew = new Date(song.added_at).getTime() > ONE_HOUR_AGO;
  //     if (isNew) {
  //       const tweetContent = `${getArtists(song.track.artists)} — ${song.track.name}\n${song.track.external_urls.spotify}`;
  //       try {
  //         const tweet = await twitterClient.v2.tweet(tweetContent);
  //         console.log(tweet);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       count++;
  //     }
  //   }
  // }
  // console.log(`${count} songs added since ${PAST_TIMESTAMP}`);
};
