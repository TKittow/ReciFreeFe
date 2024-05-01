import { jwtDecode } from "jwt-decode"

export function currentUser() {
  const token = localStorage.getItem('access_token')

  if (!token){
    return null
  }
  try {
    const decoded = jwtDecode(token)
    return decoded.user_id
  } catch (error) {
    console.error('Error decoding access token:', error)
    return null
  }
}