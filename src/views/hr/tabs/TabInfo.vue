<template>
  <div class="tab-info">
    <div class="info-grid">
      <!-- 기본 정보 -->
      <div class="info-card">
        <div class="info-card-header">
          <h3>기본 정보</h3>
          <button class="btn-edit-sm" @click="showEditBasic = true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            수정
          </button>
        </div>
        <div class="info-rows">
          <div class="info-row"><span class="info-label">이름</span><span class="info-value">{{ user.name }}</span></div>
          <div class="info-row"><span class="info-label">사번</span><span class="info-value font-num bold">{{ user.empNo }}</span></div>
          <div class="info-row"><span class="info-label">이메일</span><span class="info-value">{{ user.email }}</span></div>
          <div class="info-row"><span class="info-label">연락처</span><span class="info-value font-num">{{ user.phone }}</span></div>
          <div class="info-row"><span class="info-label">내선번호</span><span class="info-value font-num">{{ user.extension }}</span></div>
          <div class="info-row"><span class="info-label">생년월일</span><span class="info-value font-num">{{ user.birthDate }}</span></div>
          <div class="info-row"><span class="info-label">주소</span><span class="info-value">{{ user.address }}</span></div>
          <div class="info-row"><span class="info-label">주민번호</span><span class="info-value font-num">{{ user.ssn }}</span></div>
          <div class="info-row"><span class="info-label">계좌번호</span><span class="info-value font-num">{{ user.bankAccount }}</span></div>
          <div class="info-row">
            <span class="info-label">비밀번호</span>
            <span class="info-value"><a class="link" @click="showChangePw = true">변경하기</a></span>
          </div>
        </div>
      </div>

      <!-- 인사 정보 -->
      <div class="info-card">
        <div class="info-card-header"><h3>인사 정보</h3></div>
        <div class="info-rows">
          <div class="info-row"><span class="info-label">조직 · 직책</span><span class="info-value bold">{{ user.orgPosition }}</span></div>
          <div class="info-row"><span class="info-label">직무 · 직근</span><span class="info-value bold">{{ user.jobRole }}</span></div>
          <div class="info-row"><span class="info-label">직위 · 직급</span><span class="info-value bold">{{ user.rank }}</span></div>
          <div class="info-row"><span class="info-label">재직 상태</span><span class="info-value">{{ user.status }}</span></div>
          <div class="info-row"><span class="info-label">입사일</span><span class="info-value font-num bold">{{ user.hireDate }}</span></div>
          <div class="info-row"><span class="info-label">근속 연수</span><span class="info-value bold">{{ user.tenure }}</span></div>
          <div class="info-row"><span class="info-label">근무 형태</span><span class="info-value">{{ user.workType }}</span></div>
          <div class="info-row"><span class="info-label">근무 지역</span><span class="info-value">{{ user.workRegion }}</span></div>
          <div class="info-row"><span class="info-label">입사 유형</span><span class="info-value">{{ user.hireType }}</span></div>
          <div class="info-row info-row-ghost" aria-hidden="true"></div>
        </div>
      </div>

      <!-- 역량 정보 -->
      <div class="info-card">
        <div class="info-card-header">
          <h3>역량 정보</h3>
          <button class="btn-add" @click="showAddSkill = true">+ 추가</button>
        </div>
        <div class="skill-table-wrap">
          <table class="skill-table">
            <thead>
            <tr><th>종류</th><th>자격증명</th><th>발급기관</th><th>취득일</th><th>상태</th></tr>
            </thead>
            <tbody>
            <tr v-for="(s, i) in user.skills" :key="i">
              <td>{{ s.type }}</td>
              <td class="bold">{{ s.name }}</td>
              <td>{{ s.issuer }}</td>
              <td class="font-num">{{ s.date }}</td>
              <td><span class="status-tag" :class="s.status === '유효' ? 'valid' : 'expired'">{{ s.status }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 경력사항 -->
      <div class="info-card">
        <div class="info-card-header"><h3>경력사항</h3></div>
        <div class="career-list">
          <div v-for="(c, i) in user.careers" :key="i" class="career-item">
            <div class="career-top">
              <span class="career-company">{{ c.company }}</span>
              <span class="career-duration font-num">{{ c.duration }}</span>
            </div>
            <div class="career-role">{{ c.role }}</div>
            <div class="career-period font-num">{{ c.period }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 기본 정보 수정 모달 -->
    <BaseModal v-model="showEditBasic" width="480px">
      <h2 class="modal-title">기본 정보 수정</h2>
      <div class="modal-fields">
        <div class="modal-field">
          <label>연락처</label>
          <input v-model="editForm.phone" type="text" placeholder="010-0000-0000" />
        </div>
        <div class="modal-field">
          <label>주소</label>
          <input v-model="editForm.address" type="text" placeholder="주소를 입력하세요" />
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" @click="saveBasicInfo">확인</button>
        <button class="btn-cancel" @click="showEditBasic = false">취소</button>
      </div>
    </BaseModal>

    <!-- 역량 정보 추가 모달 -->
    <BaseModal v-model="showAddSkill" width="520px">
      <div class="modal-title-row">
        <h2 class="modal-title">역량 정보 추가</h2>
        <span class="modal-close" @click="showAddSkill = false">&times;</span>
      </div>
      <div class="modal-fields">
        <div class="modal-field">
          <label>종류</label>
          <select v-model="skillForm.type">
            <option value="자격증">자격증</option>
            <option value="어학">어학</option>
            <option value="면허">면허</option>
          </select>
        </div>
        <div class="modal-field">
          <label>자격명</label>
          <input v-model="skillForm.name" placeholder="자격명을 입력하세요" />
        </div>
        <div class="modal-field">
          <label>발급 기관</label>
          <input v-model="skillForm.issuer" placeholder="발급 기관을 입력하세요" />
        </div>
        <div class="modal-field-row">
          <div class="modal-field">
            <label>취득일</label>
            <input v-model="skillForm.date" type="date" />
          </div>
          <div class="modal-field">
            <label>만료일 (선택)</label>
            <input v-model="skillForm.expiry" type="date" />
          </div>
        </div>
        <div class="modal-field">
          <label>자격 번호 (선택)</label>
          <input v-model="skillForm.certNo" placeholder="자격 번호를 입력하세요" />
        </div>
        <div class="modal-field">
          <label>증빙 파일 (이미지 또는 PDF)</label>
          <div class="file-upload" @click="triggerFileInput">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span v-if="!skillForm.file">파일 선택</span>
            <span v-else>{{ skillForm.file.name }}</span>
          </div>
          <input ref="fileInputRef" type="file" accept="image/*,.pdf" style="display:none" @change="handleFileSelect" />
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" @click="addSkill">확인</button>
        <button class="btn-cancel" @click="showAddSkill = false">취소</button>
      </div>
    </BaseModal>

    <!-- 비밀번호 변경 모달 -->
    <BaseModal v-model="showChangePw" width="440px">
      <h2 class="modal-title">비밀번호 변경</h2>
      <div class="modal-fields">
        <div class="modal-field">
          <label>현재 비밀번호</label>
          <input v-model="pwForm.current" type="password" placeholder="현재 비밀번호를 입력하세요"
                 :class="{ 'input-error': pwErrors.current }" @input="pwErrors.current = ''" />
          <span v-if="pwErrors.current" class="field-error">{{ pwErrors.current }}</span>
        </div>
        <div class="modal-field">
          <label>새 비밀번호</label>
          <input v-model="pwForm.newPw" type="password" placeholder="새 비밀번호를 입력하세요"
                 @input="validateNewPw" />
          <div v-if="pwForm.newPw" class="pw-rules">
            <div v-for="rule in pwRules" :key="rule.label" class="pw-rule" :class="{ pass: rule.pass }">
              <svg v-if="rule.pass" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              {{ rule.label }}
            </div>
          </div>
        </div>
        <div class="modal-field">
          <label>새 비밀번호 확인</label>
          <input v-model="pwForm.confirm" type="password" placeholder="새 비밀번호를 다시 입력하세요"
                 @input="validateConfirmPw" />
          <span v-if="pwErrors.confirm" class="field-error">{{ pwErrors.confirm }}</span>
        </div>
        <div v-if="pwSuccess" class="success-box">비밀번호가 성공적으로 변경되었습니다.</div>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" :disabled="!pwForm.current || !canChangePw" @click="changePassword">비밀번호 변경</button>
        <button class="btn-cancel" @click="closePwModal">취소</button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'

const props = defineProps({ user: { type: Object, required: true } })

// ── 기본 정보 수정 ──
const showEditBasic = ref(false)
const editForm = reactive({ phone: '', address: '' })

watch(showEditBasic, (val) => {
  if (val) {
    editForm.phone = props.user.phone
    editForm.address = props.user.address
  }
})

const saveBasicInfo = () => {
  props.user.phone = editForm.phone
  props.user.address = editForm.address
  showEditBasic.value = false
  // 추후 API: await api.put('/users/me/basic', editForm)
}

// ── 역량 정보 추가 ──
const showAddSkill = ref(false)
const fileInputRef = ref(null)
const skillForm = reactive({ type: '자격증', name: '', issuer: '', date: '', expiry: '', certNo: '', file: null })

const triggerFileInput = () => fileInputRef.value?.click()
const handleFileSelect = (e) => { skillForm.file = e.target.files[0] || null }

const addSkill = () => {
  if (!skillForm.name || !skillForm.issuer) return
  props.user.skills.push({
    type: skillForm.type,
    name: skillForm.name,
    issuer: skillForm.issuer,
    date: skillForm.date,
    status: '유효'
  })
  Object.assign(skillForm, { type: '자격증', name: '', issuer: '', date: '', expiry: '', certNo: '', file: null })
  showAddSkill.value = false
  // 추후 API: await api.post('/users/me/skills', formData)
}

// ── 비밀번호 변경 ──
const showChangePw = ref(false)
const pwSuccess = ref(false)
const pwForm = reactive({ current: '', newPw: '', confirm: '' })
const pwErrors = reactive({ current: '', confirm: '' })
const TEST_PASSWORD_STORAGE_KEY = 'testAccountPassword'
const TEST_DEFAULT_PASSWORD = 'test1234!'

watch(showChangePw, (val) => {
  if (val) {
    Object.assign(pwForm, { current: '', newPw: '', confirm: '' })
    Object.assign(pwErrors, { current: '', confirm: '' })
    pwSuccess.value = false
  }
})

const getCurrentPassword = () => {
  return localStorage.getItem(TEST_PASSWORD_STORAGE_KEY) || TEST_DEFAULT_PASSWORD
}

const pwRules = computed(() => {
  const pw = pwForm.newPw
  return [
    { label: '8자 이상', pass: pw.length >= 8 },
    { label: '영문', pass: /[a-zA-Z]/.test(pw) },
    { label: '숫자', pass: /[0-9]/.test(pw) },
    { label: '특수문자', pass: /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]/.test(pw) },
  ]
})

const allPwRulesPass = computed(() => pwRules.value.every(r => r.pass))
const canChangePw = computed(() => allPwRulesPass.value && pwForm.newPw && pwForm.newPw === pwForm.confirm)

const validateNewPw = () => { pwErrors.confirm = '' }
const validateConfirmPw = () => {
  pwErrors.confirm = pwForm.confirm && pwForm.newPw !== pwForm.confirm ? '새 비밀번호가 일치하지 않습니다.' : ''
}

const changePassword = () => {
  pwErrors.current = ''
  if (!canChangePw.value) return
  if (pwForm.current !== getCurrentPassword()) {
    pwErrors.current = '현재 비밀번호가 일치하지 않습니다.'
    return
  }

  localStorage.setItem(TEST_PASSWORD_STORAGE_KEY, pwForm.newPw)
  pwSuccess.value = true
  setTimeout(() => { showChangePw.value = false }, 1500)
}

const closePwModal = () => { showChangePw.value = false }
</script>

<style scoped>
.tab-info{margin-top:20px}
.info-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:stretch}

