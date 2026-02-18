<template>
  <div class="stats-wrap">
    <div class="stats-header">
      <div>
        <h2 class="stats-title">부서 성과 통계</h2>
        <p class="stats-desc">팀원별 역량 분포와 주요 성과를 한눈에 파악할 수 있습니다.</p>
      </div>
      <div class="stats-header-right">
        <select class="stats-select">
          <option>2023년 2분기</option>
          <option>2023년 1분기</option>
          <option>2022년 4분기</option>
        </select>
      </div>
    </div>

    <div class="stats-body">
      <div class="c-list">
        <div v-for="member in members" :key="member.id" class="c-card">
          <div class="c-profile">
            <div class="c-avatar-wrap">
              <img :src="member.image" :alt="member.name" class="c-avatar" />
              <div class="c-score-badge">{{ member.avgScore }}</div>
            </div>
            <div class="c-info">
              <h3 class="c-name">{{ member.name }}</h3>
              <p class="c-role">{{ member.role }} · {{ member.department }}</p>
            </div>
          </div>

          <div class="c-chart">
            <Radar :data="getChartData(member)" :options="radarOptionsC" />
          </div>

          <div class="c-scores">
            <div v-for="item in member.chartData" :key="item.subject" class="c-score-row">
              <span class="c-score-label">{{ item.subject }}</span>
              <div class="c-score-bar-bg">
                <div class="c-score-bar-fill" :style="{ width: (item.A / 5) * 100 + '%' }" />
              </div>
              <span class="c-score-num">{{ item.A }}</span>
            </div>
          </div>

          <div class="c-tasks">
            <div
              v-for="task in member.tasks"
              :key="task.id"
              class="c-task-chip"
              :class="task.status === 'completed' ? 'chip-done' : 'chip-prog'"
            >
              {{ task.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

const members = [
  {
    id: 1,
    name: '김서연',
    role: 'UX Designer',
    department: '디자인팀',
    avgScore: 4.6,
    image:
      'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA1MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.5 },
      { subject: '업무태도', A: 4.8 },
      { subject: '협업능력', A: 4.2 },
      { subject: '창의성', A: 4.9 },
    ],
    tasks: [
      { id: 't1', title: '모바일 앱 메인화면 리뉴얼', date: '2023.06.20', status: 'completed', description: '사용성 개선을 위한 UX 개편' },
      { id: 't2', title: 'Q3 신규 기능 사용자 조사', date: '2023.06.15', status: 'completed', description: '타겟 유저 20명 대상 심층 인터뷰' },
      { id: 't3', title: '디자인 시스템 업데이트', date: '2023.06.30', status: 'in-progress', description: '컴포넌트 라이브러리 현행화' },
    ],
  },
  {
    id: 2,
    name: '이승주',
    role: 'Frontend Dev',
    department: '개발팀',
    avgScore: 4.5,
    image:
      'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA2MTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.8 },
      { subject: '업무태도', A: 4.5 },
      { subject: '협업능력', A: 4.7 },
      { subject: '창의성', A: 3.8 },
    ],
    tasks: [
      { id: 't4', title: '관리자 대시보드 성능 최적화', date: '2023.06.10', status: 'completed', description: 'LCP 2.5초 -> 1.2초 단축' },
      { id: 't5', title: '공통 컴포넌트 리팩토링', date: '2023.06.25', status: 'in-progress', description: '레거시 코드 제거 및 패턴 적용' },
    ],
  },
  {
    id: 3,
    name: '박준호',
    role: 'Product Manager',
    department: '기획팀',
    avgScore: 4.7,
    image:
      'https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA2MTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.2 },
      { subject: '업무태도', A: 4.9 },
      { subject: '협업능력', A: 5.0 },
      { subject: '창의성', A: 4.5 },
    ],
    tasks: [
      { id: 't6', title: 'Q3 제품 로드맵 수립', date: '2023.06.01', status: 'completed', description: '전사 목표와 연계된 전략 수립' },
      { id: 't7', title: '경쟁사 분석 리포트', date: '2023.06.18', status: 'completed', description: '주요 3사 기능 및 가격 정책' },
    ],
  },
]

