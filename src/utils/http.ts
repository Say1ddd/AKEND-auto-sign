import type { z } from 'zod'

// avoiding generic inference because owner of zod states that the bug is unfixable
// https://github.com/colinhacks/zod/issues/4877#issuecomment-3100124769
export async function fetchJson<TSchema extends z.ZodType>(
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
