<template>
  <div class="mypage">
    <!-- 브레드크럼 -->
    <div class="breadcrumb">인사 / 마이페이지</div>

    <!-- 프로필 헤더 -->
    <div class="profile-header">
      <div class="profile-left">
        <div class="profile-avatar">
          <span class="avatar-text">{{ user.name.slice(-2) }}</span>
          <span class="status-dot online"></span>
        </div>
        <div class="profile-info">
          <div class="profile-name-row">
            <span class="profile-name">{{ user.name }}</span>
            <span class="status-badge">정상 근무</span>
          </div>
          <div class="profile-dept">{{ user.team }} · {{ user.jobTitle }} · {{ user.position }}</div>
          <div class="profile-contacts">
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg> {{ user.email }}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> {{ user.phone }}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="5" width="12" height="14" rx="2"/><rect x="11.5" y="8" width="7" height="2.5" rx="0.6"/><path d="M5.2 6.5h1.9a1.9 1.9 0 011.9 1.9v7.2a1.9 1.9 0 01-1.9 1.9H5.2A1.7 1.7 0 013.5 15.8V8.2A1.7 1.7 0 015.2 6.5z"/><circle cx="12.4" cy="13.1" r="0.45" fill="currentColor" stroke="none"/><circle cx="15.1" cy="13.1" r="0.45" fill="currentColor" stroke="none"/><circle cx="17.8" cy="13.1" r="0.45" fill="currentColor" stroke="none"/><circle cx="12.4" cy="15.7" r="0.45" fill="currentColor" stroke="none"/><circle cx="15.1" cy="15.7" r="0.45" fill="currentColor" stroke="none"/><circle cx="17.8" cy="15.7" r="0.45" fill="currentColor" stroke="none"/></svg> {{ user.extension }}</span>
            <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> {{ user.workLocation }}</span>
          </div>
        </div>
      </div>
      <div class="profile-right">
        <div class="last-login">최근 로그인: {{ user.lastLogin }}</div>
      </div>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tab-menu">
      <div
          v-for="tab in tabs" :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
      >{{ tab.label }}</div>
    </div>

    <!-- 탭 컨텐츠 -->
    <TabInfo v-if="activeTab === 'info'" :user="user" />
    <!-- 추후 탭 추가 -->
    <div v-else class="tab-placeholder">{{ activeTabLabel }} 탭은 준비 중입니다.</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabInfo from './tabs/TabInfo.vue'

const activeTab = ref('info')
const tabs = [
  { key: 'info', label: '정보' },
  { key: 'salary', label: '급여' },
  { key: 'history', label: '인사 히스토리' },
  { key: 'certificate', label: '증명서' },
]

const activeTabLabel = computed(() => tabs.find(t => t.key === activeTab.value)?.label)

// 더미 유저 데이터 (추후 API 교체)
const user = ref({
  name: '김세현',
  team: '모바일1팀',
  jobTitle: '백엔드 개발자',
  position: '팀장',
  email: 'sehyun.kim@rhight.co.kr',
  phone: '010-1234-5678',
  extension: '1042',
  workLocation: '서울 강남',
  lastLogin: '2026.02.09 09:12',
  empNo: '2402040001',
  birthDate: '1995.03.28',
  address: '서울시 강남구 테헤란로 123 어딘가 아파트 101동 202호',
  ssn: '950328-1******',
  bankAccount: '신한 110-****-****890',
  // 인사정보
  orgPosition: '모바일1팀 · 팀장',
  jobRole: '백엔드 개발자 · 사무직',
  rank: '과장 · 3호봉',
  status: '재직',
  hireDate: '2024.02.04',
  tenure: '2년 0개월',
  workType: '정규직',
  workRegion: '서울 강남',
  hireType: '경력',
  // 경력사항
  careers: [
    { company: 'RHight', role: '백엔드 개발자 · 모바일1팀', period: '2024.02 ~ 재직중', duration: '2년 0개월' },
    { company: '네이버', role: '서버 개발자 · 플랫폼개발팀', period: '2021.03 ~ 2024.01', duration: '2년 11개월' },
    { company: '카카오', role: '백엔드 개발자 · 서비스개발팀', period: '2019.07 ~ 2021.02', duration: '1년 8개월' },
  ],
  // 역량정보
  skills: [
    { type: '자격증', name: '정보처리기사', issuer: '한국산업인력공단', date: '2023.06', status: '유효' },
    { type: '어학', name: 'TOEIC 920', issuer: 'ETS', date: '2024.01', status: '유효' },
    { type: '자격증', name: 'SQLD', issuer: '한국데이터산업진흥원', date: '2023.09', status: '유효' },
  ],
})
</script>

<style scoped>
.mypage{max-width:1200px}
.breadcrumb{font-size:.78rem;color:var(--gray400);margin-bottom:4px}

/* 프로필 헤더 */
.profile-header{display:flex;justify-content:space-between;align-items:flex-start;padding:24px;background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--glass-border);border-radius:var(--radius);box-shadow:var(--shadow);margin:12px 0 0}
.profile-left{display:flex;gap:16px;align-items:center}
.profile-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#99F6E4,#0891B2);display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0}
.avatar-text{font-size:1.1rem;font-weight:700;color:#fff}
.status-dot{position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;border:2.5px solid #fff}
.status-dot.online{background:#22C55E}
.profile-name-row{display:flex;align-items:center;gap:8px}
.profile-name{font-size:1.2rem;font-weight:700;color:var(--gray800)}
.status-badge{font-size:.7rem;font-weight:600;padding:3px 10px;border-radius:20px;background:#ECFDF5;color:#059669}
.profile-dept{font-size:.85rem;color:var(--gray500);margin:2px 0 8px}
.profile-contacts{display:flex;gap:16px;flex-wrap:wrap}
.profile-contacts span{display:flex;align-items:center;gap:4px;font-size:.78rem;color:var(--gray500)}
.profile-contacts svg{color:var(--gray400)}
.profile-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.last-login{font-size:.75rem;color:var(--gray400)}

/* 탭 메뉴 */
.tab-menu{display:flex;gap:0;border-bottom:2px solid var(--gray200);margin:24px 0 0}
.tab-item{padding:10px 20px;font-size:.88rem;font-weight:500;color:var(--gray500);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .15s}
.tab-item:hover{color:var(--gray700)}
.tab-item.active{color:var(--primary);font-weight:700;border-bottom-color:var(--primary)}

.tab-placeholder{padding:60px 0;text-align:center;color:var(--gray400);font-size:.92rem}
</style>
