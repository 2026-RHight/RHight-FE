<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { templates, mockUsers, mockApprovalLine, mockReferrers } from '@/utils/approvalData';
import OrgChartModal from './components/OrgChartModal.vue';
import ConfirmModal from './components/ConfirmModal.vue';

// State
const router = useRouter();
const activeTemplate = ref('vacation');
const showTemplateMenu = ref(false);
const isModalOpen = ref(false);
const isConfirmModalOpen = ref(false);
const modalMode = ref('approval'); // 'approval' | 'referrer'
const templateSelectorRef = ref(null);

// Current User Mock
const currentUser = mockUsers.find(u => u.id === 'u1') || mockUsers[0]; // 홍길동 사원

// Document Info State
const docInfo = reactive({
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  startTime: '09:00',
  endTime: '18:00',
  vacationType: '연차',
  attachments: []
});

const approvalLine = ref([]);
const referrers = ref([]);

// Derived State
const currentTemplateName = computed(() => {
  return templates.find(t => t.id === activeTemplate.value)?.name || '기안서';
});

const currentTemplateTitle = computed(() => {
  const name = currentTemplateName.value;
  return name.split('').join(' '); // Add spaces for styling
});

const now = new Date();
const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const currentDateShort = now.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });

const contentPlaceholder = computed(() => {
  if (activeTemplate.value === 'reinstatement') return '복직 사유 및 계획을 입력하세요.';
  if (activeTemplate.value === 'leave') return '휴직 사유 및 연락처를 입력하세요.';
  return '내용을 입력하세요.\n\n1. 사유:\n2. 비상 연락망:\n3. 인수인계 사항:';
});

const vacationTypes = ['연차', '반차', '병가', '기타'];

const calculateDays = computed(() => {
    if (!docInfo.startDate || !docInfo.endDate) return 0;
    const start = new Date(docInfo.startDate);
    const end = new Date(docInfo.endDate);
    const diff = end - start;
    if (diff < 0) return 0;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
});

// Methods
const loadTestData = () => {
    approvalLine.value = [...mockApprovalLine];
    referrers.value = [...mockReferrers];
    docInfo.title = `${currentTemplateName.value} - ${currentUser.name}`;
    if(['vacation', 'flexible', 'leave'].includes(activeTemplate.value)) {
        docInfo.startDate = currentDate;
        docInfo.endDate = currentDate;
    }
};

const handleClickOutside = (event) => {
    if (templateSelectorRef.value && !templateSelectorRef.value.contains(event.target)) {
        showTemplateMenu.value = false;
    }
};

// Initialize with test data
onMounted(() => {
    loadTestData();
    window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
});

const selectTemplate = (id) => {
  activeTemplate.value = id;
  showTemplateMenu.value = false;
  // Reset fields if needed
  loadTestData(); // Re-load basic data for new template
};

