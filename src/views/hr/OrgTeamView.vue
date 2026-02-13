<template>
  <div class="org-page">
    <div class="breadcrumb">인사 / 내 조직 조회</div>

    <section class="page-head">
      <div class="title-wrap">
        <h1>내 조직 조회</h1>
      </div>
      <button class="btn-search-employee" type="button" @click="goOrgChart">
        사원 찾기
      </button>
    </section>

    <section class="info-bar">
      <strong>{{ currentUser.teamName }}</strong>
      <span>팀원 {{ sortedTeamMembers.length }}명</span>
      <span v-if="canViewMemberDetail" class="permission-text">팀원 상세 조회 권한 있음</span>
    </section>

    <section class="member-grid">
      <article
        v-for="member in sortedTeamMembers"
        :key="member.employeeId"
        class="member-card"
        :class="{ clickable: canViewMemberDetail }"
        @click="openMemberDetail(member)"
      >
        <div class="profile-top">
          <div class="profile-avatar">
            <span>{{ member.profileInitial }}</span>
          </div>
          <div class="profile-head">
            <strong>{{ member.name }}</strong>
            <span class="status" :class="statusClass(member.status)">{{ member.status }}</span>
          </div>
        </div>

        <div class="member-rows">
          <div class="row"><span>내선</span><strong>{{ member.extension }}</strong></div>
          <div class="row"><span>연락처</span><strong>{{ member.phone }}</strong></div>
          <div class="row"><span>이메일</span><strong>{{ member.email }}</strong></div>
          <div class="row"><span>직책/직무/직위</span><strong>{{ member.duty }} · {{ member.job }} · {{ member.position }}</strong></div>
        </div>
      </article>
    </section>

    <BaseModal v-model="showDetailModal" width="760px">
      <div v-if="selectedMember" class="member-detail">
        <div class="detail-head">
          <div>
            <h2>{{ selectedMember.name }} 인사 정보</h2>
            <p>팀장 권한 상세 조회</p>
          </div>
          <span class="view-badge">팀장 뷰</span>
        </div>

        <div class="detail-sections">
          <section class="detail-card">
            <h3>개인 정보</h3>
            <div class="detail-row"><span>이름</span><strong>{{ selectedMember.name }}</strong></div>
            <div class="detail-row"><span>이메일</span><strong>{{ selectedMember.email }}</strong></div>
            <div class="detail-row"><span>연락처</span><strong>{{ selectedMember.phone }}</strong></div>
            <div class="detail-row"><span>내선번호</span><strong>{{ selectedMember.extension }}</strong></div>
            <div class="detail-row"><span>생년월일</span><strong>{{ selectedMember.personalInfo?.birthDate || '-' }}</strong></div>
          </section>

          <section class="detail-card">
            <h3>인사 정보</h3>
            <div class="detail-row"><span>조직</span><strong>{{ selectedMember.hrInfo?.organization || '-' }}</strong></div>
            <div class="detail-row"><span>직책/직무/직위</span><strong>{{ selectedMember.hrInfo?.dutyJobPosition || '-' }}</strong></div>
            <div class="detail-row"><span>재직 상태</span><strong>{{ selectedMember.hrInfo?.employmentStatus || '-' }}</strong></div>
            <div class="detail-row"><span>입사일</span><strong>{{ selectedMember.hrInfo?.hireDate || '-' }}</strong></div>
            <div class="detail-row"><span>근무 형태</span><strong>{{ selectedMember.hrInfo?.workType || '-' }}</strong></div>
            <div class="detail-row"><span>근무 지역</span><strong>{{ selectedMember.hrInfo?.workRegion || '-' }}</strong></div>
          </section>

          <section class="detail-card">
            <h3>역량 정보</h3>
            <div v-if="selectedMember.skills?.length" class="skill-list">
              <div v-for="(skill, idx) in selectedMember.skills" :key="`${selectedMember.employeeId}-${idx}`" class="skill-item">
                <strong>{{ skill.name }}</strong>
                <span>{{ skill.type }} · {{ skill.issuer }} · {{ skill.date }}</span>
              </div>
            </div>
            <p v-else class="empty-text">등록된 역량 정보가 없습니다.</p>
          </section>
        </div>

        <div class="detail-actions">
          <button type="button" class="btn-primary" @click="goMemberAttendance">근태</button>
          <button type="button" class="btn-primary" @click="goMemberGoal">목표</button>
          <button type="button" class="btn-ghost" @click="showDetailModal = false">닫기</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseModal from '@/components/common/BaseModal.vue'
