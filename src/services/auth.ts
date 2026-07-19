import { BASE_URL, X_APP_CODE } from '../constants.ts'
import {
  BasicInfoResponseSchema,
  CredentialResponseSchema,
  GrantResponseSchema,
} from '../schemas/auth-schema.ts'
import { fetchValidJson } from '../utils/http.ts'

export async function getAuthData(accountToken: string) {
  const url = 'https://as.gryphline.com'

  const basicUrl = new URL(`${url}/user/info/v1/basic`)
  basicUrl.searchParams.set('token', accountToken)

  const basicRes = await fetchValidJson(BasicInfoResponseSchema, basicUrl)
  if (basicRes.status !== 0)
    throw new Error(basicRes.msg)

  const grantUrl = new URL(`${url}/user/oauth2/v2/grant`)

  const grantRes = await fetchValidJson(
    GrantResponseSchema,
    grantUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: accountToken,
        appCode: X_APP_CODE,
        type: 0,
      }),
    },
  )
  if (grantRes.status !== 0 || !grantRes.data)
    throw new Error(grantRes.msg)

  const credUrl = new URL(`${BASE_URL}/web/v1/user/auth/generate_cred_by_code`)

  const cred = await fetchValidJson(
    CredentialResponseSchema,
    credUrl,
    {
      method: 'POST',
      headers: {
        'platform': '3',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: grantRes.data.code,
        kind: 1,
      }),
    },
  )

  if (cred.code !== 0 || !cred.data)
    throw new Error(cred.message)

  return {
    cred: cred.data.cred,
    salt: cred.data.token,
    userId: cred.data.userId,
  }
}
