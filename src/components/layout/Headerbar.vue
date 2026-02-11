<template>
  <header class="header">
    <div class="header-logo" @click="$emit('navClick', '메인')">
      <div class="logo-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      </div>
      <span class="logo-text">RHight</span>
    </div>

    <nav class="header-nav">
      <div
        v-for="item in navItems"
        :key="item"
        class="nav-item"
        :class="{ active: activeNav === item }"
        @click="$emit('navClick', item)"
      >
        {{ item }}
      </div>
    </nav>

    <div class="header-right">
      <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <!-- top node -->
        <rect x="9" y="3" width="6" height="6" rx="1" />
        <!-- connector down -->
        <path d="M12 9v3" />
        <!-- connector to left/right -->
        <path d="M6 12h12" />
        <!-- down to left/right nodes -->
        <path d="M6 12v3" />
        <path d="M18 12v3" />
        <!-- left/right nodes -->
        <rect x="3" y="15" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
      </svg>

      <div class="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="검색어를 입력하세요" />
      </div>
      <div class="header-logout">
        로그아웃
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
          <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  activeNav: { type: String, default: '메인' }
})
defineEmits(['navClick'])

const navItems = ['메인', '인사', '근태', '급여', '성과', '전자결재']
</script>

<style scoped>
.header{
  position:sticky;top:0;z-index:200;height:var(--header-h);
  background:#fff;border-bottom:1px solid var(--gray200);
  display:flex;align-items:center;padding:0 24px;gap:16px;
}
.header-logo{display:flex;align-items:center;gap:8px;cursor:pointer;margin-right:16px}
.logo-icon{
  width:28px;height:28px;background:var(--primary);border-radius:8px;
  display:flex;align-items:center;justify-content:center;
}
.logo-text{font-family:var(--font-num);font-size:1.15rem;font-weight:800;color:var(--gray800)}
.header-nav{display:flex;gap:2px}
.nav-item{
  padding:7px 14px;font-size:0.92rem;font-weight:500;color:var(--gray500);
  cursor:pointer;border-bottom:2px solid transparent;transition:all var(--transition);
}
.nav-item:hover{color:var(--gray700)}
.nav-item.active{color:var(--primary);font-weight:700;border-bottom-color:var(--primary)}
.header-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.search-box{
  display:flex;align-items:center;gap:7px;
  background:var(--gray50);border:1px solid var(--gray200);border-radius:var(--radius-sm);
  padding:7px 14px;width:220px;color:var(--gray400);transition:all var(--transition);
}
.search-box:focus-within{border-color:var(--primary);box-shadow:0 0 0 3px var(--accent)}
.search-box input{
  border:none;background:transparent;font-size:0.82rem;color:var(--gray700);width:100%;
}
.search-box input::placeholder{color:var(--gray400)}
.header-icon-btn{
  width:36px;height:36px;border-radius:var(--radius-sm);
  display:flex;align-items:center;justify-content:center;
  color:var(--gray500);cursor:pointer;position:relative;
  transition:all var(--transition);
}
.header-icon-btn:hover{background:var(--gray50);color:var(--gray700)}
.badge-dot{
  position:absolute;top:6px;right:8px;width:7px;height:7px;
  background:var(--red);border-radius:50%;border:1.5px solid #fff;
}
.header-logout{
  display:flex;align-items:center;gap:5px;
  font-size:0.82rem;font-weight:500;color:var(--gray500);
  cursor:pointer;padding:6px 10px;border-radius:var(--radius-sm);
  transition:all var(--transition);
}
.header-logout:hover{background:var(--gray50);color:var(--gray700)}
</style>