const getChartData = (member) => ({
  labels: member.chartData.map((d) => d.subject),
  datasets: [{
    label: member.name,
    data: member.chartData.map((d) => d.A),
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderColor: '#06B6D4',
    borderWidth: 2,
    pointBackgroundColor: '#06B6D4',
    pointRadius: 3,
  }],
})

const radarOptionsC = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleFont: { size: 12, family: 'Noto Sans KR' },
      bodyFont: { size: 11, family: 'Noto Sans KR' },
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 5,
      ticks: { display: false, stepSize: 1 },
      grid: { color: 'rgba(8,145,178,0.08)' },
      angleLines: { color: 'rgba(8,145,178,0.08)' },
      pointLabels: { font: { size: 10, family: 'Noto Sans KR' }, color: '#64748b' },
    },
  },
}
</script>

<style scoped>
.stats-wrap { display: flex; flex-direction: column; height: 100%; min-height: 0; }
.stats-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-shrink: 0; }
.stats-header-right { display: flex; align-items: center; gap: 12px; }
.stats-title { font-size: 1.15rem; font-weight: 800; color: var(--gray800); }
.stats-desc { font-size: 0.8rem; color: var(--gray400); margin-top: 4px; }
.stats-select { padding: 8px 14px; font-size: 0.82rem; font-family: var(--font); color: var(--gray600); background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius-xs); outline: none; }
.stats-body { flex: 1; overflow-y: auto; padding-bottom: 16px; }

.c-list { display: flex; flex-direction: column; gap: 16px; }
.c-card { display: grid; grid-template-columns: 200px 160px 1fr auto; align-items: center; gap: 24px; padding: 24px 28px; background: rgba(255,255,255,0.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.6); border-radius: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.02), 0 4px 20px rgba(0,0,0,0.03); transition: all 0.25s; }
.c-card:hover { background: rgba(255,255,255,0.88); box-shadow: 0 4px 24px rgba(8,145,178,0.08); border-color: var(--accent2); }
.c-profile { display: flex; align-items: center; gap: 14px; }
.c-avatar-wrap { position: relative; flex-shrink: 0; }
.c-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.c-score-badge { position: absolute; bottom: -4px; right: -4px; width: 22px; height: 22px; border-radius: 50%; background: var(--primary); color: #fff; font-size: 0.58rem; font-weight: 800; font-family: var(--font-num); display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
.c-info { min-width: 0; }
.c-name { font-size: 0.92rem; font-weight: 700; color: var(--gray800); }
.c-role { font-size: 0.7rem; color: var(--gray400); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.c-chart { width: 160px; height: 130px; flex-shrink: 0; }
.c-scores { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 0; }
.c-score-row { display: flex; align-items: center; gap: 10px; }
.c-score-label { font-size: 0.7rem; color: var(--gray500); width: 56px; flex-shrink: 0; text-align: right; }
.c-score-bar-bg { flex: 1; height: 6px; background: var(--gray100); border-radius: 3px; overflow: hidden; }
.c-score-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--secondary), var(--primary)); transition: width 0.6s; }
.c-score-num { font-size: 0.72rem; font-weight: 700; font-family: var(--font-num); color: var(--primary); width: 28px; text-align: right; }
.c-tasks { display: flex; flex-direction: column; gap: 6px; width: 200px; flex-shrink: 0; }
.c-task-chip { padding: 5px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip-done { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
.chip-prog { background: var(--accent); color: var(--primary-dark); border: 1px solid var(--accent2); }

@media (max-width: 1200px) {
  .c-card { grid-template-columns: 1fr 1fr; }
  .c-tasks { width: auto; }
}

@media (max-width: 768px) {
  .c-card { grid-template-columns: 1fr; }
  .c-chart { width: 100%; }
  .c-tasks { width: auto; }
}
</style>
