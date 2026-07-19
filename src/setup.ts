import { BASE_URL, ENDPOINT } from './constants.ts'
import { checkAttendanceStatus, claimAttendance } from './services/attendance.ts'
import { getAuthData } from './services/auth.ts'
import { getDefaultRole } from './services/role.ts'
import { buildHeaders, buildSign } from './utils/http.ts'
import 'dotenv/config'

const accountToken = process.env.ACCOUNT_TOKEN
const timestamp = Math.floor(Date.now() / 1000).toString()

export async function setup() {
  try {
    let cred = ''
    let salt: string | undefined

    if (accountToken) {
      console.info('Refreshing OAuth credentials...')

      decodeURIComponent(accountToken)
      const oauth = await getAuthData(accountToken)
      cred = oauth.cred
      salt = oauth.salt

      if (!cred)
        throw new Error('Missing credential.')

      const role = await getDefaultRole(cred, salt)

      if (!role)
        throw new Error('Unable to determine game role.')

      const sign = buildSign(timestamp, BASE_URL + ENDPOINT, cred, salt)

      const headers = buildHeaders(cred, sign, role, timestamp)

      const status = await checkAttendanceStatus(headers)

      if (status.code !== 0)
        throw new Error(status.message)

      if (status.data.hasToday) {
        console.info('Already signed in.')
      }

      console.info('Claiming attendance...')

      const claim = await claimAttendance(headers)

      if (claim.code !== 0)
        throw new Error(claim.message)

      console.info('Attendance claimed successfully.')
    }
    else {
      console.error('ACCOUNT_TOKEN is not provided.')
    }
  }
  catch (e) {
    console.error('Error:', e)
  }
}
