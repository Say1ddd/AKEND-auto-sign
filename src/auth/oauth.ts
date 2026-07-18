import { BASE_URL } from '../constants.ts'
import {
  BasicInfoResponseSchema,
  CredentialResponseSchema,
  GrantResponseSchema,
} from '../schemas/oauth-schema.ts'
import { fetchJson } from '../utils/http.ts'

export async function runOAuthFlow(accountToken: string) {
  const url = new URL('https://as.gryphline.com/user/info/v1/basic')
  url.searchParams.set('token', accountToken)

  const info = await fetchJson(
    BasicInfoResponseSchema,
    url,
  )

  if (info.status !== 0)
    throw new Error(info.msg)

  const grant = await fetchJson(
    GrantResponseSchema,
    'https://as.gryphline.com/user/oauth2/v2/grant',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: accountToken,
        type: 0,
      }),
    },
  )

  if (grant.status !== 0 || !grant.data)
    throw new Error(grant.msg)

  const credential = await fetchJson(
    CredentialResponseSchema,
    `${BASE_URL}/user/auth/generate_cred_by_code`,
    {
      method: 'POST',
      headers: {
        'platform': '3',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: grant.data.code,
        kind: 1,
      }),
    },
  )

  if (credential.code !== 0 || !credential.data)
    throw new Error(credential.message)

  return credential.data
}
