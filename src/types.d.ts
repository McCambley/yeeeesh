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

export type SongArray = Array<Song>;
interface Artist {
  name: string;
}

export type ArtistArray = Array<Artist>;
