<template>
  <div class="tab-history">
    <div class="filter-bar">
      <button class="filter-icon" type="button" aria-label="필터">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
        </svg>
      </button>
      <button
        v-for="filter in filters"
        :key="filter.key"
        type="button"
        class="filter-chip"
        :class="{ active: activeFilter === filter.key }"
        @click="activeFilter = filter.key"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="history-grid">
      <section class="history-card">
        <div class="card-header"><h3>인사 변경 이력</h3></div>
        <div class="history-list">
          <button
            v-for="item in filteredHistory"
            :key="item.hr_event_id"
            type="button"
            class="history-item"
            :class="{ active: selectedEventId === item.hr_event_id }"
            @click="selectedEventId = item.hr_event_id"
          >
            <div class="item-row top">
              <div class="item-title-wrap">
                <span class="type-tag">{{ item.event_type }}</span>
                <strong class="item-title">{{ item.event_title }}</strong>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <div class="item-meta">
              <span>적용일: {{ item.effective_from }}</span>
            </div>
            <div class="item-row bottom">
              <span class="change-value">{{ item.before_value }} -> {{ item.after_value }}</span>
              <span class="status-tag" :class="statusClass(item.event_status)">
                {{ statusText(item.event_status) }}
              </span>
            </div>
          </button>

          <div v-if="filteredHistory.length === 0" class="empty-history">
            해당 조건의 히스토리가 없습니다.
          </div>
        </div>
      </section>

      <section class="history-card">
        <div class="card-header"><h3>상세 정보</h3></div>

        <div v-if="selectedEvent" class="detail-rows">
          <div class="detail-top">
            <span class="type-tag">{{ selectedEvent.event_type }}</span>
            <strong class="detail-title">{{ selectedEvent.event_title }}</strong>
          </div>

          <div class="detail-row"><span>적용일</span><strong>{{ selectedEvent.effective_from }}</strong></div>
          <div class="detail-row"><span>변경 전</span><strong>{{ selectedEvent.before_value }}</strong></div>
          <div class="detail-row"><span>변경 후</span><strong>{{ selectedEvent.after_value }}</strong></div>
          <div class="detail-row"><span>기간</span><strong>{{ selectedEvent.start_date }} ~ {{ selectedEvent.effective_to || '현재' }}</strong></div>
          <div class="detail-row"><span>변경 사유</span><strong>{{ selectedEvent.reason }}</strong></div>
          <div class="detail-row">
            <span>처리 상태</span>
            <strong>
              <span class="status-tag" :class="statusClass(selectedEvent.event_status)">
                {{ statusText(selectedEvent.event_status) }}
              </span>
            </strong>
          </div>
          <template v-if="selectedEvent.event_type === '재직 상태'">
            <div class="detail-row"><span>요청일시</span><strong>{{ selectedEvent.requested_at }}</strong></div>
            <div class="detail-row"><span>승인일시</span><strong>{{ selectedEvent.approved_at || '-' }}</strong></div>
          </template>
        </div>

        <div v-else class="detail-empty">
          <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </svg>
          <p>히스토리 항목을 선택해주세요</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { createHrEventsMock } from '@/mocks/hr/hrEvents'

const props = defineProps({
  employeeId: { type: String, required: true }
})

const filters = [
  { key: 'all', label: '전체', types: [] },
  { key: 'rank', label: '직급', types: ['직급'] },
  { key: 'status', label: '재직 상태', types: ['재직 상태'] },
  { key: 'assignment', label: '발령', types: ['발령'] }
]

const activeFilter = ref('all')
const selectedEventId = ref(null)
const normalizeDate = (value) => Number(String(value ?? '').replaceAll('.', '')) || 0
const hrEvents = ref(createHrEventsMock())

const employeeEvents = computed(() => {
  return hrEvents.value
    .filter((item) => item.employee_id === props.employeeId)
      .sort((a, b) => normalizeDate(b.start_date) - normalizeDate(a.start_date))
})

const filteredHistory = computed(() => {
  const filter = filters.find((item) => item.key === activeFilter.value)
  if (!filter || filter.key === 'all') return employeeEvents.value
  return employeeEvents.value.filter((item) => filter.types.includes(item.event_type))
})

watch(filteredHistory, (list) => {
  if (!list.some((item) => item.hr_event_id === selectedEventId.value)) {
    selectedEventId.value = null
  }
})

const selectedEvent = computed(() => {
  return filteredHistory.value.find((item) => item.hr_event_id === selectedEventId.value) || null
})

const statusText = (status) => {
  if (status === 'APPROVED') return '완료'
  if (status === 'REJECTED') return '반려'
  return '진행중'
}

const statusClass = (status) => {
  if (status === 'APPROVED') return 'done'
  if (status === 'REJECTED') return 'rejected'
  return 'pending'
}
</script>

<style scoped>
.tab-history { margin-top: 20px; }

.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.filter-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--gray500);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.filter-chip {
  height: 32px;
  padding: 0 14px;
  border: none;
  border-radius: 10px;
  background: var(--gray100);
  color: var(--gray600);
  font-size: .84rem;
  font-weight: 600;
  cursor: pointer;
}

.filter-chip.active {
  background: var(--primary);
  color: #fff;
}

.history-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
}

.history-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.card-header {
  height: 58px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--gray100);
}

.card-header h3 {
  font-size: 1.06rem;
  font-weight: 700;
  color: var(--gray800);
}

.history-list {
  max-height: 492px;
  overflow-y: auto;
}

.history-item {
  width: 100%;
  text-align: left;
  border: none;
  background: #fff;
  border-bottom: 1px solid var(--gray100);
  padding: 14px 16px;
  min-height: 123px;
  cursor: pointer;
}

.history-item:hover { background: #F8FAFC; }
.history-item.active { background: #E6F6F9; }

.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-title-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.item-title {
  font-size: 1.03rem;
  font-weight: 700;
  color: var(--gray800);
}

.type-tag {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: .74rem;
  font-weight: 700;
  color: #0891B2;
  background: #E0F2FE;
}

.item-meta {
  margin-top: 8px;
  display: flex;
  gap: 14px;
  color: var(--gray500);
  font-size: .82rem;
  font-weight: 600;
  font-family: var(--font-num);
}

.item-row.bottom { margin-top: 8px; }

.change-value {
  color: var(--gray800);
  font-size: .97rem;
  font-weight: 700;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: .75rem;
  font-weight: 700;
}

.status-tag.done {
  color: #16A34A;
  background: #DCFCE7;
}

.status-tag.pending {
  color: #D97706;
  background: #FEF3C7;
}

.status-tag.rejected {
  color: #DC2626;
  background: #FEE2E2;
}

.detail-empty {
  min-height: 492px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #CBD5E1;
}

.detail-empty p {
  color: var(--gray400);
  font-size: .94rem;
  font-weight: 600;
}

.detail-rows {
  padding: 14px 16px;
  min-height: 492px;
}

.detail-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.detail-title {
  font-size: 1.03rem;
  font-weight: 700;
  color: var(--gray800);
}

.detail-row {
  display: flex;
  align-items: center;
  min-height: 47px;
  border-bottom: 1px solid var(--gray100);
}

.detail-row span {
  flex: 0 0 110px;
  color: var(--gray500);
  font-size: .85rem;
}

.detail-row strong {
  color: var(--gray800);
  font-size: .94rem;
  font-family: var(--font-num);
}

.empty-history {
  min-height: 492px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray400);
  font-size: .9rem;
}

@media (max-width: 1200px) {
  .history-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
