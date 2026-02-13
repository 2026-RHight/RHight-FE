<template>
  <div class="attendance-schedule">
    <!-- Header -->
    <div class="schedule-header-card">
      <div class="header-left">
        <div class="icon-calendar-rect">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div class="header-text">
          <h2 class="page-title">근무 일정</h2>
          <p class="page-desc">팀원들의 근무 일정과 휴가 현황을 확인하세요.</p>
        </div>
      </div>
      <div class="header-right">
        <div class="view-toggles">
          <button class="toggle-btn active">월간</button>
          <button class="toggle-btn">주간</button>
          <button class="toggle-btn">목록</button>
        </div>
        <button class="btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          일정 등록
        </button>
      </div>
    </div>

    <div class="content-row">
      <!-- Left Sidebar -->
      <aside class="schedule-sidebar">
        <!-- 1. Mini Calendar -->
        <div class="sidebar-card mini-cal-card">
          <div class="mini-cal-header">
            <span class="mini-cal-title">2026년 2월</span>
            <div class="mini-cal-nav">
              <button>&lt;</button>
              <button>&gt;</button>
            </div>
          </div>
          <div class="mini-cal-grid-header">
            <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
          </div>
          <div class="mini-cal-grid">
            <span class="prev-month">26</span><span class="prev-month">27</span><span class="prev-month">28</span><span class="prev-month">29</span><span class="prev-month">30</span><span class="prev-month">31</span>
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
            <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span class="today-circle">13</span><span>14</span>
            <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
            <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
          </div>
        </div>

        <!-- 2. Team Filter -->
        <div class="sidebar-card filter-card">
          <h3 class="card-subtitle">팀원 필터</h3>
          <button class="filter-icon-btn">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          </button>
          
          <div class="filter-list">
            <div class="filter-item">
              <span class="avatar-circle blue">ALL</span>
              <span class="filter-name">전체 보기</span>
            </div>
            <div class="filter-item active">
              <span class="avatar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <div class="filter-info">
                <span class="filter-name bold">Steve 매니저</span>
                <span class="filter-sub">내 일정만 보기</span>
              </div>
            </div>
            <div class="filter-item">
              <span class="avatar-circle pink">S</span>
              <span class="filter-name">Sarah 사원</span>
            </div>
          </div>
        </div>

        <!-- 3. Legend -->
        <div class="sidebar-card legend-card">
          <h3 class="card-subtitle">범례</h3>
          <ul class="legend-list">
            <li><span class="dot blue"></span>기본 근무</li>
            <li><span class="dot pink"></span>휴가/연차</li>
            <li><span class="dot purple"></span>재택 근무</li>
            <li><span class="dot red"></span>휴무일</li>
          </ul>
        </div>
      </aside>

      <!-- Main Calendar -->
      <main class="schedule-main">
        <div class="main-cal-header">
          <h2 class="cal-title">2026년 2월</h2>
          <div class="cal-nav">
            <button class="nav-btn">&lt;</button>
            <button class="nav-btn">&gt;</button>
          </div>
        </div>
        
        <div class="main-cal-grid">
          <!-- Header Row -->
          <div class="cal-row header">
            <div class="cal-col sun">일</div>
            <div class="cal-col">월</div>
            <div class="cal-col">화</div>
            <div class="cal-col">수</div>
            <div class="cal-col">목</div>
            <div class="cal-col">금</div>
            <div class="cal-col sat">토</div>
          </div>

          <!-- Week 1 -->
          <div class="cal-row">
            <div class="cal-cell sun"><span class="day-num prev">1</span></div>
            <div class="cal-cell">
              <span class="day-num">2</span>
              <div class="event-bar blue">🕒 09:00 - 18:00</div>
            </div>
            <div class="cal-cell">
              <span class="day-num">3</span>
              <div class="event-bar blue">🕒 09:00 - 18:00</div>
            </div>
            <div class="cal-cell">
              <span class="day-num">4</span>
              <div class="event-bar blue">🕒 09:00 - 18:00</div>
            </div>
            <div class="cal-cell">
              <span class="day-num">5</span>
              <div class="event-bar blue">🕒 09:00 - 18:00</div>
            </div>
            <div class="cal-cell">
              <span class="day-num">6</span>
              <div class="event-bar blue">🕒 09:00 - 18:00</div>
            </div>
            <div class="cal-cell sat">
              <span class="day-num">7</span>
            </div>
          </div>

          <!-- Week 2 -->
          <div class="cal-row">
             <div class="cal-cell sun"><span class="day-num">8</span></div>
             <div class="cal-cell">
               <span class="day-num">9</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">10</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">11</span>
               <div class="event-bar pink">🏖️ 연차</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">12</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell today">
               <span class="day-num">13</span> <span class="badge-today">Today</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell sat">
               <span class="day-num">14</span>
             </div>
          </div>

           <!-- Week 3 -->
          <div class="cal-row">
             <div class="cal-cell sun"><span class="day-num">15</span></div>
             <div class="cal-cell">
               <span class="day-num">16</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">17</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">18</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">19</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">20</span>
               <div class="event-bar purple">🏠 재택</div>
             </div>
             <div class="cal-cell sat">
               <span class="day-num">21</span>
             </div>
          </div>

          <!-- Week 4 -->
          <div class="cal-row">
             <div class="cal-cell sun"><span class="day-num">22</span></div>
             <div class="cal-cell">
               <span class="day-num">23</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">24</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">25</span>
               <div class="event-bar green">🚗 외근</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">26</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell">
               <span class="day-num">27</span>
               <div class="event-bar blue">🕒 09:00 - 18:00</div>
             </div>
             <div class="cal-cell sat">
               <span class="day-num">28</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.attendance-schedule {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - var(--header-h) - 48px);
  overflow: hidden;
}

