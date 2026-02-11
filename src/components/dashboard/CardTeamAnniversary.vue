<template>
  <div class="card fade-up delay-4 anniversary-card">
    <div class="card-header">
      <h3>팀 기념일 (생일)</h3>
      <span class="add-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      </span>
    </div>
    <div class="card-body" style="padding:8px 18px">
      <div v-for="(item, i) in items" :key="i" class="bday-item">
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
      <div class="bday-empty">예정된 기념일이 없습니다</div>
    </div>
  </div>
</template>

<script setup>
const items = [
  { name: '이승주', type: '생일', date: '03.24', dday: 'D-5' },
  { name: '김서연', type: '생일', date: '03.28', dday: 'D-5' },
  { name: '팀 설립일', type: '기념일', date: '04.01', dday: 'D-5' },
]
</script>

<style scoped>
.add-icon{color:var(--gray400);cursor:pointer;display:flex}
.add-icon:hover{color:var(--primary)}
.bday-item{
  display:flex;align-items:center;gap:9px;
  padding:8px 0;border-bottom:1px solid var(--gray100);
}
.bday-item:last-child{border-bottom:none}
.bday-icon{
  width:32px;height:32px;border-radius:8px;background:var(--accent);
  display:flex;align-items:center;justify-content:center;color:var(--secondary);
}
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
