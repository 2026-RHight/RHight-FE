<template>
  <div class="login-page">
    <!-- 왼쪽: 로그인 폼 -->
    <div class="login-left">
      <div class="login-form-wrap">
        <div class="login-logo">
          <img class="login-logo-img" :src="logo" alt="RHight logo"/>
          <span class="login-logo-text">RHight</span>
        </div>


        <div class="login-fields">
          <div class="field-group">
            <input
                type="text"
                v-model="username"
                placeholder="아이디를 입력하세요"
                @input="clearLoginError"
                @keyup.enter="handleLogin"
            />
          </div>
          <div class="field-group">
            <input
                type="password"
                v-model="password"
                placeholder="비밀번호를 입력하세요"
                @input="clearLoginError"
                @keyup.enter="handleLogin"
            />
          </div>

          <div class="reset-link">
            <a href="#" @click.prevent="showResetModal = true">비밀번호 초기화</a>
          </div>

          <button class="login-btn" @click="handleLogin" :disabled="!username || !password">
            로그인
          </button>

          <p v-if="loginError" class="login-error">{{ loginError }}</p>

          <p class="test-account-info">
            테스트 계정: 사번 <strong>test1234</strong> / 비밀번호 <strong>test1234!</strong>
          </p>
          <p class="test-account-info">
            관리자 계정: 사번 <strong>admin1234</strong> / 비밀번호 <strong>admin1234!</strong>
          </p>
        </div>

        <div class="login-footer">
          © 2026 RHight. All rights reserved.
        </div>
      </div>
    </div>

    <!-- 오른쪽: 브랜드 배경 -->
    <div class="login-right">
      <!-- 장식용 원 -->
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="brand-content">
        <h1>Welcome to RHight</h1>
        <p>효율적인 인사관리로 팀의 성장을 함께하세요</p>
      </div>
    </div>
    <PasswordResetModal v-model="showResetModal" @confirm="handleReset" />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo-rhight.png'
import PasswordResetModal from '@/components/user/PasswordResetModal.vue'
import { setLoginSession, USER_ROLES } from '@/utils/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const showResetModal = ref(false)
const loginError = ref('')

const TEST_ACCOUNT = {
  empNo: 'test1234',
  defaultPassword: 'test1234!',
  ssn: '123456'
}
const ADMIN_ACCOUNT = {
  empNo: 'admin1234',
  password: 'admin1234!',
  name: '관리자'
}
const TEST_PASSWORD_STORAGE_KEY = 'testAccountPassword'

const getCurrentTestPassword = () => {
  return localStorage.getItem(TEST_PASSWORD_STORAGE_KEY) || TEST_ACCOUNT.defaultPassword
}

const resetTestPassword = () => {
  localStorage.setItem(TEST_PASSWORD_STORAGE_KEY, TEST_ACCOUNT.defaultPassword)
}

const clearLoginError = () => {
  loginError.value = ''
}

const formatLoginTimestamp = () => {
  const now = new Date()
  const yyyy = String(now.getFullYear())
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

const handleReset = ({ empNo, ssn }) => {
  if (empNo !== TEST_ACCOUNT.empNo || ssn !== TEST_ACCOUNT.ssn) {
    alert('사번 또는 주민등록번호가 올바르지 않습니다.')
    return
  }

  resetTestPassword()
  alert(`비밀번호가 ${TEST_ACCOUNT.defaultPassword}로 초기화되었습니다.`)
}

const handleLogin = () => {
  if (!username.value || !password.value) return
  loginError.value = ''

  const isAdminLogin =
    username.value === ADMIN_ACCOUNT.empNo && password.value === ADMIN_ACCOUNT.password

  if (isAdminLogin) {
    setLoginSession({
      userId: ADMIN_ACCOUNT.empNo,
      userName: ADMIN_ACCOUNT.name,
      role: USER_ROLES.admin,
      lastLoginAt: formatLoginTimestamp()
    })
    router.push('/')
    return
  }

  const currentPassword = getCurrentTestPassword()
  const isValidAccount = username.value === TEST_ACCOUNT.empNo && password.value === currentPassword
  if (!isValidAccount) {
    loginError.value = '아이디와 비밀번호가 일치하지 않습니다.'
    password.value = ''
    return
  }

  setLoginSession({
    userId: TEST_ACCOUNT.empNo,
    userName: '테스트 사용자',
    role: USER_ROLES.user,
    lastLoginAt: formatLoginTimestamp()
  })
  router.push('/')
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background: #fff;
}

/* ── 왼쪽: 로그인 폼 ── */
.login-left {
  flex: 0 0 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-form-wrap {
  width: 100%;
  max-width: 320px;
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 48px;
}

.login-logo-text {
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #1E293B;
}

.login-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #1E293B;
}

.field-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 0.88rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #334155;
  background: #fff;
  transition: all 0.2s;
  outline: none;
}

.field-group input::placeholder {
  color: #94A3B8;
}

.field-group input:focus {
  border-color: #0891B2;
  box-shadow: 0 0 0 3px #ECFEFF;
}

.reset-link {
  text-align: right;
  margin-top: -8px;
}

.reset-link a {
  font-size: 0.82rem;
  font-weight: 600;
  color: #0891B2;
  text-decoration: none;
}

.reset-link a:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #0891B2;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;
}

.login-btn:hover:not(:disabled) {
  background: #0E7490;
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-error {
  margin: -10px 0 0;
  font-size: 0.84rem;
  color: #DC2626;
  line-height: 1.4;
}

.test-account-info {
  margin: 0;
  font-size: 0.78rem;
  color: #64748B;
  line-height: 1.5;
}

.login-footer {
  margin-top: 40px;
  font-size: 0.78rem;
  color: #94A3B8;
}

/* ── 오른쪽: 브랜드 배경 ── */
.login-right {
  flex: 1;
  background: linear-gradient(135deg, #0891B2 0%, #06B6D4 40%, #22D3EE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.brand-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.brand-content h1 {
  font-family: 'Plus Jakarta Sans', 'Noto Sans KR', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
}

.brand-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
}

/* 장식 원 */
.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.circle-1 {
  width: 500px;
  height: 500px;
  top: -80px;
  left: 10%;
}

.circle-2 {
  width: 400px;
  height: 400px;
  top: 5%;
  right: 5%;
}

.circle-3 {
  width: 350px;
  height: 350px;
  bottom: -60px;
  right: 15%;
}
.login-logo-img{
  height: 40px;   /* 필요하면 36~44 사이로 조절 */
  width: auto;
  display: block;
  object-fit: contain;
}
</style>
