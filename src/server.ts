import { SearchRoute } from '@modules/search/routes'
import { serve } from '@hono/node-server'
import { App } from './app'
require('module-alias/register')

const app = new App([new SearchRoute()])

serve({
  fetch: app.getApp().fetch,
  port: 3000,
})
