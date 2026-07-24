import { ENDPOINT } from './constants.ts'
import { checkAttendanceStatus, claimAttendance } from './services/attendance.ts'
import { getAuthData } from './services/auth.ts'
import { getDefaultRole } from './services/role.ts'
import { buildHeaders, buildSign } from './utils/http.ts'
import 'dotenv/config'

const accountToken = process.env.ACCOUNT_TOKEN

export async function setup() {
  try {
    let cred = ''
    let salt: string | undefined

    if (accountToken) {
      console.info('Refreshing OAuth credentials...')

      const oauth = await getAuthData(accountToken)
      cred = oauth.cred
      salt = oauth.salt

      if (!cred)
        throw new Error('Missing credential.')

      const role = await getDefaultRole(cred, salt)

      if (!role)
        throw new Error('Unable to determine game role.')

      const timestamp = Math.floor(Date.now() / 1000).toString()

      const sign = buildSign(timestamp, ENDPOINT, cred, salt)
      const headers = buildHeaders(timestamp, cred, sign, role)

      const status = await checkAttendanceStatus(headers)

      if (status.code !== 0)
        throw new Error(status.message)

      if (status.data.hasToday) {
        throw new Error('Reward already claimed for today.')
      }

      console.info('Today\'s reward hasn\'t been claimed, claiming...')

      const claim = await claimAttendance(headers)

      if (claim.code !== 0)
        throw new Error(claim.message)

      console.info('Reward claimed successfully.')
    }
    else {
      throw new Error('ACCOUNT_TOKEN is not provided.')
    }
  }
  catch (e) {
    console.error('Setup Error:', e)
  }
}
