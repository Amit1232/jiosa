import { HTTPException } from 'hono/http-exception'
import { SongService } from '@modules/songs/services'
import type { SongResponse } from '@modules/songs/types'
import type { Context } from 'hono'

export class SongController {
  private songsService: SongService

  constructor() {
    this.songsService = new SongService()
  }

  public getSong = async (ctx: Context) => {
    try {
      const { id, link } = ctx.req.valid('query' as never)

      let result: SongResponse[] = []

      if (id) {
        result = await this.songsService.getSongByIds(id)
      } else if (link) {
        result = await this.songsService.getSongByLink(link)
      }

      return ctx.json({ success: true, message: null, data: result })
    } catch (error) {
      throw new HTTPException(400, { message: error as string })
    }
  }
}
