<template>
  <div class="monthly-wrap">
    <!-- ═══ 상단: 리포트 헤더 + 요약 지표 ═══ -->
    <div class="monthly-card">
      <!-- 헤더: 월 선택 + 등급 -->
      <div class="report-header">
        <div class="report-header-left">
          <div class="month-selector">
            <button class="month-arrow" @click="prevMonth">
              <ChevronLeft :size="16" />
            </button>
            <span class="month-label">{{ currentYear }}년 {{ currentMonth }}월 성과 리포트</span>
            <button class="month-arrow" @click="nextMonth">
              <ChevronRight :size="16" />
            </button>
          </div>
          <p class="report-period">{{ currentYear }}년 {{ currentMonth }}월 1일 - {{ currentMonth }}월 {{ lastDay }}일</p>
        </div>
        <div class="report-grade-wrap">
          <div class="report-grade">S</div>
          <span class="report-grade-label">Grade</span>
        </div>
      </div>

      <!-- 요약 지표 카드 -->
      <div class="stat-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="stat-icon-wrap" :style="{ background: stat.bgColor }">
            <component :is="stat.icon" :size="16" :style="{ color: stat.iconColor }" />
          </div>
          <div class="stat-info">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ 중간: 차트 ═══ -->
    <div class="monthly-card chart-card">
      <div class="chart-header">
        <h3 class="chart-title">
          <BarChart3 :size="16" />
          월별 성과 추이 (개인 vs 팀 평균)
        </h3>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-dot blue"></span>내 점수</span>
          <span class="legend-item"><span class="legend-dot gray"></span>팀 평균</span>
        </div>
      </div>
      <div class="chart-wrap">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- ═══ 하단: 월별 상세 항목 ═══ -->
    <div class="monthly-card">
      <div class="detail-header">
        <h3 class="detail-title">
          <FileText :size="16" />
          {{ currentMonth }}월 성과 상세 항목
        </h3>
        <span class="detail-count">총 {{ detailItems.length }}건</span>
      </div>
      <div class="detail-list">
        <div v-for="item in detailItems" :key="item.id" class="detail-row">
          <div class="detail-row-left">
            <span class="badge" :class="item.type === 'team' ? 'badge-blue' : 'badge-green'">
              {{ item.type === 'team' ? '팀' : '개인' }}
            </span>
            <div class="detail-row-info">
              <span class="detail-row-title">{{ item.title }}</span>
              <span class="detail-row-date">{{ item.date }}</span>
            </div>
          </div>
          <div class="detail-row-right">
            <div class="detail-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: item.progress + '%' }"></div>
              </div>
              <span class="progress-text">{{ item.progress }}%</span>
            </div>
            <span class="detail-score">{{ item.score }}점</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { ChevronLeft, ChevronRight, BarChart3, FileText, TrendingUp, Users, Award, Star } from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const currentYear = ref(2023)
const currentMonth = ref(6)

const lastDay = computed(() => new Date(currentYear.value, currentMonth.value, 0).getDate())

function prevMonth() {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const stats = [
  { label: '업무 달성률', value: '98%', icon: TrendingUp, bgColor: '#eff6ff', iconColor: '#3b82f6' },
  { label: '협업 지수', value: '4.8', icon: Users, bgColor: '#f0fdf4', iconColor: '#22c55e' },
  { label: '성장 지수', value: 'A+', icon: Award, bgColor: '#fef3c7', iconColor: '#f59e0b' },
  { label: '종합 점수', value: '96.5', icon: Star, bgColor: '#faf5ff', iconColor: '#a855f7' },
]

const chartData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  datasets: [
    {
      label: '내 점수',
      data: [85, 92, 88, 95, 90, 98],
      backgroundColor: 'rgba(8, 145, 178, 0.85)',
      borderRadius: { topLeft: 5, topRight: 5 },
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    },
    {
      label: '팀 평균',
      data: [80, 82, 81, 83, 85, 84],
      backgroundColor: 'rgba(203, 213, 225, 0.7)',
      borderRadius: { topLeft: 5, topRight: 5 },
      barPercentage: 0.5,
      categoryPercentage: 0.6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 12, family: "'Noto Sans KR', sans-serif" }, color: '#94A3B8', padding: 8 },
    },
    y: {
      grid: { color: '#F1F5F9' },
      ticks: { font: { size: 12 }, color: '#94A3B8' },
      beginAtZero: false,
      min: 60,
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#1E293B',
      bodyColor: '#475569',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      cornerRadius: 10,
      padding: 12,
      boxPadding: 4,
    },
  },
}

