import { hmacSha256, md5 } from './hash.ts'

interface SignatureHeader {
  platform: string
  timestamp: string
  dId: string
  vName: string
}

export function createCredentialSignature(
  cred: string,
  timestamp: string,
): string {
  return md5(`timestamp=${timestamp}&cred=${cred}`)
}

export function createApiSignature(
  path: string,
  salt: string,
  timestamp: string,
): string {
  const header: SignatureHeader = {
    platform: '3',
    timestamp,
    dId: '',
    vName: '1.0.0',
  }

  const headerJson = JSON.stringify(header)

  const payload = path + timestamp + headerJson

  const hmac = hmacSha256(payload, salt)

  return md5(hmac)
}
