import { cipher, util } from 'node-forge'
import type {
  ArtistMapResponse,
  DownloadLink,
  SongAPIResponse,
  SongArtistMap,
  SongResponse,
} from '@modules/songs/types'

const createArtistMap = (artist: SongArtistMap): ArtistMapResponse => {
  return {
    id: artist?.id,
    name: artist?.name,
    role: artist?.role,
    image: artist?.image,
    type: artist?.type,
    url: artist?.perma_url,
  } as ArtistMapResponse
}

export const createSongPayload = (song: SongAPIResponse): SongResponse => {
  return {
    id: song?.id,
    name: song?.title,
    type: song?.type,
    year: song?.year,
    releaseDate: song?.more_info?.release_date,
    duration: song?.more_info?.duration,
    label: song?.more_info?.label,
    explicitContent: song?.explicit_content,
    playCount: song?.play_count,
    language: song?.language,
    hasLyrics: song?.more_info?.has_lyrics,
    lyricsId: song?.more_info?.lyrics_id,
    url: song?.perma_url,
    copyright: song?.more_info?.copyright_text,
    album: {
      id: song?.more_info?.album_id,
      name: song?.more_info?.album,
      url: song?.more_info?.album_url,
    },
    artists: {
      primary: song?.more_info?.artistMap?.primary_artists?.map((artist) => createArtistMap(artist)),
      featured: song?.more_info?.artistMap?.featured_artists?.map((artist) => createArtistMap(artist)),
      all: song?.more_info?.artistMap?.artists?.map((artist) => createArtistMap(artist)),
    },
    image: createImageLinks(song?.image),
    downloadUrl: createDownloadLinks(song?.more_info?.encrypted_media_url),
  }
}

export const createDownloadLinks = (encryptedMediaUrl: string): DownloadLink[] => {
  if (!encryptedMediaUrl) return []

  const qualities = [
    { id: '_12', bitrate: '12kbps' },
    { id: '_48', bitrate: '48kbps' },
    { id: '_96', bitrate: '96kbps' },
    { id: '_160', bitrate: '160kbps' },
    { id: '_320', bitrate: '320kbps' },
  ]

  const key = '38346591'
  const iv = '00000000'

  const encrypted = util.decode64(encryptedMediaUrl)
  const decipher = cipher.createDecipher('DES-ECB', util.createBuffer(key, 'utf8'))

  decipher.start({ iv: util.createBuffer(iv, 'utf8') })
  decipher.update(util.createBuffer(encrypted))
  decipher.finish()

  const decryptedLink = decipher.output.getBytes()

  const links = qualities.map((quality) => ({
    quality: quality.bitrate,
    url: decryptedLink.replace('_96', quality.id),
  }))

  return links
}

export const createImageLinks = (link?: string) => {
  if (!link) return []

  const qualities = ['50x50', '150x150', '500x500']

  return (
    qualities.map((quality) => ({
      quality,
      url: link.includes('150x150') ? link.replace('150x150', quality) : link.replace('50x50', quality),
    })) || []
  )
}
