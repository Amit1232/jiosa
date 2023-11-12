import { HTTPException } from 'hono/http-exception'
import { SearchService } from '@modules/search/services'
import type { Context } from 'hono'

export class SearchController {
  private searchService: SearchService

  constructor() {
    this.searchService = new SearchService()
  }

  public searchAll = async (ctx: Context) => {
    try {
      const { query } = ctx.req.query()

      const result = await this.searchService.searchAll(query)

      return ctx.json({ status: 'success', message: null, data: result })
    } catch (error) {
      throw new HTTPException(400, { message: error as string })
    }
  }
}
