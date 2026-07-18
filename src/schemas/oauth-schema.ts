import { z } from 'zod'

export const BasicInfoResponseSchema = z.object({
  status: z.number(),
  msg: z.string(),
})

export const GrantResponseSchema = z.object({
  status: z.number(),
  msg: z.string(),
  data: z.object({
    code: z.string(),
  }).optional(),
})

export const CredentialResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    cred: z.string(),
    token: z.string(),
    userId: z.number(),
  }).optional(),
})

export type CredentialResponse = z.infer<typeof CredentialResponseSchema>
