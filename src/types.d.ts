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

type SongArray = Array<Song>;
