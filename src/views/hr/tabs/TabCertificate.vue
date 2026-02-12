<template>
  <div class="tab-certificate">
    <section class="cert-card">
      <div class="cert-card-header">
        <h3>증명서 발급</h3>
        <button class="help-btn" type="button" @click="showPolicyModal = true" aria-label="증명서 정책">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.1 9a3 3 0 1 1 4.9 2.3c-.8.6-1.2 1.1-1.2 2.2" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      </div>

      <div class="issue-grid">
        <article v-for="kind in certificateKinds" :key="kind.key" class="issue-item">
          <div class="issue-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <strong class="issue-title">{{ kind.title }}</strong>
          <p class="issue-desc">{{ kind.description }}</p>
          <button class="issue-btn" type="button" @click="openIssueModal">발급하기</button>
        </article>
      </div>
    </section>

    <section class="cert-card history-card">
      <div class="cert-card-header">
        <h3>발급 이력</h3>
      </div>

      <div class="history-table-wrap">
        <table class="history-table">
          <thead>
            <tr>
              <th>증명서 종류</th>
              <th>발급 날짜</th>
              <th>상태</th>
              <th class="col-download">다운로드</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in issueHistory" :key="record.id">
              <td class="cell-strong">{{ record.kindLabel }}</td>
              <td class="font-num">{{ record.issuedDate }}</td>
              <td>
                <span class="status-badge">{{ statusText(record.status) }}</span>
              </td>
              <td class="col-download">
                <button class="download-btn" type="button" @click="downloadCertificate(record)" aria-label="다운로드">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <BaseModal v-model="showIssueModal" width="460px">
      <div class="modal-title-row">
        <h2 class="modal-title">재직 증명서 발급</h2>
        <button class="modal-close" type="button" @click="showIssueModal = false">&times;</button>
      </div>
      <div class="modal-fields">
        <div class="modal-field">
          <label>제출처</label>
          <input v-model="issueForm.submitTo" type="text" placeholder="예: 국민은행" />
        </div>
        <div class="modal-field">
          <label>용도</label>
          <input v-model="issueForm.purpose" type="text" placeholder="예: 금융거래 목적" />
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" type="button" @click="issueCertificate">발급하기</button>
        <button class="btn-cancel" type="button" @click="showIssueModal = false">취소</button>
      </div>
    </BaseModal>

    <BaseModal v-model="showPolicyModal" width="560px">
      <div class="modal-title-row">
        <h2 class="modal-title">증명서 정책 안내</h2>
        <button class="modal-close" type="button" @click="showPolicyModal = false">&times;</button>
      </div>
      <ul class="policy-list">
        <li v-for="(line, index) in policyLines" :key="index">{{ line }}</li>
      </ul>
    </BaseModal>

    <BaseModal v-model="showPreviewModal" width="920px">
      <div class="preview-header">
        <h3>{{ previewTitle }}</h3>
        <div class="preview-actions">
          <button class="btn-print" type="button" @click="printPreview">인쇄</button>
          <button class="modal-close" type="button" @click="showPreviewModal = false">&times;</button>
        </div>
      </div>

      <div class="preview-frame">
        <div class="preview-paper">
          <h2 class="cert-main-title">재 직 증 명 서</h2>

          <div class="cert-body">
            <table class="cert-form-table">
              <tbody>
                <tr>
                  <th class="group-cell" rowspan="2">인적<br />사항</th>
                  <th>성명</th>
                  <td>{{ user.name }}</td>
                  <th>주민등록번호</th>
                  <td>{{ user.ssn }}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td colspan="3">{{ user.address }}</td>
                </tr>
              </tbody>
            </table>

            <table class="cert-form-table">
              <tbody>
                <tr>
                  <th class="group-cell" rowspan="3">재직<br />사항</th>
                  <th>소속</th>
                  <td colspan="3">{{ user.team }}</td>
                </tr>
                <tr>
                  <th>직위</th>
                  <td colspan="3">{{ user.position }}</td>
                </tr>
                <tr>
                  <th>재직기간</th>
                  <td colspan="3">{{ employmentPeriodText }}</td>
                </tr>
              </tbody>
            </table>

            <table class="cert-form-table purpose-table">
              <tbody>
                <tr>
                  <th>용도</th>
                  <td>{{ latestIssued?.purpose || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="cert-footer">
            <p class="preview-statement">위와 같이 재직하고 있음을 증명합니다.</p>
            <p class="preview-date">{{ issueDateSplit.year }} 년 {{ issueDateSplit.month }} 월 {{ issueDateSplit.day }} 일</p>

            <div class="preview-sign-area">
              <p><span>발급담당자 :</span><span>(인)</span></p>
              <p><span>직 위 :</span><span>인사담당자</span></p>
            </div>

            <p class="preview-company">R H i g h t (직인)</p>
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import {
  createHrCertificateKindsMock,
  createHrCertificateHistoryMock,
  createHrCertificatePolicyMock
} from '@/mocks/hr/certificates'

const props = defineProps({
  user: { type: Object, required: true }
})

const certificateKinds = ref(createHrCertificateKindsMock())
const issueHistory = ref(
  createHrCertificateHistoryMock().filter((record) => record.kindKey === 'employment')
)
const policyLines = ref(createHrCertificatePolicyMock())

const showIssueModal = ref(false)
const showPolicyModal = ref(false)
const showPreviewModal = ref(false)

const issueForm = reactive({
  submitTo: '',
  purpose: ''
})

const previewTitle = '재직 증명서'
const latestIssued = computed(() => issueHistory.value[0] || null)
const employmentPeriodText = computed(() => {
  const base = `${toKoreanDate(props.user.hireDate)}부터 현재 재직 중임`
  return `${base} (총 ${tenureText(props.user.hireDate)})`
})

const issueDateSplit = computed(() => {
  const raw = latestIssued.value?.issuedDate || formatToday()
  const [year = '-', month = '-', day = '-'] = String(raw).split('.')
  return { year, month, day }
})

const formatToday = () => {
  const now = new Date()
  const yyyy = String(now.getFullYear())
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

const toKoreanDate = (dateStr) => {
  if (!dateStr) return '-'
  const [year = '', month = '', day = ''] = String(dateStr).split('.')
  return `${year}년 ${month}월 ${day}일`
}

const tenureText = (hireDate) => {
  if (!hireDate) return '-'
  const [y = 0, m = 1, d = 1] = String(hireDate).split('.').map(Number)
  const from = new Date(y, (m || 1) - 1, d || 1)
  const now = new Date()
  let months = (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth())
  if (now.getDate() < from.getDate()) months -= 1
  if (months < 0) months = 0
  const years = Math.floor(months / 12)
  const restMonths = months % 12
  return `${years}년 ${restMonths}개월`
}

const resetIssueForm = () => {
  issueForm.submitTo = ''
  issueForm.purpose = ''
}

const openIssueModal = () => {
  resetIssueForm()
  showIssueModal.value = true
}

const issueCertificate = () => {
  if (!issueForm.submitTo.trim() || !issueForm.purpose.trim()) return

  const issuedDate = formatToday()
  const newRecord = {
    id: `CERT-${Date.now()}`,
    kindKey: 'employment',
    kindLabel: '재직 증명서',
    issuedDate,
    status: 'ISSUED',
    submitTo: issueForm.submitTo.trim(),
    purpose: issueForm.purpose.trim(),
    fileName: `재직증명서_${issuedDate.replaceAll('.', '')}.pdf`
  }

  issueHistory.value.unshift(newRecord)
  showIssueModal.value = false
  showPreviewModal.value = true
}

const statusText = (status) => {
  if (status === 'ISSUED') return '발급 완료'
  return '처리중'
}

const buildCertificateText = (record) => {
  return [
    `${record.kindLabel}`,
    `성명: ${props.user.name}`,
    `사번: ${props.user.empNo}`,
    `입사일: ${props.user.hireDate}`,
    `소속: ${props.user.team}`,
    `직위: ${props.user.position}`,
    `제출처: ${record.submitTo}`,
    `용도: ${record.purpose}`,
    `발급일: ${record.issuedDate}`
  ].join('\n')
}

const downloadCertificate = (record) => {
  const blob = new Blob([`\uFEFF${buildCertificateText(record)}`], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = record.fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const printPreview = () => {
  if (!latestIssued.value) return

  const previewWindow = window.open('', '_blank', 'width=900,height=980')
  if (!previewWindow) return

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <title>재직 증명서</title>
      <style>
        @page { size: A4 portrait; margin: 0; }
        * { box-sizing: border-box; }
        body {
          font-family: 'Noto Sans KR', sans-serif;
          margin: 0;
          color: #111827;
          background: #fff;
        }
        .paper {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          border: 1px solid #111827;
          padding: 18mm 16mm 14mm;
          display: flex;
          flex-direction: column;
        }
        .title {
          text-align: center;
          letter-spacing: .42em;
          margin: 0 0 18mm;
          font-size: 13mm;
          font-weight: 700;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        .form-table + .form-table { margin-top: 3.4mm; }
        th, td {
          border: 1px solid #1f2937;
          padding: 3.2mm 3mm;
          font-size: 3.6mm;
          font-weight: 500;
        }
        th {
          width: 12%;
          text-align: center;
        }
        .group {
          width: 9%;
          font-weight: 700;
          letter-spacing: .1em;
          line-height: 1.45;
        }
        .purpose th { width: 9%; }
        .footer {
          margin-top: auto;
          padding-top: 22mm;
        }
        .statement {
          text-align: right;
          margin: 0 1mm 16mm 0;
          font-size: 5.2mm;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 0.9mm;
        }
        .date {
          text-align: center;
          margin: 0 0 14mm;
          font-size: 5.5mm;
          letter-spacing: .12em;
          font-weight: 600;
        }
        .sign {
          width: 44%;
          margin-left: auto;
          display: grid;
          gap: 4.2mm;
          margin-bottom: 14mm;
        }
        .sign p {
          margin: 0;
          display: flex;
          justify-content: space-between;
          font-size: 4.6mm;
        }
        .company {
          margin: 0;
          text-align: center;
          font-size: 8mm;
          letter-spacing: .22em;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="paper">
        <h1 class="title">재 직 증 명 서</h1>

        <table class="form-table">
          <tr>
            <th class="group" rowspan="2">인적<br/>사항</th>
            <th>성명</th>
            <td>${props.user.name}</td>
            <th>주민등록번호</th>
            <td>${props.user.ssn}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td colspan="3">${props.user.address}</td>
          </tr>
        </table>

        <table class="form-table">
          <tr>
            <th class="group" rowspan="3">재직<br/>사항</th>
            <th>소속</th>
            <td colspan="3">${props.user.team}</td>
          </tr>
          <tr>
            <th>직위</th>
            <td colspan="3">${props.user.position}</td>
          </tr>
          <tr>
            <th>재직기간</th>
            <td colspan="3">${employmentPeriodText.value}</td>
          </tr>
        </table>

        <table class="form-table purpose">
          <tr>
            <th>용도</th>
            <td>${latestIssued.value.purpose}</td>
          </tr>
        </table>

        <div class="footer">
          <p class="statement">위와 같이 재직하고 있음을 증명합니다.</p>
          <p class="date">${issueDateSplit.value.year} 년 ${issueDateSplit.value.month} 월 ${issueDateSplit.value.day} 일</p>
          <div class="sign">
            <p><span>발급담당자 :</span><span>(인)</span></p>
            <p><span>직 위 :</span><span>인사담당자</span></p>
          </div>
          <p class="company">R H i g h t (직인)</p>
        </div>
      </div>
    </body>
    </html>
  `

  previewWindow.document.open()
  previewWindow.document.write(html)
  previewWindow.document.close()
  previewWindow.focus()
  setTimeout(() => {
    previewWindow.print()
    previewWindow.onafterprint = () => previewWindow.close()
  }, 150)
}
</script>

<style scoped>
.tab-certificate { margin-top: 20px; display: grid; gap: 16px; }

.cert-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.cert-card-header {
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid var(--gray100);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cert-card-header h3 {
  font-size: 1.03rem;
  font-weight: 700;
  color: var(--gray800);
}

.help-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--gray500);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.help-btn:hover { color: var(--primary); background: var(--accent); }

.issue-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  padding: 16px;
}

.issue-item {
  border: 1px solid var(--gray200);
  border-radius: 14px;
  min-height: 218px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}

.issue-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #E0F2FE;
  color: #0891B2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.issue-title {
  font-size: 1.18rem;
  color: var(--gray800);
}

.issue-desc {
  margin: 0;
  white-space: pre-line;
  color: var(--gray500);
  font-size: .85rem;
  line-height: 1.5;
}

.issue-btn {
  border: none;
  border-radius: 20px;
  background: var(--primary);
  color: #fff;
  font-size: .78rem;
  font-weight: 700;
  padding: 6px 14px;
  cursor: pointer;
}

.issue-btn:hover { background: var(--primary-dark); }

.history-card { min-height: 290px; }
.history-table-wrap { overflow-x: auto; }

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray100);
  text-align: left;
  font-size: .88rem;
}

.history-table thead th {
  color: var(--gray500);
  font-size: .8rem;
  font-weight: 600;
}

.cell-strong { font-weight: 700; color: var(--gray800); }
.col-download { text-align: right !important; }

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: #DCFCE7;
  color: #16A34A;
  font-size: .75rem;
  font-weight: 700;
}

.download-btn {
  border: none;
  background: transparent;
  color: #0EA5E9;
  cursor: pointer;
  padding: 2px;
}

.download-btn:hover { color: #0284C7; }

.modal-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gray800);
}

.modal-close {
  border: none;
  background: transparent;
  color: var(--gray400);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}

.modal-close:hover { color: var(--gray600); }

.modal-fields { display: grid; gap: 14px; }

.modal-field {
  display: grid;
  gap: 6px;
}

.modal-field label {
  font-size: .84rem;
  font-weight: 600;
  color: var(--gray600);
}

.modal-field input {
  border: 1px solid var(--gray200);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: .9rem;
  color: var(--gray700);
  outline: none;
}

.modal-field input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--accent);
}

.modal-actions {
  margin-top: 22px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-confirm,
.btn-cancel,
.btn-print {
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-confirm,
.btn-print {
  background: var(--primary);
  color: #fff;
}

.btn-confirm:hover,
.btn-print:hover { background: var(--primary-dark); }

.btn-cancel {
  background: #fff;
  color: var(--gray600);
  border: 1px solid var(--gray200);
}

.btn-cancel:hover { background: var(--gray50); }

.policy-list {
  margin: 0;
  padding-left: 20px;
  color: var(--gray700);
  display: grid;
  gap: 8px;
  font-size: .9rem;
  line-height: 1.6;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.preview-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--gray800);
}

.preview-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-frame {
  max-height: 78vh;
  overflow: auto;
  padding: 10px;
  background: #F8FAFC;
  border-radius: 8px;
}

.preview-paper {
  width: min(100%, 794px);
  aspect-ratio: 210 / 297;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #0f172a;
  padding: 58px 44px 46px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, .08);
  display: flex;
  flex-direction: column;
}

.cert-main-title {
  text-align: center;
  letter-spacing: .42em;
  font-size: 2.16rem;
  margin: 0 0 44px;
  font-weight: 700;
}

.cert-body { display: grid; gap: 10px; }

.cert-form-table {
  width: 100%;
  border-collapse: collapse;
}

.cert-form-table th,
.cert-form-table td {
  border: 1px solid #334155;
  padding: 10px 10px;
  font-size: .83rem;
  color: #0f172a;
}

.cert-form-table th {
  width: 12%;
  background: #fff;
  text-align: center;
  font-weight: 700;
}

.cert-form-table .group-cell {
  width: 9%;
  line-height: 1.44;
}

.purpose-table th { width: 9%; }

.cert-footer {
  margin-top: auto;
  padding-top: 78px;
}

.preview-statement {
  margin: 0 2px 48px 0;
  text-align: right;
  font-size: 1.18rem;
  color: #0f172a;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.preview-date {
  margin: 0 0 40px;
  text-align: center;
  font-size: 1.34rem;
  letter-spacing: .09em;
  color: #0f172a;
  font-weight: 600;
}

.preview-sign-area {
  width: 42%;
  margin-left: auto;
  display: grid;
  gap: 14px;
}

.preview-sign-area p {
  margin: 0;
  font-size: 1.04rem;
  color: #0f172a;
  display: flex;
  justify-content: space-between;
}

.preview-company {
  margin: 56px 0 0;
  text-align: center;
  font-size: 1.72rem;
  letter-spacing: .22em;
  color: #0f172a;
  font-weight: 600;
}
</style>
