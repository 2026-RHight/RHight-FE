<template>
  <div class="manual-upload">
    <section class="card header">
      <h1>업무 메뉴얼 업로드</h1>
      <p>직접 작성 또는 PDF 자동작성 중 하나를 선택하세요.</p>
    </section>

    <section class="card content">
      <div class="mode-switch">
        <button :class="{ active: mode === 'write' }" @click="mode = 'write'">직접 작성</button>
        <button :class="{ active: mode === 'pdf' }" @click="mode = 'pdf'">PDF 업로드</button>
      </div>

      <div class="form">
        <label>제목</label>
        <input v-model="title" type="text" placeholder="제목 입력" />

        <label>카테고리</label>
        <select v-model="category">
          <option value="">선택</option>
          <option v-for="item in kmsCategories" :key="item.key" :value="item.key">{{ item.name }}</option>
        </select>

        <template v-if="mode === 'write'">
          <label>내용</label>
          <textarea v-model="content" rows="8" placeholder="업무 메뉴얼 내용을 입력하세요." />
        </template>
        <template v-else>
          <label>PDF</label>
          <input type="file" accept=".pdf" />
        </template>
      </div>
    </section>

    <section class="card permissions">
      <h2>접근 권한 설정</h2>
      <p class="help">조직도 기준으로 팀/사용자를 선택해 열람·수정·삭제 권한을 구성합니다.</p>

      <div class="permission-card">
        <div class="permission-head">
          <strong>열람 권한</strong>
          <div class="scope-switch">
            <label><input v-model="readScope" type="radio" value="team" /> 팀 단위</label>
            <label><input v-model="readScope" type="radio" value="team-user" /> 팀 + 특정 사용자</label>
            <label><input v-model="readScope" type="radio" value="user" /> 특정 사용자</label>
          </div>
        </div>
        <div class="permission-body">
          <div v-if="readScope !== 'user'" class="picker-col">
            <div class="label-row">
              <label>팀 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openTeamPicker('read')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('team', 'read')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="readTeamChips.length === 0" class="empty-chip">선택된 팀이 없습니다.</p>
              <button
                v-for="chip in readTeamChips"
                :key="chip.id"
                type="button"
                class="chip team"
                @click="removeTarget('team', 'read', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
          <div v-if="readScope !== 'team'" class="picker-col">
            <div class="label-row">
              <label>사용자 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openMemberPicker('read')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('user', 'read')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="readUserChips.length === 0" class="empty-chip">선택된 사용자가 없습니다.</p>
              <button
                v-for="chip in readUserChips"
                :key="chip.id"
                type="button"
                class="chip user"
                @click="removeTarget('user', 'read', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="permission-card">
        <div class="permission-head">
          <strong>수정 권한</strong>
          <div class="scope-switch">
            <label><input v-model="editScope" type="radio" value="team" /> 팀 단위</label>
            <label><input v-model="editScope" type="radio" value="team-user" /> 팀 + 특정 사용자</label>
            <label><input v-model="editScope" type="radio" value="user" /> 특정 사용자</label>
          </div>
        </div>
        <div class="permission-body">
          <div v-if="editScope !== 'user'" class="picker-col">
            <div class="label-row">
              <label>팀 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openTeamPicker('edit')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('team', 'edit')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="editTeamChips.length === 0" class="empty-chip">선택된 팀이 없습니다.</p>
              <button
                v-for="chip in editTeamChips"
                :key="chip.id"
                type="button"
                class="chip team"
                @click="removeTarget('team', 'edit', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
          <div v-if="editScope !== 'team'" class="picker-col">
            <div class="label-row">
              <label>사용자 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openMemberPicker('edit')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('user', 'edit')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="editUserChips.length === 0" class="empty-chip">선택된 사용자가 없습니다.</p>
              <button
                v-for="chip in editUserChips"
                :key="chip.id"
                type="button"
                class="chip user"
                @click="removeTarget('user', 'edit', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="permission-card">
        <div class="permission-head">
          <strong>삭제 권한</strong>
          <div class="scope-switch">
            <label><input v-model="deleteScope" type="radio" value="team" /> 팀 단위</label>
            <label><input v-model="deleteScope" type="radio" value="team-user" /> 팀 + 특정 사용자</label>
            <label><input v-model="deleteScope" type="radio" value="user" /> 특정 사용자</label>
          </div>
        </div>
        <div class="permission-body">
          <div v-if="deleteScope !== 'user'" class="picker-col">
            <div class="label-row">
              <label>팀 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openTeamPicker('delete')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('team', 'delete')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="deleteTeamChips.length === 0" class="empty-chip">선택된 팀이 없습니다.</p>
              <button
                v-for="chip in deleteTeamChips"
                :key="chip.id"
                type="button"
                class="chip team"
                @click="removeTarget('team', 'delete', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
          <div v-if="deleteScope !== 'team'" class="picker-col">
            <div class="label-row">
              <label>사용자 선택 (조직도)</label>
              <div class="inline-actions">
                <button type="button" class="pick-btn" @click="openMemberPicker('delete')">조직도 선택</button>
                <button type="button" class="ghost-btn" @click="clearTargets('user', 'delete')">초기화</button>
              </div>
            </div>
            <div class="selected-box">
              <p v-if="deleteUserChips.length === 0" class="empty-chip">선택된 사용자가 없습니다.</p>
              <button
                v-for="chip in deleteUserChips"
                :key="chip.id"
                type="button"
                class="chip user"
                @click="removeTarget('user', 'delete', chip.id)"
              >
                {{ chip.label }} <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="permissions-footer">
        <button class="save-btn" @click="handleUpload">업로드</button>
      </div>
    </section>

    <EmployeePickerModal
      v-model="showTeamPicker"
      select-mode="team"
      :multiple="true"
      :initial-selected-ids="currentTeamPickerIds"
      @select-team-list="handlePickedTeamList"
    />
    <EmployeePickerModal
      v-model="showMemberPicker"
      :multiple="true"
      :initial-selected-ids="currentMemberPickerIds"
      @select-member-list="handlePickedMemberList"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import EmployeePickerModal from '@/components/org/EmployeePickerModal.vue'
