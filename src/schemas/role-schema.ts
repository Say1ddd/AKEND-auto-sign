import { z } from 'zod'

const RoleSchema = z.object({
  roleId: z.string(),
  serverId: z.string(),
})

const BindingSchema = z.object({
  defaultRole: RoleSchema.nullish(),
  roles: z.array(RoleSchema).optional(),
})

const AppBindingSchema = z.object({
  appCode: z.string(),
  bindingList: z.array(BindingSchema).optional(),
})

export const PlayerBindingResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    list: z.array(AppBindingSchema),
  }).optional(),
})
