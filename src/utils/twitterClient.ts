import Twitter from "twitter-api-v2";
// import Twitter from "twitter-lite";
import dotenv from "dotenv";
dotenv.config();

// Twitter
const consumer_key = process.env.TWITTER_API_KEY!;
const consumer_secret = process.env.TWITTER_API_KEY_SECRET!;
const access_token_key = process.env.TWITTER_ACCESS_TOKEN!;
const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET!;

const client = new Twitter({
  appKey: consumer_key,
  appSecret: consumer_secret,
  accessToken: access_token_key,
  accessSecret: access_token_secret,
});

const twitterClient = client.readWrite;

export default twitterClient;