const openModal = (mode) => {
  modalMode.value = mode;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleModalConfirm = (selectedUsers) => {
  if (modalMode.value === 'approval') {
    approvalLine.value = selectedUsers;
  } else {
    referrers.value = selectedUsers;
  }
};

const tempSave = () => {
  alert('임시 저장되었습니다.\n(임시 보관함으로 이동합니다)');
};

const submitApproval = () => {
  if (!docInfo.title) return alert('제목을 입력해주세요.');
  if (approvalLine.value.length === 0) {
      if(!confirm('결재선이 지정되지 않았습니다. 계속 진행하시겠습니까?')) return;
  }
  
  isConfirmModalOpen.value = true;
};

const finalizeSubmission = () => {
  alert(`[${currentTemplateName.value}] 기안이 상신되었습니다.\n결재 현황 페이지로 이동합니다.`);
  router.push('/approval');
};

</script>

<template>
  <div class="draft-container">
    <!-- Top Toolbar -->
    <header class="toolbar">
      <div class="toolbar-left">
        <h2>기안 작성</h2>
        <div class="divider"></div>
        <div class="template-selector" ref="templateSelectorRef">
          <button class="template-btn" @click.stop="showTemplateMenu = !showTemplateMenu">
            <span class="icon">📄</span>
            {{ currentTemplateName }}
            <span class="arrow">▼</span>
          </button>
          <div v-if="showTemplateMenu" class="dropdown-menu">
            <div 
              v-for="tpl in templates" 
              :key="tpl.id" 
              class="dropdown-item"
              @click="selectTemplate(tpl.id)"
            >
              {{ tpl.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-secondary" @click="tempSave">임시저장</button>
        <button class="btn btn-primary" @click="submitApproval">상신</button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="content-area">
      <div class="paper">
        <!-- Title -->
        <div class="doc-header">
          <h1>{{ currentTemplateTitle }}</h1>
        </div>

        <!-- Info Area: Drafter & Approval Line -->
        <div class="info-section">
          <!-- Drafter Info -->
          <table class="info-table drafter-table">
            <tbody>
              <tr>
                <td class="label">기안자</td>
                <td>{{ currentUser.name }}</td>
              </tr>
              <tr>
                <td class="label">소속</td>
                <td>{{ currentUser.department }}</td>
              </tr>
              <tr>
                <td class="label">기안일</td>
                <td>{{ currentDate }}</td>
              </tr>
              <tr>
                <td class="label">문서번호</td>
                <td class="text-gray">자동채번</td>
              </tr>
            </tbody>
          </table>

          <!-- Approval Line -->
          <div class="approval-line-container">
            <!-- Drafter (Fixed) -->
            <div class="approval-box">
              <div class="box-header">기안</div>
              <div class="box-content">
                <div class="signature">
                  <!-- Layer 1: Stamp (Background) - Drafter has a stamp for demo -->
                  <div class="real-stamp">
                    <div class="stamp-inner" :class="{ 'vertical': currentUser.name.length === 3, 'grid-2x2': currentUser.name.length === 4 }">
                        <span class="char" v-for="(c, idx) in currentUser.name" :key="idx">{{ c }}</span>
                    </div>
                  </div>
                  <!-- Layer 2: Text (Foreground) -->
                  <div class="signature-text">
                    <span class="name">{{ currentUser.name }}</span>
                  </div>
                </div>
              </div>
              <div class="box-date">{{ currentDateShort }}</div>
            </div>

            <!-- Approvers -->
            <div 
              v-for="(approver, index) in approvalLine" 
              :key="approver.id" 
              class="approval-box"
            >
              <div class="box-header">결재자 {{ index + 1 }}</div>
              <div class="box-content">
                <div class="signature">
                  <!-- Empty for now as requested -->
                  <div class="signature-text">
                    <span class="name">{{ approver.name }}</span>
                    <span class="position">{{ approver.position }}</span>
                  </div>
                </div>
              </div>
              <div class="box-date"></div> <!-- Empty for pending approvers -->
            </div>

            <!-- Add Button -->
            <div class="approval-box add-box" @click="openModal('approval')">
              <div class="box-header">결재선</div>
              <div class="box-content add-btn">
                <span>+</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Referrers Section -->
         <div class="referrer-section" v-if="referrers.length > 0">
            <span class="section-label">참조:</span>
            <div class="referrer-list">
                <span v-for="refItem in referrers" :key="refItem.id" class="referrer-tag">
                    {{ refItem.name }} ({{ refItem.position }})
                </span>
            </div>
             <button class="btn-xs" @click="openModal('referrer')">수정</button>
         </div>
         <div class="referrer-section" v-else>
            <span class="section-label">참조:</span>
            <button class="btn-xs" @click="openModal('referrer')"> + 참조자 추가</button>
         </div>

        <!-- Document Body Form -->
        <table class="form-table">
          <tbody>
            <tr>
              <td class="label">제목</td>
              <td>
                <input 
                  type="text" 
                  v-model="docInfo.title" 
                  placeholder="제목을 입력하세요" 
                  class="input-full"
                />
              </td>
            </tr>
            <tr v-if="['vacation', 'leave', 'reinstatement'].includes(activeTemplate)">
              <td class="label">기간</td>
              <td class="date-range">
                <div class="datetime-input">
                  <input type="date" v-model="docInfo.startDate" class="input-date" />
                  <input type="time" v-model="docInfo.startTime" class="input-time" />
                </div>
                <span v-if="activeTemplate !== 'reinstatement'">~</span>
                <div class="datetime-input" v-if="activeTemplate !== 'reinstatement'">
                  <input type="date" v-model="docInfo.endDate" class="input-date" />
                  <input type="time" v-model="docInfo.endTime" class="input-time" />
                </div>
                <span class="hint" v-if="docInfo.startDate && docInfo.endDate && activeTemplate !== 'reinstatement'">
                  (총 {{ calculateDays }}일)
                </span>
              </td>
            </tr>
            <tr v-if="activeTemplate === 'vacation'">
               <td class="label">휴가 종류</td>
               <td>
                 <div class="radio-group">
                   <label v-for="type in vacationTypes" :key="type">
                     <input type="radio" v-model="docInfo.vacationType" :value="type" />
                     {{ type }}
                   </label>
                 </div>
               </td>
            </tr>
             <tr>
              <td class="label">내용</td>
              <td class="content-cell">
                <textarea 
                  v-model="docInfo.content" 
                  class="textarea-full" 
                  :placeholder="contentPlaceholder"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Attachments -->
        <div class="attachments-area">
          <span class="label">첨부파일</span>
          <button class="btn-sm">파일 찾기</button>
          <span class="hint">파일을 마우스로 끌어놓으세요.</span>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <OrgChartModal 
      :is-open="isModalOpen"
      :mode="modalMode"
      :initial-selection="modalMode === 'approval' ? approvalLine : referrers"
      @close="closeModal"
      @confirm="handleModalConfirm"
    />

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="isConfirmModalOpen"
      title="상신 확인"
      message="선택하신 결재선으로 기안서를 상신하시겠습니까?"
      confirm-text="상신"
      @close="isConfirmModalOpen = false"
      @confirm="finalizeSubmission"
    />
  </div>
</template>

<style scoped>
/* Reset & Layout */
.draft-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 부모(main-content) 높이를 채움 */
  background-color: #f5f7fa;
  overflow: hidden;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #e1e4e8;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.divider {
  width: 1px;
  height: 16px;
  background: #ddd;
}

.template-selector {
  position: relative;
}

.template-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.template-btn:hover {
  background: #f8f9fa;
  border-color: #c0c4cc;
}

.icon {
  font-size: 1rem;
}

.arrow {
  font-size: 0.7rem;
  color: #666;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 160px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f0f7ff;
  color: #0066cc;
}

.toolbar-right {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: white;
  border: 1px solid #ddd;
  color: #555;
}

.btn-secondary:hover {
  background: #f8f9fa;
  color: #333;
}

.btn-primary {
  background: #0066cc;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 102, 204, 0.2);
}

.btn-primary:hover {
  background: #0052a3;
  transform: translateY(-1px);
}

/* Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  display: flex;
  justify-content: center;
}

.paper {
  width: 900px; /* A4-ish width */
  min-height: 1000px;
  background: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #e1e4e8;
  padding: 60px;
}

/* Document Header */
.doc-header {
  text-align: center;
  margin-bottom: 50px;
}

.doc-header h1 {
  font-family: serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 12px;
  text-decoration-thickness: 2px;
  text-decoration-color: #ddd;
  margin: 0;
}

/* Info Section (Drafter & Approval Line) */
.info-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;
}

