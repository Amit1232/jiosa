import { SearchAllUseCase } from '@modules/search/use-cases'

export class SearchService {
  private readonly searchAllUseCase: SearchAllUseCase

  constructor() {
    this.searchAllUseCase = new SearchAllUseCase()
  }

  searchAll = async (query: string) => {
    return this.searchAllUseCase.execute(query)
  }

  searchSongs = async (query: string) => {
    return this.searchAllUseCase.execute(query)
  }

  searchAlbums = async (query: string) => {
    return this.searchAllUseCase.execute(query)
  }

  searchArtists = async (query: string) => {
    return this.searchAllUseCase.execute(query)
  }
}
