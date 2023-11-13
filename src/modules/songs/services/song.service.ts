import { GetSongByIdUseCase } from '@modules/songs/use-cases/get-song-by-id/get-song-by-id.use-case'
import { GetSongByLinkUseCase } from '@modules/songs/use-cases/get-song-by-link'

export class SongService {
  private readonly getSongByIdUseCase: GetSongByIdUseCase
  private readonly getSongByLinkUseCase: GetSongByLinkUseCase

  constructor() {
    this.getSongByIdUseCase = new GetSongByIdUseCase()
    this.getSongByLinkUseCase = new GetSongByLinkUseCase()
  }

  getSongByIds = async (songIds: string) => {
    return this.getSongByIdUseCase.execute(songIds)
  }

  getSongByLink = async (songLink: string) => {
    return this.getSongByLinkUseCase.execute(songLink)
  }
}
