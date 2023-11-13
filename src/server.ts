import { SearchRoute } from '@modules/search/routes'
import { serve } from '@hono/node-server'
import { SongRoute } from '@modules/songs/routes'
import { App } from './app'
require('module-alias/register')

const app = new App([new SearchRoute(), new SongRoute()])

serve({
  fetch: app.getApp().fetch,
  port: 3000,
})