import {
  createHrCurrentUserMock,
  createHrTeamMembersMock,
  sortMembersByRule
} from '@/mocks/hr/organization'

const router = useRouter()

const currentUser = ref(createHrCurrentUserMock())
const teamMembers = ref(createHrTeamMembersMock())

const showDetailModal = ref(false)
const selectedMember = ref(null)

const canViewMemberDetail = computed(() => currentUser.value.role === 'TEAM_LEADER')
const sortedTeamMembers = computed(() => sortMembersByRule(teamMembers.value))

const openMemberDetail = (member) => {
  if (!canViewMemberDetail.value) return
  selectedMember.value = member
  showDetailModal.value = true
}

const goOrgChart = () => {
  router.push('/hr/orgchart')
}

const goMemberAttendance = () => {
  if (!selectedMember.value) return
}

const goMemberGoal = () => {
  if (!selectedMember.value) return
}

const statusClass = (status) => {
  if (status === '정상') return 'ok'
  if (status === '재택') return 'remote'
  return 'leave'
}
</script>

<style scoped>
.org-page { max-width: 1200px; }

.breadcrumb { font-size: .78rem; color: var(--gray400); margin-bottom: 4px; }

.page-head {
  margin-top: 12px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-wrap h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--gray800);
}

.view-badge {
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: .74rem;
  font-weight: 700;
  color: #0F766E;
  background: #CCFBF1;
  display: inline-flex;
  align-items: center;
}

.btn-search-employee {
  border: 1px solid var(--primary);
  background: var(--accent);
  color: var(--primary);
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: .84rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-search-employee:hover {
  background: var(--primary);
  color: #fff;
}

.info-bar {
  margin-top: 12px;
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gray600);
  font-size: .86rem;
}

.permission-text {
  color: #0EA5E9;
  font-weight: 700;
}

.member-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.member-card {
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
}

.member-card.clickable {
  cursor: pointer;
}

.member-card.clickable:hover {
  border-color: #7DD3FC;
  box-shadow: 0 10px 24px rgba(2, 132, 199, .12);
}

.profile-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.profile-avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #A5F3FC, #0891B2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar span {
  color: #fff;
  font-weight: 800;
  font-size: .93rem;
}

.profile-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-head strong {
  font-size: 1.08rem;
  color: var(--gray800);
}

.status {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: .72rem;
  font-weight: 700;
}

.status.ok {
  background: #DCFCE7;
  color: #16A34A;
}

.status.remote {
  background: #DBEAFE;
  color: #2563EB;
}

.status.leave {
  background: #FEF3C7;
  color: #D97706;
}

.member-rows {
  display: grid;
  gap: 8px;
}

.row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 8px;
  font-size: .84rem;
}

.row span {
  color: var(--gray500);
}

.row strong {
  color: var(--gray800);
  word-break: break-word;
}

.member-detail {
  display: grid;
  gap: 14px;
}

.detail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-head h2 {
  margin: 0;
  color: var(--gray800);
  font-size: 1.32rem;
}

.detail-head p {
  margin: 4px 0 0;
  color: var(--gray500);
  font-size: .82rem;
}

.detail-sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-card {
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: 12px;
  padding: 12px;
}

.detail-card:last-child {
  grid-column: 1 / -1;
}

.detail-card h3 {
  margin: 0 0 10px;
  color: var(--gray800);
  font-size: .94rem;
}

.detail-row {
  display: grid;
  grid-template-columns: 98px minmax(0, 1fr);
  gap: 8px;
  font-size: .82rem;
  padding: 5px 0;
}

.detail-row span { color: var(--gray500); }
.detail-row strong { color: var(--gray800); word-break: break-word; }

.skill-list {
  display: grid;
  gap: 8px;
}

.skill-item {
  border: 1px solid var(--gray100);
  border-radius: 8px;
  padding: 8px;
  display: grid;
  gap: 4px;
}

.skill-item strong {
  color: var(--gray800);
  font-size: .86rem;
}

.skill-item span {
  color: var(--gray500);
  font-size: .8rem;
}

.empty-text {
  margin: 0;
  color: var(--gray400);
  font-size: .82rem;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn-primary,
.btn-ghost {
  height: 34px;
  border-radius: 10px;
  padding: 0 14px;
  font-size: .84rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary {
  border: none;
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-ghost {
  border: 1px solid var(--gray200);
  background: #fff;
  color: var(--gray600);
}

.btn-ghost:hover {
  background: var(--gray50);
}

@media (max-width: 980px) {
  .member-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .detail-sections {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
