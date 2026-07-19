import { BASE_URL, ENDPOINT } from '../constants.ts'
import { AttendanceClaimSchema, AttendanceStatusSchema } from '../schemas/attendance-schema.ts'
import { fetchValidJson } from '../utils/http.ts'

export async function checkAttendanceStatus(
  headers: HeadersInit,
) {
  return fetchValidJson(
    AttendanceStatusSchema,
    BASE_URL + ENDPOINT,
    { headers },
  )
}

export async function claimAttendance(
  headers: HeadersInit,
) {
  return fetchValidJson(
    AttendanceClaimSchema,
    BASE_URL + ENDPOINT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    },
  )
}