import { kmsCategories } from '@/mocks/kms'
import { createHrOrgTreeMock, sortMembersByRule } from '@/mocks/hr/organization'

const mode = ref('write')
const title = ref('')
const category = ref('')
const content = ref('')
const readScope = ref('team')
const editScope = ref('team-user')
const deleteScope = ref('team-user')
const readTeams = ref([])
const readUsers = ref([])
const editTeams = ref([])
const editUsers = ref([])
const deleteTeams = ref([])
const deleteUsers = ref([])
const showTeamPicker = ref(false)
const showMemberPicker = ref(false)
const pickerPermissionTarget = ref('read')

const orgRoot = createHrOrgTreeMock()

const flattenTeams = (node, trail = [], acc = []) => {
  if (!node) return acc
  const nextTrail = [...trail, node.name]
  if (node.type === '팀') {
    acc.push({ id: node.id, name: node.name, label: nextTrail.join(' > ') })
  }
  ;(node.children || []).forEach((child) => flattenTeams(child, nextTrail, acc))
  return acc
}

const flattenMembers = (node, currentTeamName = '', acc = []) => {
  if (!node) return acc
  const teamName = node.type === '팀' ? node.name : currentTeamName
  sortMembersByRule(node.members || []).forEach((member) => {
    acc.push({ employeeId: member.employeeId, name: member.name, teamName, nodeId: node.id })
  })
  ;(node.children || []).forEach((child) => flattenMembers(child, teamName, acc))
  return acc
}

const teamOptions = flattenTeams(orgRoot)
const memberOptions = flattenMembers(orgRoot)
const teamLabelMap = computed(() => Object.fromEntries(teamOptions.map((team) => [team.id, team.label])))
const memberLabelMap = computed(() => Object.fromEntries(memberOptions.map((member) => [member.employeeId, `${member.name} (${member.teamName || '-'})`])))

const teamRefMap = {
  read: readTeams,
  edit: editTeams,
  delete: deleteTeams
}

const userRefMap = {
  read: readUsers,
  edit: editUsers,
  delete: deleteUsers
}

const toTeamChips = (ids) => ids.map((id) => ({ id, label: teamLabelMap.value[id] || id }))
const toUserChips = (ids) => ids.map((id) => ({ id, label: memberLabelMap.value[id] || id }))

const readTeamChips = computed(() => toTeamChips(readTeams.value))
const readUserChips = computed(() => toUserChips(readUsers.value))
const editTeamChips = computed(() => toTeamChips(editTeams.value))
const editUserChips = computed(() => toUserChips(editUsers.value))
const deleteTeamChips = computed(() => toTeamChips(deleteTeams.value))
const deleteUserChips = computed(() => toUserChips(deleteUsers.value))

const openTeamPicker = (permission) => {
  pickerPermissionTarget.value = permission
  showTeamPicker.value = true
}

