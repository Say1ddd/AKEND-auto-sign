import type { z } from 'zod'
import { USER_AGENT } from '../constants.ts'
import { createApiSignature, createCredentialSignature } from './crypto/signer.ts'

// avoiding generic inference because owner of zod states that the bug is unfixable
// https://github.com/colinhacks/zod/issues/4877#issuecomment-3100124769
export async function fetchValidJson<TSchema extends z.ZodType>(
  schema: TSchema,
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<z.infer<TSchema>> {
  const response = await fetch(input, init)

  if (!response.ok)
    throw new Error(`HTTP ${response.status}`)

  const json = await response.json()

  return schema.parse(json)
}

export function buildHeaders(
  timestamp: string,
  cred: string,
  sign: string,
  skGameRole: string,
) {
  return {
    cred,
    'sk-game-role': skGameRole,
    'platform': '3',
    'sk-language': 'en',
    timestamp,
    'vName': '1.0.0',
    sign,
    'User-Agent': USER_AGENT,
    'Origin': 'https://game.skport.com',
    'Referer': 'https://game.skport.com/',
  }
}

export function buildSign(timestamp: string, path: string, cred?: string, salt?: string): string {
  if (salt)
    return createApiSignature(timestamp, path, salt)
  if (cred)
    return createCredentialSignature(timestamp, cred)
  throw new Error('Neither cred nor salt provided for signing')
}
