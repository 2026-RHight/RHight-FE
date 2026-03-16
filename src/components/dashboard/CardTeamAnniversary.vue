<template>
  <div class="card fade-up delay-4 anniversary-card">
    <div class="card-header">
      <h3>팀 기념일</h3>
    </div>
    <div class="card-body" style="padding:8px 18px">
      <div v-if="loading">
        <div v-for="n in 3" :key="`birthday-skeleton-${n}`" class="bday-item bday-item-skeleton">
          <div class="bday-icon skeleton-block"></div>
          <div class="bday-info">
            <div class="bday-name-skeleton skeleton-block"></div>
            <div class="bday-type-skeleton skeleton-block"></div>
          </div>
          <div class="bday-right">
            <div class="bday-date-skeleton skeleton-block"></div>
            <div class="bday-dday-skeleton skeleton-block"></div>
          </div>
        </div>
      </div>
      <template v-else>
      <div v-for="item in items" :key="item.employeeId" class="bday-item">
        <div class="bday-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
          </svg>
        </div>
        <div class="bday-info">
          <div class="bday-name">{{ item.name }}</div>
          <div class="bday-type">{{ item.type }}</div>
        </div>
        <div class="bday-right">
          <div class="bday-date font-num">{{ item.date }}</div>
          <div class="bday-dday">{{ item.dday }}</div>
        </div>
      </div>
      <div v-if="!items.length" class="bday-empty">예정된 기념일이 없습니다</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getTeamBirthdays } from '@/api/hr'

const items = ref([])
const loading = ref(true)

const formatDday = (daysRemaining) => {
  if (daysRemaining === 0) return 'D-DAY'
  return `D-${daysRemaining}`
}

const loadTeamBirthdays = async () => {
  try {
    const data = await getTeamBirthdays()
    const rows = Array.isArray(data) ? data : []
    items.value = rows.map((row) => ({
      employeeId: row.employeeId,
      name: row.employeeName,
      type: '생일',
      date: row.birthday,
      dday: formatDday(Number(row.daysRemaining ?? 0)),
    }))
  } catch (error) {
    items.value = []
    console.error('팀 기념일 조회 실패:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadTeamBirthdays)
</script>

<style scoped>
.bday-item{
  display:flex;align-items:center;gap:9px;
  padding:8px 0;border-bottom:1px solid var(--gray100);
}
.bday-item:last-child{border-bottom:none}
.bday-icon{
  width:32px;height:32px;border-radius:8px;background:var(--accent);
  display:flex;align-items:center;justify-content:center;color:var(--secondary);
}
.bday-item-skeleton .bday-icon{background:none}
.bday-name-skeleton{width:62px;height:16px}
.bday-type-skeleton{width:34px;height:12px;margin-top:5px}
.bday-date-skeleton{width:52px;height:18px}
.bday-dday-skeleton{width:38px;height:14px;margin-top:4px;margin-left:auto}
.bday-info{flex:1}
.bday-name{font-size:0.85rem;font-weight:600;color:var(--gray700)}
.bday-type{font-size:0.68rem;color:var(--gray400)}
.bday-right{text-align:right}
.bday-date{font-size:0.9rem;font-weight:700;color:var(--gray800)}
.bday-dday{
  font-size:0.65rem;color:var(--gray400);background:var(--gray50);
  padding:1px 5px;border-radius:4px;display:inline-block;margin-top:1px;
}
.bday-empty{font-size:0.75rem;color:var(--gray400);text-align:center;padding:6px 0}
</style>
