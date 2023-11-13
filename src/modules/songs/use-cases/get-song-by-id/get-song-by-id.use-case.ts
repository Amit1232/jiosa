import { useFetch } from '@common/helpers'
import { Endpoints } from '@common/constants'
import { createSongPayload } from '@modules/songs/helpers'
import { HTTPException } from 'hono/http-exception'
import type { SongAPIResponse, SongResponse } from '@modules/songs/types'
import type { IUseCase } from '@common/types'

export class GetSongByIdUseCase implements IUseCase<String, SongResponse[]> {
  constructor() {}

  async execute(songIds: string) {
    const response = await useFetch<{ songs: SongAPIResponse[] }>(Endpoints.songs.id, { pids: songIds })

    if (!response.songs || response?.songs?.length === 0) throw new HTTPException(400, { message: 'song not found' })

    const songResults = response.songs.map((song) => createSongPayload(song))

    return songResults
  }
}
