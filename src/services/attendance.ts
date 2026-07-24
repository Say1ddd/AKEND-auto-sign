import { BASE_URL, ENDPOINT } from '../constants.ts'
import { AttendanceClaimSchema, AttendanceStatusSchema } from '../schemas/attendance-schema.ts'
import { fetchValidJson } from '../utils/http.ts'

const attendanceUrl = new URL(BASE_URL + ENDPOINT)

export async function checkAttendanceStatus(
  headers: HeadersInit,
) {
  return fetchValidJson(
    AttendanceStatusSchema,
    attendanceUrl,
    { headers },
  )
}

export async function claimAttendance(
  headers: HeadersInit,
) {
  return fetchValidJson(
    AttendanceClaimSchema,
    attendanceUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    },
  )
}
