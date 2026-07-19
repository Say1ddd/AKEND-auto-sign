import type { SignatureHeader } from '../../types.ts'
import { hmacSha256, md5 } from './hash.ts'

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
    dId: '',
    platform: '3',
    vName: '1.0.0',
    timestamp,
  }

  const payload = path + timestamp + header

  const hmac = hmacSha256(payload, salt)

  return md5(hmac)
}
