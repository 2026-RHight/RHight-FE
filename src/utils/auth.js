export const AUTH_KEYS = {
  loggedIn: 'isLoggedIn',
  role: 'userRole',
  userId: 'userId',
  userName: 'userName',
  lastLoginAt: 'lastLoginAt'
}

export const USER_ROLES = {
  user: 'USER',
  admin: 'ADMIN'
}

export const getSessionRole = () => sessionStorage.getItem(AUTH_KEYS.role) || USER_ROLES.user
export const isAdminRole = () => getSessionRole() === USER_ROLES.admin

export const setLoginSession = ({ userId, userName, role, lastLoginAt }) => {
  sessionStorage.setItem(AUTH_KEYS.loggedIn, 'true')
  sessionStorage.setItem(AUTH_KEYS.userId, userId || '')
  sessionStorage.setItem(AUTH_KEYS.userName, userName || '')
  sessionStorage.setItem(AUTH_KEYS.role, role || USER_ROLES.user)
  sessionStorage.setItem(AUTH_KEYS.lastLoginAt, lastLoginAt || '')
}

export const clearLoginSession = () => {
  sessionStorage.setItem(AUTH_KEYS.loggedIn, 'false')
  sessionStorage.removeItem(AUTH_KEYS.userId)
  sessionStorage.removeItem(AUTH_KEYS.userName)
  sessionStorage.removeItem(AUTH_KEYS.role)
  sessionStorage.removeItem(AUTH_KEYS.lastLoginAt)
}
