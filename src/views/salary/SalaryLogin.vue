<template>
  <div class="salary-login-container">
    <div class="login-card">
      <div class="icon-lock">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h2>급여 명세서 조회</h2>
      <p class="desc">개인 정보 보호를 위해 비밀번호를 입력해주세요.</p>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input 
            type="password" 
            v-model="password" 
            placeholder="비밀번호를 입력하세요" 
            ref="passwordInput"
          />
        </div>
        <button type="submit" class="btn-submit">확인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const passwordInput = ref(null)

onMounted(() => {
  if (passwordInput.value) {
    passwordInput.value.focus()
  }
})

const handleLogin = () => {
  if (password.value === 'test1234!') {
    sessionStorage.setItem('isSalaryAuthenticated', 'true')
    router.replace('/salary/my')
  } else {
    alert('비밀번호가 올바르지 않습니다.')
    password.value = ''
  }
}
</script>

<style scoped>
.salary-login-container {
  height: calc(100vh - var(--header-h));
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gray);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.icon-lock {
  width: 80px;
  height: 80px;
  background: #E8F5FE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray900);
  margin-bottom: 8px;
}

.desc {
  font-size: 0.95rem;
  color: var(--gray500);
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--gray300);
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: var(--primary);
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background: var(--primary-dark);
}
</style>
