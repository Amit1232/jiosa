export interface DownloadLink {
  quality: string
  url: string
}

export interface SongArtistMap {
  id: string
  name: string
  role: string
  image: string
  type: string
  perma_url: string
}

export interface ArtistMapResponse {
  id: string
  name: string
  role: string
  type: string
  image: string
  url: string
}

export interface SongAPIResponse {
  id: string
  title: string
  subtitle: string
  header_desc: string
  type: string
  perma_url: string
  image: string
  language: string
  year: string
  play_count: string
  explicit_content: string
  list_count: string
  list_type: string
  list: string
  more_info: {
    music: string
    album_id: string
    album: string
    label: string
    origin: string
    is_dolby_content: boolean
    '320kbps': string
    encrypted_media_url: string
    encrypted_cache_url: string
    album_url: string
    duration: string
    rights: {
      code: string
      cacheable: string
      delete_cached_object: string
      reason: string
    }
    cache_state: string
    has_lyrics: string
    lyrics_snippet: string
    starred: string
    copyright_text: string
    artistMap: {
      primary_artists: SongArtistMap[]
      featured_artists: SongArtistMap[]
      artists: SongArtistMap[]
    }
    release_date: string
    label_url: string
    vcode: string
    vlink: string
    triller_available: boolean
    request_jiotune_flag: boolean
    webp: string
    lyrics_id: string
  }
}

export interface SongResponse {
  id: string
  name: string
  type: string
  year: string
  releaseDate: string
  duration: string
  label: string
  explicitContent: string
  playCount: string
  language: string
  hasLyrics: string
  lyricsId: string
  url: string
  copyright: string
  album: {
    id: string
    name: string
    url: string
  }
  artists: {
    primary: ArtistMapResponse[]
    featured: ArtistMapResponse[]
    all: ArtistMapResponse[]
  }
  image: DownloadLink[]
  downloadUrl: DownloadLink[]
}
