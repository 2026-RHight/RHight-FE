<template>
  <div class="paper">
    <div class="doc-header">
      <h1>{{ formalTitle }}</h1>
    </div>

    <div class="info-section">
      <table class="info-table drafter-table">
        <tbody>
          <tr>
            <td class="label">기안자</td>
            <td>{{ item.drafter || '-' }}</td>
          </tr>
          <tr>
            <td class="label">소속</td>
            <td>{{ item.department || '-' }}</td>
          </tr>
          <tr>
            <td class="label">기안일</td>
            <td>{{ (item.date || item.draftDate || '').split(' ')[0] || '-' }}</td>
          </tr>
          <tr>
            <td class="label">문서번호</td>
            <td class="text-gray">{{ item.id || '-' }}</td>
          </tr>
        </tbody>
      </table>

      <div class="approval-line-container">
        <div
          v-for="(step, index) in (item.approvalLine || [])"
          :key="index"
          class="approval-box"
        >
          <div class="box-header">{{ index === 0 ? '기안' : `결재자 ${index}` }}</div>
          <div class="box-content">
            <div class="signature">
              <div v-if="step.status === '승인' || step.status === '기안' || step.status === '확인'" class="real-stamp">
                <div class="stamp-inner" :class="{ 'vertical': (step.name || '').length === 3, 'grid-2x2': (step.name || '').length === 4 }">
                  <span class="char" v-for="(c, idx) in (step.name || '')" :key="idx">{{ c }}</span>
                </div>
              </div>
              <div class="signature-text">
                <span class="name">{{ step.name }}</span>
                <span class="position">{{ step.position }}</span>
              </div>
            </div>
          </div>
          <div class="box-date">{{ step.date && step.date !== '-' ? formatShortDate(step.date) : '' }}</div>
        </div>
      </div>
    </div>

    <div v-if="item.referrers && item.referrers.length > 0" class="referrer-section">
      <span class="section-label">참조:</span>
      <div class="referrer-list">
        <span v-for="(refItem, idx) in item.referrers" :key="idx" class="referrer-tag">
          {{ refItem }}
        </span>
      </div>
    </div>

    <table class="form-table">
      <tbody>
        <tr>
          <td class="label">제목</td>
          <td class="value-cell">{{ item.title || '-' }}</td>
        </tr>
        <tr>
          <td class="label">카테고리</td>
          <td class="value-cell">{{ item.category || item.templateName || '-' }}</td>
        </tr>
        <tr v-if="item.startDate || item.endDate">
          <td class="label">기간</td>
          <td class="value-cell">
            {{ item.startDate }} {{ item.startTime }} ~ {{ item.endDate }} {{ item.endTime }}
          </td>
        </tr>
        <tr>
          <td class="label">내용</td>
          <td class="content-cell">
            <div class="content-text">{{ item.content || '상세 본문 데이터가 없습니다.' }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="item.attachments && item.attachments.length > 0" class="attachments-area">
      <span class="label">첨부파일</span>
      <div class="file-list">
        <span v-for="file in item.attachments" :key="file" class="file-tag">📄 {{ file }}</span>
      </div>
    </div>

    <div v-if="isRejectedStatus && item.rejectReason" class="reject-display">
      <div class="reject-title">반려 사유</div>
      <div class="reject-text">{{ item.rejectReason }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const isRejectedStatus = computed(() => {
  return props.item.status === '반려' || props.item.status === '諛섎젮';
});

const formalTitle = computed(() => {
  const category = props.item.category || props.item.templateName || '기안서';
  let title = category;
  if (category === '휴가 신청서') title = '연가 신청서';
  else if (category === '기안서') title = '기안서';
  else if (category === '품의서') title = '품의서';
  else if (category === '보고서') title = '보고서';

  return title.split('').join('  ');
});

const formatShortDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[1]}. ${parts[2]}.`;
  }
  return dateStr;
};
</script>

<style scoped>
.paper {
  width: 100%;
  background: white;
  padding: 40px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
}

.doc-header h1 {
  font-family: serif;
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  text-decoration: underline;
  text-underline-offset: 10px;
  text-decoration-thickness: 2px;
  text-decoration-color: #ddd;
  margin: 0;
}

.info-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.info-table {
  border-collapse: collapse;
  width: 280px;
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
  width: 80px;
}

.text-gray {
  color: #666;
}

.approval-line-container {
  display: flex;
  gap: 4px;
}

.approval-box {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 85px;
}

.box-header {
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 0;
}

.box-content {
  flex: 1;
  min-height: 70px;
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
  height: 70px;
}

.signature-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-align: center;
}

.signature-text .name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111;
}

.signature-text .position {
  font-size: 0.7rem;
  color: #666;
}

.real-stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-3deg);
  width: 42px;
  height: 54px;
  border: 1.2px solid rgba(207, 19, 34, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(207, 19, 34, 0.02);
  z-index: 1;
}

.stamp-inner {
  width: 85%;
  height: 85%;
  display: flex;
}

.stamp-inner.vertical {
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.stamp-inner.grid-2x2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.stamp-inner .char {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: serif;
  font-weight: 800;
  color: #cf1322;
  line-height: 1;
}

.box-date {
  border-top: 1px solid #ccc;
  background: #fafafa;
  font-size: 0.65rem;
  text-align: center;
  color: #666;
  padding: 1px 0;
}

.referrer-section {
  margin-bottom: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.section-label { font-weight: 600; color: #555; }
.referrer-list { display: flex; gap: 6px; flex-wrap: wrap; }
.referrer-tag {
  background: white;
  border: 1px solid #e1e4e8;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #444;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.form-table td {
  border: 1px solid #ccc;
  padding: 10px 15px;
}

.form-table .label {
  background: #f3f3f3;
  font-weight: 600;
  width: 100px;
  text-align: center;
}

.value-cell {
  background: white;
}

.content-cell {
  height: 300px;
  vertical-align: top;
}

.content-text {
  line-height: 1.6;
  white-space: pre-wrap;
  color: #333;
}

.attachments-area {
  border: 1px solid #ccc;
  background: #f9f9f9;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
}

.attachments-area .label {
  font-weight: 600;
  color: #555;
}

.file-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.file-tag {
  background: white;
  border: 1px solid #ddd;
  padding: 2px 8px;
  border-radius: 4px;
}

.reject-display {
  margin-top: 20px;
  padding: 15px;
  background: #fff1f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}

.reject-title {
  font-weight: 800;
  color: #dc2626;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.reject-text {
  color: #b91c1c;
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>