/* Header */
.schedule-header-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray200);
}
.header-left {
  display: flex; gap: 16px; align-items: center;
}
.icon-calendar-rect {
  width: 48px; height: 48px;
  background: #EBF5FF; /* Slight blue tint */
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}
.page-title { font-size: 1.2rem; font-weight: 700; color: var(--gray900); margin-bottom: 4px; }
.page-desc { font-size: 0.9rem; color: var(--gray500); }

.header-right {
  display: flex; gap: 16px; align-items: center;
}
.view-toggles {
  display: flex; background: var(--gray50); border-radius: 6px; padding: 4px; gap: 4px;
}
.toggle-btn {
  border: none; background: transparent; padding: 6px 12px;
  font-size: 0.9rem; color: var(--gray500); cursor: pointer; border-radius: 4px;
}
.toggle-btn.active { background: #fff; color: var(--gray900); font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

.btn-add {
  display: flex; align-items: center; gap: 6px;
  background: var(--primary); color: #fff;
  border: none; padding: 8px 16px; border-radius: 8px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
}
.btn-add:hover { opacity: 0.9; }


/* Content Row */
.content-row {
  display: flex; gap: 16px;
  flex: 1;
  min-height: 0;
}

/* Sidebar */
.schedule-sidebar {
  width: 280px;
  display: flex; flex-direction: column; gap: 16px;
  overflow-y: auto;
}
.sidebar-card {
  background: #fff; border-radius: 12px; border: 1px solid var(--gray200);
  padding: 20px;
}

/* 1. Mini Calendar */
.mini-cal-card { display: flex; flex-direction: column; gap: 16px; }
.mini-cal-header { display: flex; justify-content: space-between; align-items: center; }
.mini-cal-title { font-weight: 700; font-size: 1rem; color: var(--gray900); }
.mini-cal-nav button { border: none; background: transparent; cursor: pointer; color: var(--gray500); font-size: 1rem; }
.mini-cal-grid-header, .mini-cal-grid {
  display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.8rem;
}
.mini-cal-grid-header { color: var(--gray500); margin-bottom: 8px; }
.mini-cal-grid { row-gap: 8px; }
.mini-cal-grid span { 
  display: flex; align-items: center; justify-content: center; 
  height: 28px; width: 28px; margin: 0 auto; border-radius: 50%; cursor: pointer;
  color: var(--gray800);
}
.prev-month { color: var(--gray300) !important; }
.today-circle { background: var(--primary); color: #fff !important; font-weight: 700; }

/* 2. Team Filter */
.filter-card { position: relative; }
.card-subtitle { font-size: 0.95rem; font-weight: 700; color: var(--gray800); margin-bottom: 16px; }
.filter-icon-btn { 
  position: absolute; top: 20px; right: 20px; 
  border: none; background: transparent; color: var(--gray400); cursor: pointer; 
}
.filter-list { display: flex; flex-direction: column; gap: 12px; }
.filter-item { display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 8px; cursor: pointer; }
.filter-item.active { background: var(--gray50); }
.avatar-circle {
  width: 36px; height: 36px; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; color: #fff; font-weight: 600;
}
.avatar-circle.blue { background: #3B82F6; }
.avatar-circle.pink { background: #EC4899; }
.avatar-icon {
  width: 36px; height: 36px; border-radius: 50%; background: #E5E7EB;
  display: flex; align-items: center; justify-content: center; color: var(--gray600);
}
.filter-info { display: flex; flex-direction: column; }
.filter-name { font-size: 0.9rem; color: var(--gray700); }
.filter-name.bold { font-weight: 700; color: var(--gray900); }
.filter-sub { font-size: 0.75rem; color: var(--gray500); }

/* 3. Legend */
.legend-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.legend-list li { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--gray600); }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.blue { background: #3B82F6; }
.dot.pink { background: #EC4899; }
.dot.purple { background: #A855F7; }
.dot.red { background: #EF4444; }


/* Main Calendar */
.schedule-main {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--gray200);
  display: flex; flex-direction: column;
  overflow: hidden;
}
.main-cal-header {
  padding: 20px 24px; border-bottom: 1px solid var(--gray200);
  display: flex; align-items: center; gap: 16px;
}
.cal-title { font-size: 1.4rem; font-weight: 800; color: var(--gray900); }
.cal-nav .nav-btn {
  border: 1px solid var(--gray200); background: #fff;
  width: 32px; height: 32px; border-radius: 4px;
  cursor: pointer; color: var(--gray600);
  margin-right: 4px;
}
.cal-nav .nav-btn:hover { background: var(--gray50); }

.main-cal-grid {
  flex: 1;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.cal-row { display: flex; flex: 1; border-bottom: 1px solid var(--gray100); min-height: 100px; }
.cal-row.header { 
  flex: 0 0 40px; min-height: 40px; border-bottom: 1px solid var(--gray200); background: var(--gray50);
}
.cal-col {
  flex: 1; display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 600; color: var(--gray600);
  border-right: 1px solid var(--gray100);
}
.cal-col.sun { color: var(--red); }
.cal-col.sat { color: #3B82F6; }

.cal-cell {
  flex: 1; border-right: 1px solid var(--gray100);
  padding: 8px;
  display: flex; flex-direction: column; gap: 4px;
}
.cal-cell.sun .day-num { color: var(--red); }
.cal-cell.sat .day-num { color: #3B82F6; }
.cal-cell:last-child { border-right: none; }
.day-num { font-size: 0.9rem; font-weight: 600; color: var(--gray700); margin-bottom: 4px; }
.day-num.prev { color: var(--gray300); }

.badge-today {
  display: inline-block; background: #E0F2FE; color: var(--primary);
  font-size: 0.7rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;
  margin-left: 6px; vertical-align: middle;
}

.event-bar {
  font-size: 0.75rem; padding: 4px 8px; border-radius: 4px;
  margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.event-bar.blue { background: #EFF6FF; color: #1E40AF; border: 1px solid #DBEAFE; }
.event-bar.pink { background: #FDF2F8; color: #BE185D; border: 1px solid #FCE7F3; }
.event-bar.purple { background: #FAF5FF; color: #7E22CE; border: 1px solid #F3E8FF; }
.event-bar.green { background: #ECFDF5; color: #047857; border: 1px solid #D1FAE5; }

</style>
