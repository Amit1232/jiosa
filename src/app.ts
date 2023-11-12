import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { compress } from 'hono/compress'
import { prettyJSON } from 'hono/pretty-json'
import type { Routes } from '@common/types'

export class App {
  private app: Hono

  constructor(routes: Routes[]) {
    this.app = new Hono()

    this.initializeGlobalMiddlewares()
    this.initializeRoutes(routes)
    this.initializeRouteFallback()
    this.initializeErrorHandler()
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.route('/api', route.router)
    })
  }

  private initializeGlobalMiddlewares() {
    this.app.use('*', cors())
    this.app.use('*', logger())
    this.app.use('*', compress())
    this.app.use('*', prettyJSON())
  }

  private initializeRouteFallback() {
    this.app.notFound((ctx) => {
      return ctx.json({ success: false, message: 'route not found, check docs at https://docs.saavn.me' }, 404)
    })
  }

  private initializeErrorHandler() {
    this.app.onError((err, ctx) => {
      console.error(err)

      return ctx.json({ success: false, message: err.message }, 500)
    })
  }

  public getApp() {
    return this.app
  }
}