/* Info Card */
.info-card{background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden}
.info-card-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--gray100)}
.info-card-header h3{font-size:.95rem;font-weight:700;color:var(--gray800)}

.btn-edit-sm{display:flex;align-items:center;gap:5px;padding:6px 14px;border:1px solid var(--primary);border-radius:var(--radius-xs);background:var(--accent);color:var(--primary);font-size:.78rem;font-weight:600;cursor:pointer;transition:all .15s;font-family:var(--font)}
.btn-edit-sm:hover{background:var(--primary);color:#fff}
.btn-add{padding:6px 14px;border:1px solid var(--primary);border-radius:var(--radius-xs);background:var(--primary);color:#fff;font-size:.78rem;font-weight:600;cursor:pointer;font-family:var(--font)}
.btn-add:hover{background:var(--primary-dark)}

/* Info Rows */
.info-rows{padding:8px 20px}
.info-row{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid var(--gray100)}
.info-row:last-child{border-bottom:none}
.info-row-ghost{visibility:hidden}
.info-label{flex:0 0 90px;font-size:.82rem;color:var(--gray500);font-weight:500}
.info-value{font-size:.85rem;color:var(--gray700)}
.info-value.bold,.bold{font-weight:600}
.font-num{font-family:var(--font-num)}
.link{color:var(--primary);font-weight:600;cursor:pointer;text-decoration:underline}
.link:hover{color:var(--primary-dark)}

/* Skill Table */
.skill-table{width:100%;border-collapse:collapse;font-size:.82rem}
.skill-table th{text-align:left;padding:10px 20px;font-weight:600;color:var(--gray500);border-bottom:1px solid var(--gray200);font-size:.78rem}
.skill-table td{padding:10px 20px;border-bottom:1px solid var(--gray100);color:var(--gray700)}
.skill-table tr:last-child td{border-bottom:none}
.skill-table-wrap{max-height:280px;overflow-y:auto}
.skill-table thead th{position:sticky;top:0;background:#fff;z-index:1}
.status-tag{padding:2px 10px;border-radius:12px;font-size:.72rem;font-weight:600}
.status-tag.valid{background:#ECFDF5;color:#059669}
.status-tag.expired{background:#FEF2F2;color:#DC2626}

/* Career */
.career-list{padding:12px 20px;max-height:280px;overflow-y:auto}
.career-item{padding:12px 0;border-bottom:1px solid var(--gray100)}
.career-item:last-child{border-bottom:none}
.career-top{display:flex;justify-content:space-between;align-items:center}
.career-company{font-size:.92rem;font-weight:700;color:var(--gray800)}
.career-duration{font-size:.78rem;color:var(--gray400)}
.career-role{font-size:.82rem;color:var(--gray500);margin:2px 0}
.career-period{font-size:.78rem;color:var(--gray400)}

/* Modal shared */
.modal-title{font-size:1.15rem;font-weight:700;color:var(--gray800);margin-bottom:20px}
.modal-title-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.modal-title-row .modal-title{margin-bottom:0}
.modal-close{font-size:1.5rem;color:var(--gray400);cursor:pointer;line-height:1}
.modal-close:hover{color:var(--gray600)}
.modal-fields{display:flex;flex-direction:column;gap:16px}
.modal-field{display:flex;flex-direction:column;gap:5px}
.modal-field label{font-size:.82rem;font-weight:600;color:var(--gray600)}
.modal-field input,.modal-field select{padding:10px 14px;border:1px solid var(--gray200);border-radius:var(--radius-xs);font-size:.85rem;font-family:var(--font);color:var(--gray700);outline:none;transition:all .2s}
.modal-field input:focus,.modal-field select:focus{border-color:var(--primary);box-shadow:0 0 0 3px var(--accent)}
.modal-field input:disabled{background:var(--gray50);color:var(--gray400)}
.modal-field input.input-error{border-color:#EF4444;box-shadow:0 0 0 3px #FEF2F2}
.modal-field select{appearance:none;background:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 14px center,#fff}
.modal-field-row{display:flex;gap:12px}.modal-field-row .modal-field{flex:1}
.field-error{font-size:.75rem;color:#EF4444}
.file-upload{display:flex;align-items:center;justify-content:center;gap:8px;padding:14px;border:1.5px dashed var(--gray300);border-radius:var(--radius-xs);color:var(--gray400);font-size:.82rem;cursor:pointer;transition:all .15s}
.file-upload:hover{border-color:var(--primary);color:var(--primary);background:var(--accent)}
.modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:24px}
.btn-confirm,.btn-cancel{padding:10px 28px;border-radius:var(--radius-xs);font-size:.88rem;font-weight:600;font-family:var(--font);border:none;cursor:pointer;transition:all .15s}
.btn-confirm{background:var(--primary);color:#fff}
.btn-confirm:hover:not(:disabled){background:var(--primary-dark)}
.btn-confirm:disabled{opacity:.5;cursor:not-allowed}
.btn-cancel{background:#fff;color:var(--gray600);border:1px solid var(--gray200)}
.btn-cancel:hover{background:var(--gray50)}

/* PW rules */
.pw-rules{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:6px}
.pw-rule{display:flex;align-items:center;gap:4px;font-size:.72rem;color:var(--gray400)}.pw-rule.pass{color:#16A34A}
.success-box{padding:10px 14px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:var(--radius-xs);font-size:.82rem;color:#16A34A}

@media (max-width: 1200px) {
  .info-grid { grid-template-columns: minmax(0, 1fr); }
}
</style>