const detailItems = [
  { id: 1, type: 'team', title: 'Q2 마케팅 캠페인 기획 및 실행', date: '06.01 ~ 06.15', progress: 100, score: 98 },
  { id: 2, type: 'individual', title: 'Vue 3 마이그레이션 완료', date: '06.05 ~ 06.20', progress: 100, score: 95 },
  { id: 3, type: 'team', title: '신규 고객사 온보딩 프로세스 개선', date: '06.10 ~ 06.30', progress: 85, score: 92 },
  { id: 4, type: 'individual', title: '사내 기술 세미나 발표', date: '06.18', progress: 100, score: 97 },
]
</script>

<style scoped>
/* ════════════════════════════════
   레이아웃
   ════════════════════════════════ */
.monthly-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - var(--header-h) - 80px);
}

.monthly-card {
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
}

/* ════════════════════════════════
   리포트 헤더
   ════════════════════════════════ */
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.month-arrow {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray500);
  background: var(--gray50);
  transition: all var(--transition);
}

.month-arrow:hover {
  background: var(--gray200);
  color: var(--gray700);
}

.month-label {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--gray800);
}

.report-period {
  font-size: 0.8rem;
  color: var(--gray400);
  padding-left: 40px;
}

.report-grade-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.report-grade {
  font-family: var(--font-num);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary);
  line-height: 1;
}

.report-grade-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--gray400);
}

/* ════════════════════════════════
   요약 지표
   ════════════════════════════════ */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--gray50);
  border: 1px solid var(--gray100);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}

.stat-item:hover {
  box-shadow: var(--shadow);
}

.stat-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--gray500);
  margin-bottom: 2px;
}

.stat-value {
  font-family: var(--font-num);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--gray800);
}

/* ════════════════════════════════
   차트
   ════════════════════════════════ */
.chart-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.chart-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--gray800);
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-title svg {
  color: var(--gray400);
}

.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray500);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.legend-dot.blue {
  background: var(--primary);
}

.legend-dot.gray {
  background: var(--gray300);
}

.chart-wrap {
  flex: 1;
  min-height: 260px;
}

/* ════════════════════════════════
   상세 항목
   ════════════════════════════════ */
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detail-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--gray800);
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-title svg {
  color: var(--gray400);
}

.detail-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray400);
  background: var(--gray100);
  padding: 3px 10px;
  border-radius: 10px;
}

.detail-list {
  display: flex;
  flex-direction: column;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--gray100);
  transition: all var(--transition);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row:hover {
  background: var(--gray50);
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: var(--radius-xs);
}

.detail-row-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.detail-row-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.detail-row-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--gray800);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-row-date {
  font-size: 0.72rem;
  color: var(--gray400);
  margin-top: 2px;
}

.detail-row-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.detail-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  width: 80px;
  height: 5px;
  background: var(--gray100);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--primary);
  transition: width 0.5s ease;
}

.progress-text {
  font-family: var(--font-num);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray500);
  min-width: 32px;
}

.detail-score {
  font-family: var(--font-num);
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--primary);
  min-width: 40px;
  text-align: right;
}

/* 뱃지 */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.68rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.badge-blue { background: #dbeafe; color: #1e40af; }
.badge-green { background: #dcfce7; color: #166534; }
</style>
