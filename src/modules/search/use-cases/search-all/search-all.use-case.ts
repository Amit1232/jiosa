import { Endpoints } from '@common/constants'
import { useFetch } from '@common/helpers'
import type { SongResponse } from '@modules/songs/types'
import type { IUseCase } from '@common/types'

export class SearchAllUseCase implements IUseCase<String, SongResponse> {
  async execute(query: string): Promise<SongResponse> {
    const response = await useFetch(Endpoints.search.all, { query })

    return response.json() as Promise<SongResponse>
  }
}
