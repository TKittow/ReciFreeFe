import { jwtDecode } from "jwt-decode"

export function currentUser() {
  const token = localStorage.getItem('access_token')
  const decoded = jwtDecode(token)
  console.log(decoded)
  return decoded.user_id
}