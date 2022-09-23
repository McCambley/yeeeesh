type $TSFixMe = any;
type $TSFixMeFunction = (...args: any[]) => any;

interface Song {
  added_at: string;
  track: {
    artists: [{ name: string }];
    external_urls: {
      spotify: string;
    };
    name: string;
  };
}

interface Cron {
  cron: string;
  task: () => void | Promise<void>;
}

export type Crons = Array<Cron>;

export type SongArray = Array<Song>;
interface Artist {
  name: string;
}

export type ArtistArray = Array<Artist>;
