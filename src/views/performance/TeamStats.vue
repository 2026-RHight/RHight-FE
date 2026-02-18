<template>
  <div class="stats-wrap">
    <!-- 헤더 -->
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

    <!-- ═══ A: 소프트 카드 ═══ -->
    <div v-if="currentDesign === 'A'" class="stats-body">
      <div class="a-grid">
        <div v-for="member in members" :key="member.id" class="a-card">
          <div class="a-card-top">
            <img :src="member.image" :alt="member.name" class="a-avatar" />
            <div class="a-info">
              <h3 class="a-name">{{ member.name }}</h3>
              <p class="a-role">{{ member.role }} · {{ member.department }}</p>
            </div>
            <div class="a-score-ring">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="#e2e8f0" stroke-width="3" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="#0891B2" stroke-width="3" stroke-linecap="round" :stroke-dasharray="`${(member.avgScore / 5) * 113} 113`" transform="rotate(-90 22 22)" />
              </svg>
              <span class="a-score-num">{{ member.avgScore }}</span>
            </div>
          </div>
          <div class="a-card-body">
            <div class="a-chart"><Radar :data="getChartData(member, 'A')" :options="radarOptionsA" /></div>
            <div class="a-tasks">
              <div v-for="task in member.tasks" :key="task.id" class="a-task">
                <div class="a-task-dot" :class="task.status === 'completed' ? 'dot-done' : 'dot-prog'" />
                <div class="a-task-content">
                  <span class="a-task-name">{{ task.title }}</span>
                  <span class="a-task-meta">{{ task.description }} · {{ task.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ B: 컬러 세로형 ═══ -->
    <div v-else-if="currentDesign === 'B'" class="stats-body">
      <div class="b-grid">
        <div v-for="member in members" :key="member.id" class="b-card">
          <div class="b-accent-bar" />
          <div class="b-profile">
            <img :src="member.image" :alt="member.name" class="b-avatar" />
            <h3 class="b-name">{{ member.name }}</h3>
            <p class="b-role">{{ member.role }}</p>
            <p class="b-dept">{{ member.department }}</p>
            <div class="b-score">
              <span class="b-score-label">평균</span>
              <span class="b-score-value">{{ member.avgScore }}</span>
              <span class="b-score-max">/ 5.0</span>
            </div>
          </div>
          <div class="b-chart"><Radar :data="getChartData(member, 'B')" :options="radarOptionsB" /></div>
          <div class="b-divider" />
          <div class="b-tasks">
            <h4 class="b-tasks-title">주요 성과</h4>
            <div v-for="task in member.tasks" :key="task.id" class="b-task">
              <span class="b-task-badge" :class="task.status === 'completed' ? 'badge-done' : 'badge-prog'">{{ task.status === 'completed' ? '완료' : '진행' }}</span>
              <span class="b-task-name">{{ task.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ C: 글래스 리스트 ═══ -->
    <div v-else-if="currentDesign === 'C'" class="stats-body">
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
          <div class="c-chart"><Radar :data="getChartData(member, 'C')" :options="radarOptionsC" /></div>
          <div class="c-scores">
            <div v-for="item in member.chartData" :key="item.subject" class="c-score-row">
              <span class="c-score-label">{{ item.subject }}</span>
              <div class="c-score-bar-bg"><div class="c-score-bar-fill" :style="{ width: (item.A / 5) * 100 + '%' }" /></div>
              <span class="c-score-num">{{ item.A }}</span>
            </div>
          </div>
          <div class="c-tasks">
            <div v-for="task in member.tasks" :key="task.id" class="c-task-chip" :class="task.status === 'completed' ? 'chip-done' : 'chip-prog'">{{ task.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ D: 다크 프리미엄 ═══ -->
    <div v-else-if="currentDesign === 'D'" class="stats-body">
      <div class="d-grid">
        <div v-for="member in members" :key="member.id" class="d-card">
          <!-- 배경 그라데이션 오버레이 -->
          <div class="d-card-bg" />
          <div class="d-card-inner">
            <div class="d-top">
              <img :src="member.image" :alt="member.name" class="d-avatar" />
              <div class="d-info">
                <h3 class="d-name">{{ member.name }}</h3>
                <p class="d-role">{{ member.role }}</p>
              </div>
              <div class="d-score">
                <span class="d-score-num">{{ member.avgScore }}</span>
                <span class="d-score-label">평점</span>
              </div>
            </div>
            <div class="d-middle">
              <div class="d-chart"><Radar :data="getChartData(member, 'D')" :options="radarOptionsD" /></div>
              <div class="d-bars">
                <div v-for="item in member.chartData" :key="item.subject" class="d-bar-row">
                  <span class="d-bar-label">{{ item.subject }}</span>
                  <div class="d-bar-track">
                    <div class="d-bar-fill" :style="{ width: (item.A / 5) * 100 + '%' }" />
                  </div>
                  <span class="d-bar-num">{{ item.A }}</span>
                </div>
              </div>
            </div>
            <div class="d-bottom">
              <div v-for="task in member.tasks" :key="task.id" class="d-task">
                <span class="d-task-status" :class="task.status === 'completed' ? 'st-done' : 'st-prog'">{{ task.status === 'completed' ? '완료' : '진행' }}</span>
                <span class="d-task-title">{{ task.title }}</span>
                <span class="d-task-date">{{ task.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ E: 매거진 레이아웃 ═══ -->
    <div v-else-if="currentDesign === 'E'" class="stats-body">
      <div class="e-list">
        <div v-for="(member, idx) in members" :key="member.id" class="e-card" :class="{ 'e-card-reverse': idx % 2 === 1 }">
          <!-- 이미지 + 오버레이 영역 -->
          <div class="e-visual">
            <img :src="member.image" :alt="member.name" class="e-photo" />
            <div class="e-overlay">
              <h3 class="e-overlay-name">{{ member.name }}</h3>
              <p class="e-overlay-role">{{ member.role }} · {{ member.department }}</p>
              <div class="e-overlay-score">{{ member.avgScore }}<span>/5</span></div>
            </div>
          </div>
          <!-- 콘텐츠 영역 -->
          <div class="e-content">
            <div class="e-content-top">
              <h3 class="e-content-name">{{ member.name }} <span>성과 리포트</span></h3>
              <div class="e-chart"><Radar :data="getChartData(member, 'E')" :options="radarOptionsE" /></div>
            </div>
            <div class="e-stat-grid">
              <div v-for="item in member.chartData" :key="item.subject" class="e-stat">
                <span class="e-stat-value">{{ item.A }}</span>
                <span class="e-stat-label">{{ item.subject }}</span>
              </div>
            </div>
            <div class="e-task-wrap">
              <div v-for="task in member.tasks" :key="task.id" class="e-task">
                <div class="e-task-line" :class="task.status === 'completed' ? 'line-done' : 'line-prog'" />
                <div class="e-task-body">
                  <span class="e-task-title">{{ task.title }}</span>
                  <span class="e-task-desc">{{ task.description }}</span>
                </div>
                <span class="e-task-date">{{ task.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const currentDesign = ref('C')

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

const getChartData = (member, design) => {
  const colorMap = {
    A: { bg: 'rgba(8, 145, 178, 0.12)', border: '#0891B2' },
    B: { bg: 'rgba(99, 102, 241, 0.12)', border: '#6366f1' },
    C: { bg: 'rgba(8, 145, 178, 0.08)', border: '#06B6D4' },
    D: { bg: 'rgba(56, 189, 248, 0.15)', border: '#38bdf8' },
    E: { bg: 'rgba(244, 114, 182, 0.12)', border: '#f472b6' },
  }
  const c = colorMap[design] || colorMap.A
  return {
    labels: member.chartData.map((d) => d.subject),
    datasets: [{
      label: member.name,
      data: member.chartData.map((d) => d.A),
      backgroundColor: c.bg,
      borderColor: c.border,
      borderWidth: 2,
      pointBackgroundColor: c.border,
      pointRadius: 3,
    }],
  }
}

const baseRadarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: '#1e293b', titleFont: { size: 12, family: 'Noto Sans KR' }, bodyFont: { size: 11, family: 'Noto Sans KR' }, padding: 10, cornerRadius: 8 },
  },
}

const makeRadarOpts = (gridColor, labelColor) => ({
  ...baseRadarOptions,
  scales: { r: { beginAtZero: true, max: 5, ticks: { display: false, stepSize: 1 }, grid: { color: gridColor }, angleLines: { color: gridColor }, pointLabels: { font: { size: 10, family: 'Noto Sans KR' }, color: labelColor } } },
})

const radarOptionsA = makeRadarOpts('#f1f5f9', '#94a3b8')
const radarOptionsB = makeRadarOpts('#e0e7ff', '#6366f1')
const radarOptionsC = makeRadarOpts('rgba(8,145,178,0.08)', '#64748b')
const radarOptionsD = makeRadarOpts('rgba(255,255,255,0.08)', 'rgba(255,255,255,0.5)')
const radarOptionsE = makeRadarOpts('rgba(244,114,182,0.1)', '#94a3b8')
</script>

<style scoped>
/* ════════════════════════════════
   공통
   ════════════════════════════════ */
.stats-wrap { display: flex; flex-direction: column; height: 100%; min-height: 0; }

.stats-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-shrink: 0; }
.stats-header-right { display: flex; align-items: center; gap: 12px; }
.stats-title { font-size: 1.15rem; font-weight: 800; color: var(--gray800); }
.stats-desc { font-size: 0.8rem; color: var(--gray400); margin-top: 4px; }
.stats-select { padding: 8px 14px; font-size: 0.82rem; font-family: var(--font); color: var(--gray600); background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius-xs); outline: none; }
.stats-body { flex: 1; overflow-y: auto; padding-bottom: 16px; }

.design-switcher { display: flex; background: var(--gray100); border-radius: var(--radius-xs); padding: 3px; gap: 2px; }
.design-btn { padding: 6px 14px; font-size: 0.75rem; font-weight: 600; color: var(--gray500); background: transparent; border-radius: 6px; transition: all var(--transition); }
.design-btn:hover { color: var(--gray700); }
.design-btn.active { background: #fff; color: var(--primary); box-shadow: 0 1px 4px rgba(0,0,0,0.06); }

/* ════════════════════════════════
   A: 소프트 카드
   ════════════════════════════════ */
.a-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.a-card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
.a-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.05); }
.a-card-top { display: flex; align-items: center; gap: 14px; padding: 20px 24px; }
.a-avatar { width: 48px; height: 48px; border-radius: 14px; object-fit: cover; }
.a-info { flex: 1; }
.a-name { font-size: 0.95rem; font-weight: 700; color: var(--gray800); }
.a-role { font-size: 0.72rem; color: var(--gray400); margin-top: 2px; }
.a-score-ring { position: relative; width: 44px; height: 44px; flex-shrink: 0; }
.a-score-ring svg { width: 100%; height: 100%; }
.a-score-num { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; font-family: var(--font-num); color: var(--primary); }
.a-card-body { display: flex; padding: 0 24px 20px; gap: 20px; }
.a-chart { width: 160px; height: 160px; flex-shrink: 0; }
.a-tasks { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.a-task { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; background: var(--gray50); border-radius: 10px; transition: background var(--transition); }
.a-task:hover { background: var(--accent); }
.a-task-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
.dot-done { background: var(--green); }
.dot-prog { background: var(--primary); }
.a-task-content { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.a-task-name { font-size: 0.8rem; font-weight: 600; color: var(--gray700); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.a-task-meta { font-size: 0.68rem; color: var(--gray400); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 1200px) { .a-grid { grid-template-columns: 1fr; } }

/* ════════════════════════════════
   B: 컬러 세로형
   ════════════════════════════════ */
.b-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.b-card { background: #fff; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s; }
.b-card:hover { box-shadow: 0 8px 30px rgba(99,102,241,0.1); }
.b-accent-bar { height: 4px; background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa); }
.b-profile { text-align: center; padding: 24px 20px 16px; }
.b-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 3px solid #fff; box-shadow: 0 4px 16px rgba(99,102,241,0.15); margin-bottom: 12px; }
.b-name { font-size: 1rem; font-weight: 700; color: var(--gray800); }
.b-role { font-size: 0.75rem; color: var(--gray500); margin-top: 2px; }
.b-dept { font-size: 0.68rem; color: var(--gray400); margin-top: 1px; }
.b-score { display: inline-flex; align-items: baseline; gap: 4px; margin-top: 12px; padding: 6px 16px; background: linear-gradient(135deg, #eef2ff, #e0e7ff); border-radius: 20px; }
.b-score-label { font-size: 0.68rem; color: #6366f1; font-weight: 500; }
.b-score-value { font-size: 1.15rem; font-weight: 800; font-family: var(--font-num); color: #4f46e5; }
.b-score-max { font-size: 0.68rem; color: #a5b4fc; }
.b-chart { padding: 8px 24px; height: 180px; }
.b-divider { height: 1px; margin: 0 20px; background: linear-gradient(90deg, transparent, #e0e7ff, transparent); }
.b-tasks { padding: 16px 20px 20px; flex: 1; }
.b-tasks-title { font-size: 0.7rem; font-weight: 700; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
.b-task { display: flex; align-items: center; gap: 8px; padding: 8px 0; }
.b-task + .b-task { border-top: 1px solid #f8fafc; }
.b-task-badge { font-size: 0.6rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; flex-shrink: 0; }
.b-task-badge.badge-done { background: #dcfce7; color: #166534; }
.b-task-badge.badge-prog { background: #eef2ff; color: #4f46e5; }
.b-task-name { font-size: 0.78rem; color: var(--gray700); font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 1200px) { .b-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .b-grid { grid-template-columns: 1fr; } }

/* ════════════════════════════════
   C: 글래스 리스트
   ════════════════════════════════ */
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
@media (max-width: 1200px) { .c-card { grid-template-columns: 1fr 1fr; } .c-tasks { width: auto; } }
@media (max-width: 768px) { .c-card { grid-template-columns: 1fr; } .c-chart { width: 100%; } .c-tasks { width: auto; } }

/* ════════════════════════════════
   D: 다크 프리미엄
   어두운 배경, 네온 포인트, 세련된 느낌
   ════════════════════════════════ */
.d-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }

.d-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.d-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.3);
}

.d-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  z-index: 0;
}

.d-card-inner {
  position: relative;
  z-index: 1;
  padding: 24px;
}

.d-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.d-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(56,189,248,0.3);
  box-shadow: 0 0 20px rgba(56,189,248,0.15);
}

.d-info { flex: 1; }
.d-name { font-size: 0.95rem; font-weight: 700; color: #f1f5f9; }
.d-role { font-size: 0.72rem; color: #64748b; margin-top: 2px; }

.d-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(56,189,248,0.1);
  border: 1px solid rgba(56,189,248,0.2);
  border-radius: 12px;
  padding: 8px 16px;
}
.d-score-num { font-size: 1.2rem; font-weight: 800; font-family: var(--font-num); color: #38bdf8; }
.d-score-label { font-size: 0.6rem; color: #64748b; margin-top: 1px; }

.d-middle {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.d-chart { width: 140px; height: 140px; flex-shrink: 0; }

.d-bars { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
.d-bar-row { display: flex; align-items: center; gap: 10px; }
.d-bar-label { font-size: 0.68rem; color: #64748b; width: 52px; flex-shrink: 0; text-align: right; }
.d-bar-track { flex: 1; height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
.d-bar-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #0ea5e9, #38bdf8); transition: width 0.6s; }
.d-bar-num { font-size: 0.7rem; font-weight: 700; font-family: var(--font-num); color: #38bdf8; width: 24px; text-align: right; }

.d-bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 16px;
}

.d-task {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  transition: background var(--transition);
}
.d-task:hover { background: rgba(255,255,255,0.06); }

.d-task-status {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;
}
.st-done { background: rgba(34,197,94,0.15); color: #4ade80; }
.st-prog { background: rgba(56,189,248,0.15); color: #38bdf8; }

.d-task-title { flex: 1; font-size: 0.78rem; color: #cbd5e1; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.d-task-date { font-size: 0.65rem; font-family: var(--font-num); color: #475569; flex-shrink: 0; }

@media (max-width: 1200px) { .d-grid { grid-template-columns: 1fr; } }

/* ════════════════════════════════
   E: 매거진 레이아웃
   사진 + 오버레이, 좌우 교차 배치
   ════════════════════════════════ */
.e-list { display: flex; flex-direction: column; gap: 20px; }

.e-card {
  display: flex;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: box-shadow 0.25s;
  min-height: 280px;
}
.e-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
.e-card-reverse { flex-direction: row-reverse; }

.e-visual {
  width: 240px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.e-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.e-card:hover .e-photo { transform: scale(1.05); }

.e-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}
.e-overlay-name { font-size: 1.1rem; font-weight: 800; color: #fff; }
.e-overlay-role { font-size: 0.72rem; color: rgba(255,255,255,0.7); margin-top: 2px; }
.e-overlay-score { margin-top: 8px; font-size: 1.6rem; font-weight: 800; font-family: var(--font-num); color: #f472b6; }
.e-overlay-score span { font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.5); }

.e-content { flex: 1; padding: 24px; display: flex; flex-direction: column; min-width: 0; }

.e-content-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.e-content-name { font-size: 1rem; font-weight: 700; color: var(--gray800); }
.e-content-name span { font-weight: 400; color: var(--gray400); margin-left: 4px; }
.e-chart { width: 120px; height: 100px; flex-shrink: 0; }

.e-stat-grid {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.e-stat {
  flex: 1;
  text-align: center;
  padding: 12px 8px;
  background: linear-gradient(135deg, #fdf2f8, #fce7f3);
  border-radius: 10px;
}
.e-stat-value { display: block; font-size: 1.1rem; font-weight: 800; font-family: var(--font-num); color: #ec4899; }
.e-stat-label { display: block; font-size: 0.65rem; color: #9ca3af; margin-top: 2px; }

.e-task-wrap { display: flex; flex-direction: column; gap: 8px; flex: 1; }

.e-task {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}
.e-task + .e-task { border-top: 1px solid var(--gray100); }

.e-task-line {
  width: 3px;
  height: 32px;
  border-radius: 2px;
  flex-shrink: 0;
}
.line-done { background: var(--green); }
.line-prog { background: #f472b6; }

.e-task-body { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.e-task-title { font-size: 0.82rem; font-weight: 600; color: var(--gray700); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.e-task-desc { font-size: 0.68rem; color: var(--gray400); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.e-task-date { font-size: 0.65rem; font-family: var(--font-num); color: var(--gray400); flex-shrink: 0; }

@media (max-width: 900px) {
  .e-card, .e-card-reverse { flex-direction: column; }
  .e-visual { width: 100%; height: 200px; }
}
</style>
