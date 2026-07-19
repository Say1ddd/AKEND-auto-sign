import { z } from 'zod'

export const AttendanceStatusSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    hasToday: z.boolean(),
  }),
})

export const AttendanceClaimSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    awardIds: z.array(z.object({
      id: z.number(),
    })),
    resourceInfoMap: z.record(
      z.string(),
      z.object({
        name: z.string(),
        count: z.number(),
        icon: z.string().optional(),
      }),
    ),
  }),
})
