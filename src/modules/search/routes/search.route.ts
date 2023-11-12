import { Hono } from 'hono'
import { SearchController } from '@modules/search/controllers'
import type { Routes } from '@common/types'

export class SearchRoute implements Routes {
  public router: Hono
  public searchController = new SearchController()
  public path = '/search'

  constructor() {
    this.router = new Hono()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, this.searchController.searchAll)
  }
}