.info-table {
  border-collapse: collapse;
  width: 320px;
  font-size: 0.85rem;
}

.info-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.info-table .label {
  background: #f3f3f3;
  font-weight: 600;
  width: 90px;
}

.text-gray {
  color: #999;
}

/* Approval Line Boxes */
.approval-line-container {
  display: flex;
  gap: 4px;
}

.approval-box {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 90px;
}

.box-header {
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 0;
}

.box-content {
  flex: 1;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.signature {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
}

.signature-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-align: center;
  pointer-events: none;
}

.signature-text .name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111;
  z-index: 2;
}

.signature-text .position {
  font-size: 0.75rem;
  color: #666;
  z-index: 2;
}

/* Real Seal Style Stamp */
.real-stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-3deg);
  width: 46px;
  height: 58px;
  border: 1.5px solid rgba(207, 19, 34, 0.6); /* Slightly transparent border */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(207, 19, 34, 0.03);
  user-select: none;
  pointer-events: none;
  z-index: 1;
}

.real-stamp.pending {
    opacity: 0.1;
    filter: grayscale(0.8);
}

.stamp-inner {
  width: 85%;
  height: 85%;
  display: flex;
}

/* 3 characters: Vertical stack */
.stamp-inner.vertical {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2px 0;
}
.stamp-inner.vertical .char {
    font-size: 0.85rem;
    height: 33%;
}

/* 4 characters: 2x2 grid */
.stamp-inner.grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.stamp-inner.grid-2x2 .char {
    font-size: 0.95rem;
}

.stamp-inner .char {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Gungsuh', 'GungsuhChe', 'Batang', serif;
  font-weight: 800;
  color: #cf1322;
  line-height: 1;
  transform: scaleY(1.1);
}

.box-date {
  border-top: 1px solid #ccc;
  background: #fafafa;
  font-size: 0.7rem;
  text-align: center;
  color: #666;
  padding: 2px 0;
}

.add-box {
  cursor: pointer;
}
.add-box .box-content:hover {
  background: #f9f9f9;
}
.add-btn {
  font-size: 1.5rem;
  color: #ccc;
}
.add-box:hover .add-btn {
  color: #0066cc;
}

/* Referrer Section */
.referrer-section {
    margin-bottom: 20px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
}
.section-label { font-weight: 600; color: #555; }
.referrer-list { display: flex; gap: 8px; flex-wrap: wrap; }
.referrer-tag {
    background: white;
    border: 1px solid #ddd;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    color: #333;
}
.btn-xs {
    padding: 2px 8px;
    font-size: 0.8rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px;
}

/* Form Table */
.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.form-table td {
  border: 1px solid #ccc;
  padding: 12px;
}

.form-table .label {
  background: #f3f3f3;
  font-weight: 600;
  width: 120px;
  text-align: center;
}

.input-full {
  width: 100%;
  border: none;
  outline: none;
  font-size: 0.95rem;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.datetime-input {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.datetime-input:focus-within {
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.input-date, .input-time {
  border: none;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
  color: #333;
  background: transparent;
}

.input-date {
  width: 155px;
}

.input-time {
  width: 145px;
  border-left: 1px solid #eee;
}

.hint {
  font-size: 0.85rem;
  color: #0066cc;
  font-weight: 500;
  margin-left: 5px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  accent-color: #0066cc;
}

.content-cell {
  height: 400px;
  vertical-align: top;
}

.textarea-full {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Attachments */
.attachments-area {
  border: 1px solid #ccc;
  background: #f9f9f9;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.attachments-area .label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.btn-sm {
  padding: 4px 12px;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-sm:hover {
  background: #eee;
}

</style>
