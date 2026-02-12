<template>
  <div class="perf-dashboard">
    <!-- Top Section: Key Metrics -->
    <div class="perf-metrics">
      <!-- Metric 1 -->
      <div class="metric-card">
        <div class="metric-deco blue"></div>
        <div class="metric-body">
          <h3 class="metric-label">이번달 성과 달성</h3>
          <div class="metric-value-row">
            <span class="metric-num">20%</span>
            <span class="metric-change blue">
              <TrendingUp :size="13" /> +2.5%
            </span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill blue" style="width: 20%"></div>
          </div>
        </div>
      </div>

      <!-- Metric 2 -->
      <div class="metric-card">
        <div class="metric-deco green"></div>
        <div class="metric-body">
          <h3 class="metric-label">팀 목표 달성률</h3>
          <div class="metric-value-row">
            <span class="metric-num">20%</span>
            <span class="metric-change green">
              <Target :size="13" /> On Track
            </span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill green" style="width: 20%"></div>
          </div>
        </div>
      </div>

      <!-- Metric 3 -->
      <div class="metric-card">
        <div class="metric-deco purple"></div>
        <div class="metric-body">
          <h3 class="metric-label">분기별 팀 목표</h3>
          <div class="metric-value-row">
            <span class="metric-num">40%</span>
            <span class="metric-change purple">
              <Award :size="13" /> +5%
            </span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill purple" style="width: 40%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle Section: Monthly Trend -->
    <div class="perf-chart-card">
      <h3 class="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" /><path d="M8 18v-1" /><path d="M16 18v-3" />
        </svg>
        개인별 월별 성과 추이
      </h3>
      <div class="chart-wrap">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Bottom Section: Feedback -->
    <div class="perf-feedback-card">
      <h3 class="section-title">
        <MessageSquare :size="18" /> 최근 업무 피드백
      </h3>
      <div class="feedback-list">
        <div v-for="item in feedbacks" :key="item.id" class="feedback-item">
          <div class="feedback-head">
            <span class="feedback-author">{{ item.author }}</span>
            <span class="feedback-date">{{ item.date }}</span>
          </div>
          <p class="feedback-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, Target, Award, MessageSquare } from 'lucide-vue-next'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const chartData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  datasets: [
    {
      label: '성과',
      data: [85, 92, 88, 95, 90, 98],
      borderColor: '#3b82f6',
      borderWidth: 3,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
      tension: 0.4,
      fill: false,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 12 }, color: '#6b7280' },
    },
    y: {
      grid: { color: '#f3f4f6' },
      ticks: { font: { size: 12 }, color: '#6b7280' },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#111827',
      bodyColor: '#374151',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
    },
  },
}

const feedbacks = [
  { id: 1, text: '지난 프로젝트에서 보여준 리더십이 인상적이었습니다.', author: '김팀장', date: '2023.06.15' },
  { id: 2, text: '문서 작성 능력이 매우 탁월합니다. 꼼꼼한 처리에 감사드립니다.', author: '이과장', date: '2023.06.10' },
  { id: 3, text: '협업 시 커뮤니케이션이 원활하여 업무 진행이 빨랐습니다.', author: '박대리', date: '2023.05.28' },
]
</script>

<style scoped>
/* ── Layout: 화면 전체 채우기 ── */
.perf-dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: calc(100vh - var(--header-h) - 80px);
}

/* ── Metric Cards Row ── */
.perf-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.metric-card {
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--gray200);
  box-shadow: var(--shadow);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.metric-deco {
  position: absolute;
  right: -28px;
  top: -28px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  opacity: 0.15;
}
.metric-deco.blue { background: #3b82f6; }
.metric-deco.green { background: #22c55e; }
.metric-deco.purple { background: #a855f7; }

.metric-body { position: relative; }

.metric-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray500);
  margin-bottom: 12px;
}

.metric-value-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.metric-num {
  font-family: var(--font-num);
  font-size: 2rem;
  font-weight: 800;
  color: var(--gray800);
  line-height: 1;
}

.metric-change {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 2px;
}
.metric-change.blue { color: #3b82f6; }
.metric-change.green { color: #22c55e; }
.metric-change.purple { color: #a855f7; }

.metric-bar {
  width: 100%;
  height: 6px;
  background: var(--gray100);
  border-radius: 3px;
  margin-top: 18px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}
.metric-fill.blue { background: #3b82f6; }
.metric-fill.green { background: #22c55e; }
.metric-fill.purple { background: #a855f7; }

/* ── Chart Card: 남은 공간 채우기 ── */
.perf-chart-card {
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--gray200);
  box-shadow: var(--shadow);
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--gray800);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-shrink: 0;
}
.section-title svg { color: var(--gray400); }

.chart-wrap {
  width: 100%;
  flex: 1;
  min-height: 280px;
}

/* ── Feedback Card ── */
.perf-feedback-card {
  background: #fff;
  border-radius: var(--radius);
  border: 1px solid var(--gray200);
  box-shadow: var(--shadow);
  padding: 24px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
}

.feedback-item {
  padding: 16px;
  background: var(--gray50);
  border-radius: var(--radius-sm);
  border: 1px solid var(--gray100);
  transition: all var(--transition);
}
.feedback-item:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.feedback-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.feedback-author {
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
  background: #dbeafe;
  padding: 3px 10px;
  border-radius: 10px;
}

.feedback-date {
  font-size: 0.75rem;
  color: var(--gray400);
}

.feedback-text {
  font-size: 0.88rem;
  color: var(--gray700);
  line-height: 1.6;
}
</style>
