import { Hono } from 'hono'
import { SongController } from '@modules/songs/controllers/song.controller'
import { songsSchema } from '@modules/songs/helpers'
import type { Routes } from '@common/types'

export class SongRoute implements Routes {
  public router: Hono
  public songController = new SongController()
  public path = '/songs'

  constructor() {
    this.router = new Hono()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, songsSchema, (c) => this.songController.getSong(c))
  }
}
