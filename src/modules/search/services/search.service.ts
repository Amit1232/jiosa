import { useFetch } from '@common/helpers'

export class SearchService {
  constructor() {}

  searchAll = async (query: string) => {
    const response = await useFetch('searchAll', { query, __call: 'autocomplete.get' })

    return response.json()
  }
}
