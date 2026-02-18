<template>
  <div class="admin-salary-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">급여 관리</h1>
        <p class="page-description">
          급여 계산, 사원별 급여 정보 및 4대 보험 요율을 관리합니다.
        </p>
      </div>
      <div class="header-actions">
        <!-- Common actions if any -->
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-container">
      <button 
        class="tab-btn" 
        :class="{ active: currentTab === 'monthly' }"
        @click="currentTab = 'monthly'"
      >
        월 급여 관리
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: currentTab === 'employee' }"
        @click="currentTab = 'employee'"
      >
        사원별 급여 설정
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: currentTab === 'severance' }"
        @click="currentTab = 'severance'"
      >
        퇴직금 정산
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: currentTab === 'settings' }"
        @click="currentTab = 'settings'"
      >
        환경 설정
      </button>
    </div>

    <div class="tab-content">
      
      <!-- 1. Monthly Salary Management (Calculation, Ledger, Closing, Sending) -->
      <div v-if="currentTab === 'monthly'" class="section-container">
        <!-- Control Bar -->
        <div class="control-bar card">
          <div class="control-group">
            <label>귀속년월</label>
            <input type="month" v-model="targetMonth" class="month-input" />
          </div>
          <div class="status-badge" :class="monthStatus">
            {{ monthStatusLabel }}
          </div>
          <div class="control-actions">
            <button class="btn-secondary" v-if="monthStatus === 'closed'"><i class="icon-download"></i> 급여대장 엑셀 다운로드</button>
            <button class="btn-primary" v-if="monthStatus === 'initial'" @click="runCalculation">일괄 급여 계산</button>
            <button class="btn-warning" v-if="monthStatus === 'calculated'" @click="finalizeSalary">급여 마감 (확정)</button>
            <button class="btn-outline" v-if="monthStatus === 'closed'" @click="sendPayStubs">명세서 교부 알림 발송</button>
          </div>
        </div>

        <!-- Salary Ledger Grid -->
        <div class="ledger-card card">
          <div class="card-header">
            <h3>{{ targetMonth }} 급여 대장</h3>
            <span class="count">총 {{ monthlySalaryData.length }}명</span>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>부서</th>
                  <th>직급</th>
                  <th class="text-right">기본급</th>
                  <th class="text-right">식대</th>
                  <th class="text-right">연장수당</th>
                  <th class="text-right highlight-blue">지급총액</th>
                  <th class="text-right">국민연금</th>
                  <th class="text-right">건강보험</th>
                  <th class="text-right">소득세</th>
                  <th class="text-right highlight-red">공제총액</th>
                  <th class="text-right highlight-primary">실지급액</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in monthlySalaryData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.dept }}</td>
                  <td>{{ item.position }}</td>
                  <td class="text-right">{{ formatNumber(item.basePay) }}</td>
                  <td class="text-right">{{ formatNumber(item.mealAllowance) }}</td>
                  <td class="text-right">{{ formatNumber(item.overtimePay) }}</td>
                  <td class="text-right font-bold">{{ formatNumber(item.totalPay) }}</td>
                  <td class="text-right text-gray">{{ formatNumber(item.pension) }}</td>
                  <td class="text-right text-gray">{{ formatNumber(item.healthLimit) }}</td>
                  <td class="text-right text-gray">{{ formatNumber(item.incomeTax) }}</td>
                  <td class="text-right font-bold">{{ formatNumber(item.totalDeduct) }}</td>
                  <td class="text-right font-bold text-primary">{{ formatNumber(item.netPay) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="monthlySalaryData.length === 0" class="empty-state">
            데이터가 없습니다. 급여 계산을 실행해주세요.
          </div>
        </div>
      </div>

      <!-- 2. Employee Salary Settings (Salary Info, Accounts) -->
      <div v-if="currentTab === 'employee'" class="section-container user-salary-layout">
        <!-- Left: Employee List -->
        <div class="sidebar-list card">
          <div class="search-box">
             <input type="text" placeholder="사원 검색..." v-model="searchQuery" />
          </div>
          <ul class="employee-list">
            <li 
              v-for="emp in filteredEmployees" 
              :key="emp.id" 
              class="emp-item"
              :class="{ active: selectedEmployee?.id === emp.id }"
              @click="selectEmployee(emp)"
            >
              <div class="emp-avatar">{{ emp.name[0] }}</div>
              <div class="emp-info">
                <div class="emp-name">{{ emp.name }}</div>
                <div class="emp-meta">{{ emp.dept }} · {{ emp.position }}</div>
              </div>
              <div v-if="emp.hasRequest" class="badge-dot"></div>
            </li>
          </ul>
        </div>

        <!-- Right: Detail Form -->
        <div class="detail-panel card" v-if="selectedEmployee">
          <div class="panel-header">
            <h3>{{ selectedEmployee.name }} 급여 정보 설정</h3>
            <button class="btn-save" @click="saveEmployeeSalary">저장</button>
          </div>
          
          <div class="form-section">
            <h4>기본 급여 정보</h4>
            <div class="form-grid">
              <div class="form-group">
                 <label>연봉 (기본급 기준)</label>
                 <div class="input-unit">
                   <input type="text" v-model="selectedEmployee.salary.annual" class="text-right" />
                   <span class="unit">원</span>
                 </div>
              </div>
              <div class="form-group">
                 <label>월 기본급 (자동계산)</label>
                 <div class="input-unit">
                   <input type="text" :value="formatNumber(Math.floor(parseNumber(selectedEmployee.salary.annual)/12))" readonly class="text-right bg-gray" />
                   <span class="unit">원</span>
                 </div>
              </div>
            </div>

            <h4>고정 수당</h4>
            <div class="allowance-list">
              <div class="form-group-row" v-for="(allowance, idx) in selectedEmployee.salary.allowances" :key="idx">
                <input type="text" v-model="allowance.name" placeholder="항목명" />
                <div class="input-unit">
                  <input type="text" v-model="allowance.amount" class="text-right" />
                  <span class="unit">원</span>
                </div>
                <button class="btn-icon text-red" @click="removeAllowance(idx)">&times;</button>
              </div>
              <button class="btn-add-row" @click="addAllowance">+ 수당 항목 추가</button>
            </div>
          </div>

          <div class="divider"></div>

          <div class="form-section">
            <h4>급여 계좌 정보</h4>
            <div class="bank-info-box" :class="{ 'pending-change': selectedEmployee.accountRequest }">
              <div v-if="selectedEmployee.accountRequest" class="request-alert">
                 <span class="badge-pending">변경 요청</span>
                 <p>사용자가 계좌 변경을 요청했습니다.<br/>
                    <strong>{{ selectedEmployee.accountRequest.bank }} {{ selectedEmployee.accountRequest.account }} ({{ selectedEmployee.accountRequest.holder }})</strong>
                 </p>
                 <div class="req-actions">
                   <button class="btn-tiny primary" @click="approveAccount(true)">승인</button>
                   <button class="btn-tiny danger" @click="approveAccount(false)">반려</button>
                 </div>
              </div>

              <div class="form-grid three-cols">
                <div class="form-group">
                  <label>은행명</label>
                  <select v-model="selectedEmployee.bankInfo.bank">
                    <option>국민은행</option>
                    <option>신한은행</option>
                    <option>우리은행</option>
                    <option>하나은행</option>
                    <option>카카오뱅크</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>계좌번호</label>
                  <input type="text" v-model="selectedEmployee.bankInfo.account" />
                </div>
                <div class="form-group">
                  <label>예금주</label>
                  <input type="text" v-model="selectedEmployee.bankInfo.holder" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-panel card empty" v-else>
           <p>왼쪽 목록에서 사원을 선택해주세요.</p>
        </div>
      </div>

      <!-- 3. Severance Pay -->
      <div v-if="currentTab === 'severance'" class="section-container">
        <div class="card full-width">
           <div class="card-header">
             <h3>퇴직금 정산 대상자</h3>
             <button class="btn-primary">+ 퇴직자 추가 및 정산</button>
           </div>
           
           <table class="data-table">
             <thead>
               <tr>
                 <th>이름</th>
                 <th>부서</th>
                 <th>입사일</th>
                 <th>퇴사일</th>
                 <th>근속연수</th>
                 <th>직전 3개월 평균임금</th>
                 <th>예상 퇴직금</th>
                 <th>상태</th>
                 <th>명세서</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="retiree in retirees" :key="retiree.id">
                 <td>{{ retiree.name }}</td>
                 <td>{{ retiree.dept }}</td>
                 <td>{{ retiree.joinDate }}</td>
                 <td>{{ retiree.leaveDate }}</td>
                 <td>{{ retiree.years }}년</td>
                 <td class="text-right">{{ formatNumber(retiree.avgWage) }}</td>
                 <td class="text-right font-bold">{{ formatNumber(retiree.severancePay) }}</td>
                 <td><span class="badge success">정산 완료</span></td>
                 <td><button class="btn-text">보기</button></td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>

      <!-- 4. Settings (Insurance Rates) -->
      <div v-if="currentTab === 'settings'" class="section-container">
        <div class="settings-grid">
          <div class="card">
            <h3>4대 보험 요율 설정 (근로자 부담분)</h3>
            <div class="form-group-row">
              <label>국민연금</label>
              <div class="input-unit">
                <input type="number" v-model="rates.pension" step="0.01" />
                <span class="unit">%</span>
              </div>
            </div>
            <div class="form-group-row">
              <label>건강보험</label>
              <div class="input-unit">
                <input type="number" v-model="rates.health" step="0.01" />
                <span class="unit">%</span>
              </div>
            </div>
            <div class="form-group-row">
              <label>장기요양보험 (건강보험료 대비)</label>
              <div class="input-unit">
                <input type="number" v-model="rates.care" step="0.01" />
                <span class="unit">%</span>
              </div>
            </div>
            <div class="form-group-row">
              <label>고용보험</label>
              <div class="input-unit">
                <input type="number" v-model="rates.employment" step="0.01" />
                <span class="unit">%</span>
              </div>
            </div>
            <div class="action-row">
               <button class="btn-save">요율 저장</button>
            </div>
          </div>

          <div class="card">
             <h3>소득세 간이세액표 데이터</h3>
             <p class="desc">국세청 최신 간이세액표 데이터를 관리합니다.</p>
             <div class="upload-box">
               <i class="icon-upload"></i>
               <span>2026년_간이세액표.xlsx (최신 업데이트: 2026.01.05)</span>
               <button class="btn-secondary btn-sm">업데이트</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentTab = ref('monthly')
const targetMonth = ref('2026-02')
const monthStatus = ref('initial') // initial, calculated, closed

// --- Helpers ---
const formatNumber = (val) => {
  if (!val) return '0'
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const parseNumber = (val) => {
  if (!val) return 0
  return parseInt(String(val).replace(/,/g, ''), 10) || 0
}

const monthStatusLabel = computed(() => {
  if (monthStatus.value === 'initial') return '정산 대기'
  if (monthStatus.value === 'calculated') return '계산 완료 (마감 전)'
  if (monthStatus.value === 'closed') return '마감 완료 (확정)'
  return ''
})

// --- Mock Data: Monthly Salary ---
const monthlySalaryData = ref([])

const runCalculation = () => {
  alert(`${targetMonth.value} 급여 계산을 시작합니다.\n(근태 마감 데이터와 연동되어 연장수당이 자동 계산됩니다)`)
  // Mock calculation result
  monthlySalaryData.value = [
    { id: 1, name: '김철수', dept: '개발팀', position: '대리', basePay: 3500000, mealAllowance: 200000, overtimePay: 150000, totalPay: 3850000, pension: 173250, healthLimit: 135000, incomeTax: 85000, totalDeduct: 393250, netPay: 3456750 },
    { id: 2, name: '이영희', dept: '인사팀', position: '사원', basePay: 3000000, mealAllowance: 200000, overtimePay: 50000, totalPay: 3250000, pension: 146250, healthLimit: 115000, incomeTax: 65000, totalDeduct: 326250, netPay: 2923750 },
    { id: 3, name: '박민수', dept: '영업팀', position: '과장', basePay: 4500000, mealAllowance: 200000, overtimePay: 0, totalPay: 4700000, pension: 211500, healthLimit: 165000, incomeTax: 155000, totalDeduct: 531500, netPay: 4168500 },
  ]
  monthStatus.value = 'calculated'
}

const finalizeSalary = () => {
  if (confirm('정말로 마감하시겠습니까? 마감 후에는 수정이 불가능하며, 직원들에게 급여명세서가 공개됩니다.')) {
    monthStatus.value = 'closed'
  }
}

const sendPayStubs = () => {
  alert('전체 임직원에게 급여명세서 교부 알림을 발송했습니다.')
}

// --- Mock Data: Employees ---
const searchQuery = ref('')
const employees = ref([
  { 
    id: 1, name: '김철수', dept: '개발팀', position: '대리', 
    salary: { annual: '42,000,000', allowances: [{ name: '식대', amount: '200,000' }] },
    bankInfo: { bank: '국민은행', account: '123-456-7890', holder: '김철수' },
    hasRequest: true,
    accountRequest: { bank: '카카오뱅크', account: '3333-01-234567', holder: '김철수' }
  },
  { 
    id: 2, name: '이영희', dept: '인사팀', position: '사원', 
    salary: { annual: '36,000,000', allowances: [{ name: '식대', amount: '200,000' }] },
    bankInfo: { bank: '신한은행', account: '110-222-333333', holder: '이영희' },
    hasRequest: false
  },
   { 
    id: 3, name: '박민수', dept: '영업팀', position: '과장', 
    salary: { annual: '54,000,000', allowances: [{ name: '식대', amount: '200,000' }, { name: '직책수당', amount: '100,000' }] },
    bankInfo: { bank: '우리은행', account: '1002-333-444444', holder: '박민수' },
    hasRequest: false
  }
])

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employees.value
  return employees.value.filter(e => e.name.includes(searchQuery.value))
})

const selectedEmployee = ref(null)

const selectEmployee = (emp) => {
  selectedEmployee.value = emp
}

const addAllowance = () => {
  if (selectedEmployee.value) {
    selectedEmployee.value.salary.allowances.push({ name: '', amount: '0' })
  }
}
const removeAllowance = (idx) => {
  selectedEmployee.value.salary.allowances.splice(idx, 1)
}
const approveAccount = (isApproved) => {
  if (!selectedEmployee.value) return
  if (isApproved) {
    const req = selectedEmployee.value.accountRequest
    selectedEmployee.value.bankInfo = { bank: req.bank, account: req.account, holder: req.holder }
    alert('계좌 변경 요청을 승인했습니다.')
  } else {
    const reason = prompt('반려 사유를 입력하세요')
    if (reason) alert('반려되었습니다.')
    else return
  }
  selectedEmployee.value.accountRequest = null
  selectedEmployee.value.hasRequest = false
}
const saveEmployeeSalary = () => {
  alert(`${selectedEmployee.value.name}님의 급여 정보가 저장되었습니다.`)
}

// --- Mock Data: Severance ---
const retirees = ref([
  { id: 99, name: '최퇴직', dept: '마케팅팀', joinDate: '2020-01-01', leaveDate: '2026-01-31', years: 6, avgWage: 3800000, severancePay: 22800000 }
])

// --- Mock Data: Settings ---
const rates = ref({
  pension: 4.5,
  health: 3.545,
  care: 12.95,
  employment: 0.9
})

</script>

<style scoped>
.admin-salary-page {
  padding: 32px; background: var(--background-gray); min-height: 100vh;
  display: flex; flex-direction: column; gap: 24px;
}
.page-header { display: flex; justify-content: space-between; align-items: center; }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--gray900); margin-bottom: 4px; }
.page-description { color: var(--gray600); font-size: 0.95rem; }

