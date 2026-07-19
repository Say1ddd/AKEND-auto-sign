import { BASE_URL } from '../constants.ts'
import { PlayerBindingResponseSchema } from '../schemas/role-schema.ts'
import { createApiSignature } from '../utils/crypto/signer.ts'
import { buildHeaders, fetchValidJson } from '../utils/http.ts'

export async function fetchPlayerBinding(
  cred: string,
  salt: string,
) {
  const timestamp = Math.floor(Date.now() / 1000).toString()

  const bindingUrl = new URL(`${BASE_URL}/api/v1/game/player/binding`)
  const sign = createApiSignature(bindingUrl.toString(), salt, timestamp)

  return fetchValidJson(
    PlayerBindingResponseSchema,
    bindingUrl,
    {
      headers: buildHeaders(cred, sign, '', timestamp),
    },
  )
}

export async function getDefaultRole(
  cred: string,
  salt: string,
): Promise<string | null> {
  const response = await fetchPlayerBinding(cred, salt)

  if (response.code !== 0) {
    console.warn(response.message)
    return null
  }

  const appCode = response.data?.list.find(
    app => app.appCode === 'endfield',
  )

  if (!appCode)
    return null

  const binding = appCode.bindingList?.[0]

  if (!binding)
    return null

  const role = binding.defaultRole ?? binding.roles?.[0]

  if (!role)
    return null

  return `3_${role.roleId}_${role.serverId}`
}
