import { HTTPException } from 'hono/http-exception'
import { SongService } from '@modules/songs/services'
import type { Context } from 'hono'

export class SongController {
  private songsService: SongService

  constructor() {
    this.songsService = new SongService()
  }

  public songDetails = async (ctx: Context) => {
    try {
      const { id, link } = ctx.req.query()

      let result = []

      if (id) {
        result = await this.songsService.getSongById(id)
      } else if (link) {
        result = await this.songsService.getSongByLink(link)
      }

      return ctx.json({ status: globalConstants.status.success, message: null, data: result })
    } catch (error) {
      throw new HTTPException(400, { message: error as string })
    }
  }
}
