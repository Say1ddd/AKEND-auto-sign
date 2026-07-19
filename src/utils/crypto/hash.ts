import { createHash, createHmac } from 'node:crypto'

export function md5(value: string): string {
  return createHash('md5')
    .update(value)
    .digest('hex')
}

export function hmacSha256(
  value: string,
  secret: string,
): string {
  return createHmac('sha256', secret)
    .update(value)
    .digest('hex')
}