const openMemberPicker = (permission) => {
  pickerPermissionTarget.value = permission
  showMemberPicker.value = true
}

const currentTeamPickerIds = computed(() => [...teamRefMap[pickerPermissionTarget.value].value])
const currentMemberPickerIds = computed(() => [...userRefMap[pickerPermissionTarget.value].value])

const handlePickedTeamList = (teams) => {
  teamRefMap[pickerPermissionTarget.value].value = teams.map((team) => team.id)
}

const handlePickedMemberList = (members) => {
  userRefMap[pickerPermissionTarget.value].value = members.map((member) => member.employeeId)
}

const clearTargets = (targetType, permission) => {
  if (targetType === 'team') {
    teamRefMap[permission].value = []
    return
  }
  userRefMap[permission].value = []
}

const removeTarget = (targetType, permission, id) => {
  if (targetType === 'team') {
    teamRefMap[permission].value = teamRefMap[permission].value.filter((item) => item !== id)
    return
  }
  userRefMap[permission].value = userRefMap[permission].value.filter((item) => item !== id)
}

watch(readScope, (next) => {
  if (next === 'team') readUsers.value = []
  if (next === 'user') readTeams.value = []
})

watch(editScope, (next) => {
  if (next === 'team') editUsers.value = []
  if (next === 'user') editTeams.value = []
})

watch(deleteScope, (next) => {
  if (next === 'team') deleteUsers.value = []
  if (next === 'user') deleteTeams.value = []
})

const handleUpload = () => {
  alert('권한 설정(조직도 기반) 시안 적용 완료. 저장 API 연동 전 단계입니다.')
}
</script>

<style scoped>
.manual-upload { display: flex; flex-direction: column; gap: 16px; }
.header { padding: 18px; border: 1px solid var(--gray200); }
h1 { font-size: 1.14rem; color: var(--gray800); }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; }
.content { border: 1px solid var(--gray200); padding: 18px; }
.mode-switch { display: inline-flex; border: 1px solid var(--gray200); border-radius: 10px; overflow: hidden; margin-bottom: 14px; }
.mode-switch button { border: none; background: #fff; padding: 8px 12px; font-size: 0.82rem; color: var(--gray600); }
.mode-switch button.active { background: var(--primary); color: #fff; }
.form { display: grid; gap: 8px; }
label { font-size: 0.8rem; color: var(--gray500); }
input, textarea, select { border: 1px solid var(--gray300); border-radius: 10px; padding: 10px 12px; font-size: 0.86rem; }
.permissions { border: 1px solid var(--gray200); padding: 18px; }
h2 { font-size: 0.95rem; color: var(--gray800); }
.help { margin-top: 6px; color: var(--gray500); font-size: 0.82rem; }
.permission-card { margin-top: 12px; border: 1px solid #dbe7ef; border-radius: 14px; background: linear-gradient(180deg, #ffffff 0%, #f8fcff 100%); padding: 14px; }
.permission-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.permission-head strong { color: var(--gray800); font-size: 0.87rem; }
.scope-switch { display: flex; gap: 12px; flex-wrap: wrap; }
.scope-switch label { display: flex; align-items: center; gap: 5px; font-size: 0.8rem; color: var(--gray600); }
.permission-body { margin-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.picker-col { display: flex; flex-direction: column; gap: 6px; }
.label-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.inline-actions { display: flex; gap: 6px; }
.pick-btn {
  border: 1px solid #bfdbfe;
  background: #fff;
  color: #1d4ed8;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 0.74rem;
  font-weight: 700;
}
.pick-btn:hover { border-color: #60a5fa; background: #eff6ff; }
.ghost-btn {
  border: 1px solid var(--gray300);
  background: #fff;
  color: var(--gray600);
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 0.74rem;
  font-weight: 700;
}
.selected-box {
  min-height: 74px;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-content: flex-start;
}
.empty-chip {
  margin: 0;
  font-size: 0.79rem;
  color: var(--gray400);
}
.chip {
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.76rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.chip span { font-weight: 800; }
.chip.team { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
.chip.user { background: #f0fdfa; color: #0f766e; border-color: #99f6e4; }
.permissions-footer { margin-top: 16px; display: flex; justify-content: flex-end; }
.save-btn { background: var(--primary); color: #fff; border-radius: 10px; padding: 10px 18px; font-weight: 700; }
@media (max-width: 900px) {
  .permission-head { flex-direction: column; align-items: flex-start; }
  .permission-body { grid-template-columns: 1fr; }
  .permissions-footer { justify-content: stretch; }
  .save-btn { width: 100%; }
}
</style>
