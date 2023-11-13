import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const songsSchema = zValidator(
  'query',
  z
    .object({
      id: z.string().optional(),
      link: z
        .string()
        .refine((value) => value.includes(`jiosaavn.com/song/`), {
          message: 'invalid song link',
          path: ['link'],
        })
        .transform((value) => {
          if (value.includes(`jiosaavn.com/song/`)) {
            const token = value.split(`/song/`)[1]?.split('/')[1]?.slice(0, 11)
            return token
          }
          return value
        })
        .optional(),
    })
    .refine((data) => !(data.id && data.link), {
      message: 'id and link are not supported together, pass only one of them',
      path: [],
    })
)