/* Tabs */
.tabs-container { display: flex; gap: 8px; border-bottom: 2px solid var(--gray200); margin-bottom: 8px; }
.tab-btn {
  padding: 12px 24px; background: none; border: none; font-size: 1rem; color: var(--gray500); cursor: pointer; font-weight: 600;
  border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s;
}
.tab-btn:hover { color: var(--gray700); }
.tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); }

.section-container { display: flex; flex-direction: column; gap: 24px; }

/* Common Card & Buttons */
.card { background: #fff; border-radius: 12px; border: 1px solid var(--gray200); box-shadow: 0 4px 6px rgba(0,0,0,0.02); padding: 24px; }
.btn-primary { background: var(--primary); color: #fff; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer; }
.btn-primary:hover { background: #4338ca; }
.btn-secondary { background: var(--gray100); color: var(--gray700); border:1px solid var(--gray300); padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer; }
.btn-warning { background: #F59E0B; color: #fff; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer; }
.btn-outline { background: #fff; color: var(--primary); border:1px solid var(--primary); padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer; }
.btn-save { background: var(--gray800); color: #fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:500; }
.btn-tiny { padding: 4px 8px; border-radius: 4px; border: none; font-size: 0.8rem; cursor: pointer; color: #fff; }
.btn-tiny.primary { background: var(--primary); }
.btn-tiny.danger { background: #EF4444; }

/* Monthly Controls */
.control-bar { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }
.control-group { display: flex; align-items: center; gap: 12px; }
.control-group label { font-weight: 600; color: var(--gray700); }
.month-input { padding: 8px 12px; border: 1px solid var(--gray300); border-radius: 6px; font-size: 1rem; }
.status-badge { padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.9rem; }
.status-badge.initial { background: #F3F4F6; color: var(--gray600); }
.status-badge.calculated { background: #E0F2FE; color: #0284C7; }
.status-badge.closed { background: #ECFDF5; color: #059669; }
.control-actions { display: flex; gap: 12px; }

/* Ledger Table */
.ledger-card .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.data-table th { background: var(--gray50); padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid var(--gray200); color: var(--gray600); }
.data-table td { padding: 12px; border-bottom: 1px solid var(--gray100); color: var(--gray800); }
.data-table th.text-right, .data-table td.text-right { text-align: right; }
.font-bold { font-weight: 700; }
.text-primary { color: var(--primary); }
.text-gray { color: var(--gray500); }
.highlight-blue { background: #EFF6FF; color: #1E40AF; }
.highlight-red { background: #FEF2F2; color: #991B1B; }
.highlight-primary { background: #EEF2FF; color: var(--primary); }
.empty-state { padding: 40px; text-align: center; color: var(--gray500); }

/* Employee Layout */
.user-salary-layout { display: flex; gap: 24px; flex-direction: row; }
.sidebar-list { flex: 0 0 280px; display: flex; flex-direction: column; max-height: 600px; overflow-y: auto; padding: 0; }
.search-box { padding: 16px; border-bottom: 1px solid var(--gray200); position: sticky; top: 0; background: #fff; z-index: 10; }
.search-box input { width: 100%; padding: 8px 12px; border: 1px solid var(--gray300); border-radius: 6px; }
.employee-list { list-style: none; padding: 0; margin: 0; }
.emp-item { padding: 16px; border-bottom: 1px solid var(--gray100); display: flex; gap: 12px; align-items: center; cursor: pointer; transition: background 0.1s; position: relative; }
.emp-item:hover { background: var(--gray50); }
.emp-item.active { background: #EEF2FF; border-left: 3px solid var(--primary); }
.emp-avatar { width: 40px; height: 40px; background: #E0E7FF; color: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.emp-info { display: flex; flex-direction: column; gap: 2px; }
.emp-name { font-weight: 600; color: var(--gray900); }
.emp-meta { font-size: 0.8rem; color: var(--gray500); }
.badge-dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; position: absolute; top: 16px; right: 16px; }

.detail-panel { flex: 1; min-height: 500px; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--gray200); }
.form-section h4 { font-size: 1rem; color: var(--gray800); margin-bottom: 16px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.form-grid.three-cols { grid-template-columns: 1fr 1fr 1fr; }
.form-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; color: var(--gray600); font-weight: 600; }
.form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid var(--gray300); border-radius: 6px; font-size: 0.95rem; }
.input-unit { position: relative; }
.input-unit input { padding-right: 32px; width: 100%; text-align: right; }
.input-unit .unit { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: var(--gray500); font-size: 0.9rem; }

.allowance-list { background: var(--gray50); padding: 16px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }
.form-group-row { display: grid; grid-template-columns: 2fr 2fr 40px; gap: 12px; align-items: center; }
.form-group-row input { padding: 8px 12px; border: 1px solid var(--gray300); border-radius: 6px; }
.btn-icon { background: none; border: none; font-size: 1.2rem; cursor: pointer; }
.btn-add-row { background: #fff; border: 1px dashed var(--gray400); padding: 8px; border-radius: 6px; width: 100%; color: var(--gray600); cursor: pointer; margin-top: 8px; }
.btn-add-row:hover { border-color: var(--gray600); color: var(--gray800); }

.bank-info-box { padding: 20px; border: 1px solid var(--gray200); border-radius: 8px; }
.bank-info-box.pending-change { border-color: #FCA5A5; background: #FEF2F2; }
.request-alert { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; border-bottom: 1px dashed #FECACA; }
.badge-pending { background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; align-self: flex-start; }
.req-actions { display: flex; gap: 8px; margin-top: 8px; }

/* Settings */
.settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.upload-box { border: 2px dashed var(--gray300); padding: 32px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 16px; color: var(--gray600); }
.action-row { margin-top: 24px; text-align: right; }

</style>
