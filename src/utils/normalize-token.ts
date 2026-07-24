export function normalizeToken(token: string): string {
  try {
    const decoded = decodeURIComponent(token)
    return decoded === token ? token : decoded
  }
  catch {
    return token
  }
}
