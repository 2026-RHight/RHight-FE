<template>
  <section class="org-explorer" :class="modeClass">
    <article class="panel">
      <div class="panel-header">
        <h3>조직 트리</h3>
        <button class="btn-reset" type="button" @click="resetToMyOrg">내 조직 펼치기</button>
      </div>

      <div class="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input v-model="searchKeyword" type="text" placeholder="본부, 부서, 팀, 사원 이름 검색" />
      </div>

      <div class="tree-scroll">
        <div v-if="!filteredRoot" class="empty">검색 결과가 없습니다.</div>

        <template v-else>
          <button
            v-for="row in visibleRows"
            :key="row.key"
            class="tree-row"
            :class="rowClass(row)"
            :style="{ paddingLeft: `${12 + row.depth * 16}px` }"
            type="button"
            @click="handleRowClick(row)"
          >


            <template v-if="row.kind === 'node'">
              <span class="node-accent" :style="nodeAccentStyle(row.node.type)" aria-hidden="true"></span>
              <span class="chevron" :class="{ open: isOpen(row.node.id) }">{{ row.expandable ? '▸' : '•' }}</span>
              <span class="icon">📂</span>
              <strong>{{ row.node.name }}</strong>
              <span class="type-chip">{{ row.node.type }}</span>
              <span v-if="(row.node.members || []).length" class="count">{{ row.node.members.length }}명</span>
            </template>

            <template v-else>
              <span class="chevron">•</span>
              <span class="icon">👤</span>
              <strong>{{ row.member.name }}</strong>
              <span class="meta">{{ row.member.duty }}</span>
            </template>
          </button>
        </template>
      </div>
    </article>

    <article class="panel">
      <div class="panel-header">
        <h3>프로필 카드</h3>
        <span class="team-name">{{ activeNodeName || '팀 선택 필요' }}</span>
      </div>

      <div class="profile-scroll">
        <div v-if="activeMembers.length === 0" class="empty">선택된 조직의 구성원이 없습니다.</div>

        <div v-else class="profile-grid">
          <article
            v-for="member in activeMembers"
            :key="member.employeeId"
            class="profile-card"
            :class="{ active: selectedMemberId === member.employeeId }"
            @click="selectMember(selectedNodeId, member.employeeId)"
          >
            <div class="profile-layout">
              <div class="profile-avatar-wrap">
                <div class="profile-avatar">
                  <span>{{ member.profileInitial }}</span>
                </div>
              </div>

              <div class="profile-main">
                <div class="profile-head">
                  <strong>{{ member.name }}</strong>
                  <span class="status" :class="statusClass(member.status)">{{ member.status }}</span>
                </div>
                <p class="profile-role">{{ member.position }} · {{ member.job }} · {{ member.duty }}</p>

                <div class="profile-rows">
                  <div class="row"><span>내선전화번호</span><strong>{{ member.extension || '-' }}</strong></div>
                  <div class="row"><span>연락처</span><strong>{{ member.phone || '-' }}</strong></div>
                  <div class="row"><span>이메일</span><strong>{{ member.email || '-' }}</strong></div>
                  <div class="row"><span>직책/직무/직위</span><strong>{{ member.duty }} · {{ member.job }} · {{ member.position }}</strong></div>
                  <div class="row"><span>위치</span><strong>{{ member.workLocation || '-' }}</strong></div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  createHrCurrentUserMock,
  createHrOrgTreeMock,
  findNodeById,
  findPathByNodeId,
  sortMembersByRule
} from '@/mocks/hr/organization'

const props = defineProps({
  initialKeyword: { type: String, default: '' },
  mode: { type: String, default: 'page' }
})

const modeClass = computed(() => ({
  'mode-modal': props.mode === 'modal'
}))

const currentUser = ref(createHrCurrentUserMock())
const orgRoot = ref(createHrOrgTreeMock())
const searchKeyword = ref('')
const expandedNodes = ref({})
const selectedNodeId = ref(currentUser.value.teamNodeId)
const selectedMemberId = ref(null)

const normalize = (value) => String(value || '').trim().toLowerCase()
const isOpen = (nodeId) => Boolean(expandedNodes.value[nodeId])

const matchesMember = (member, keyword) => {
  const text = [
    member.name,
    member.email,
    member.position,
    member.job,
    member.duty,
    member.extension,
    member.phone,
    member.workLocation
  ].join(' ')
  return normalize(text).includes(keyword)
}

const filterNode = (node, keyword) => {
  if (!node) return null

  const nodeMatch = !keyword || normalize(`${node.name} ${node.type}`).includes(keyword)
  const children = (node.children || [])
    .map((child) => filterNode(child, keyword))
    .filter(Boolean)

  const members = sortMembersByRule(node.members || [])
  const filteredMembers = nodeMatch
    ? members
    : members.filter((member) => matchesMember(member, keyword))

  if (!nodeMatch && children.length === 0 && filteredMembers.length === 0) return null

  return {
    ...node,
    children,
    members: filteredMembers
  }
}

const filteredRoot = computed(() => {
  const keyword = normalize(searchKeyword.value)
  return filterNode(orgRoot.value, keyword)
})

const collectAllNodeIds = (node, acc = {}) => {
  if (!node) return acc
  acc[node.id] = true
  ;(node.children || []).forEach((child) => collectAllNodeIds(child, acc))
  return acc
}

const findFirstNodeWithMembers = (node) => {
  if (!node) return null
  if ((node.members || []).length > 0) return node
  for (const child of node.children || []) {
    const found = findFirstNodeWithMembers(child)
    if (found) return found
  }
  return null
}

const visibleRows = computed(() => {
  if (!filteredRoot.value) return []

  const rows = []
  const walk = (node, depth = 0) => {
    const hasChildren = (node.children || []).length > 0
    const hasMembers = (node.members || []).length > 0

    rows.push({
      key: `node-${node.id}`,
      kind: 'node',
      node,
      depth,
      expandable: hasChildren || hasMembers
    })

    if (!isOpen(node.id)) return

    ;(node.children || []).forEach((child) => walk(child, depth + 1))

    sortMembersByRule(node.members || []).forEach((member) => {
      rows.push({
        key: `member-${node.id}-${member.employeeId}`,
        kind: 'member',
        member,
        parentNodeId: node.id,
        depth: depth + 1
      })
    })
  }

  walk(filteredRoot.value, 0)
  return rows
})

const resetToMyOrg = () => {
  const path = findPathByNodeId(orgRoot.value, currentUser.value.teamNodeId) || []
  const next = {}
  path.forEach((id) => {
    next[id] = true
  })
  expandedNodes.value = next
  selectedNodeId.value = currentUser.value.teamNodeId
  selectedMemberId.value = null
}

watch(
  () => normalize(searchKeyword.value),
  (keyword) => {
    if (keyword) {
      expandedNodes.value = collectAllNodeIds(filteredRoot.value)
      return
    }
    resetToMyOrg()
  },
  { immediate: true }
)

watch(
  filteredRoot,
  (root) => {
    if (!root) return
    const selectedNode = findNodeById(root, selectedNodeId.value)
    if (selectedNode) return

    const fallback = findFirstNodeWithMembers(root)
    selectedNodeId.value = fallback?.id || root.id
    selectedMemberId.value = null
  },
  { deep: true }
)

watch(
  () => props.initialKeyword,
  (keyword) => {
    searchKeyword.value = keyword || ''
  },
  { immediate: true }
)

const activeNode = computed(() => {
  return findNodeById(filteredRoot.value, selectedNodeId.value)
    || findNodeById(orgRoot.value, selectedNodeId.value)
    || filteredRoot.value
    || orgRoot.value
})

const activeNodeName = computed(() => activeNode.value?.name || '')
const activeMembers = computed(() => sortMembersByRule(activeNode.value?.members || []))

const handleRowClick = (row) => {
  if (row.kind === 'node') {
    if (row.expandable) {
      expandedNodes.value[row.node.id] = !expandedNodes.value[row.node.id]
    }

    if ((row.node.members || []).length > 0) {
      selectedNodeId.value = row.node.id
      selectedMemberId.value = null
    }
    return
  }

  selectMember(row.parentNodeId, row.member.employeeId)
}

const selectMember = (nodeId, employeeId) => {
  selectedNodeId.value = nodeId
  selectedMemberId.value = employeeId
}

const rowClass = (row) => {
  if (row.kind === 'node') {
    return {
      'node-active': selectedNodeId.value === row.node.id
    }
  }

  return {
    'member-active': selectedMemberId.value === row.member.employeeId
  }
}

const levelPrefix = (depth) => `${'--- '.repeat(depth)}`.trim()

const nodeAccentStyle = (type) => {
  const palette = {
    회사: '#E2E8F0',
    본부: '#FDE68A',
    센터: '#BFDBFE',
    부: '#C7D2FE',
    팀: '#A7F3D0',
    실: '#FBCFE8'
  }

  return { backgroundColor: palette[type] || '#E2E8F0' }
}

const statusClass = (status) => {
  if (status === '정상') return 'ok'
  if (status === '재택') return 'remote'
  return 'leave'
}
</script>

<style scoped>
.org-explorer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  min-height: 640px;
}

.org-explorer.mode-modal {
  min-height: 0;
  height: 100%;
}

.panel {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  height: 58px;
  border-bottom: 1px solid var(--gray100);
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-header h3 { margin: 0; font-size: 1.03rem; color: var(--gray800); }

.team-name {
  color: var(--gray500);
  font-size: .8rem;
  font-weight: 700;
}

.btn-reset {
  border: 1px solid var(--gray200);
  height: 32px;
  border-radius: 9px;
  background: #fff;
  color: var(--gray600);
  font-size: .78rem;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
}

.btn-reset:hover { background: var(--gray50); }

.search-box {
  margin: 12px 12px 8px;
  height: 38px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--gray200);
  border-radius: 10px;
  background: #fff;
  color: var(--gray400);
}

.search-box input {
  width: 100%;
  border: none;
  outline: none;
  font-size: .84rem;
  color: var(--gray700);
  background: transparent;
}

.tree-scroll { flex: 1; overflow-y: auto; padding: 8px 8px 12px; min-height: 0; }
.profile-scroll { flex: 1; overflow-y: auto; padding: 12px; min-height: 0; }

.empty {
  color: var(--gray400);
  font-size: .84rem;
  text-align: center;
  padding: 26px 0;
}

.tree-row {
  width: 100%;
  min-height: 38px;
  border: none;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;
  color: var(--gray700);
  font-size: .85rem;
  margin-bottom: 1px;
  padding: 3px 10px;
}

.tree-row:hover { background: var(--gray50); }
.tree-row.node-active { background: #E6F6F9; }
.tree-row.member-active { background: #ECFEFF; border: 1px solid #67E8F9; }
.tree-row strong { color: var(--gray800); }

.level-prefix {
  color: #94A3B8;
  font-size: .72rem;
  letter-spacing: .04em;
  font-weight: 700;
  margin-right: 2px;
  white-space: nowrap;
}

.node-accent {
  width: 5px;
  min-width: 5px;
  height: 30px;

}

.chevron {
  width: 14px;
  color: var(--gray500);
  display: inline-flex;
  justify-content: center;
  transform: rotate(0deg);
  transition: transform .15s;
}

.chevron.open { transform: rotate(90deg); }
.icon { width: 16px; display: inline-flex; justify-content: center; }

.type-chip {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  background: #EEF2FF;
  color: #64748B;
  font-size: .68rem;
  font-weight: 700;
}

.count {
  margin-left: auto;
  color: var(--gray500);
  font-size: .74rem;
  font-weight: 700;
}

.meta {
  color: var(--gray500);
  font-size: .75rem;
}

.profile-grid { display: grid; gap: 10px; }

.profile-card {
  border: 1px solid var(--gray200);
  border-radius: 12px;
  background: #fff;
  padding: 12px;
  cursor: pointer;
}

.profile-card:hover { border-color: #67E8F9; }
.profile-card.active { border-color: #22D3EE; background: #ECFEFF; }

.profile-layout {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 12px;
  align-items: flex-start;
}

.profile-avatar-wrap {
  display: flex;
  justify-content: center;
}

.profile-avatar {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #A5F3FC, #0891B2);
  color: #fff;
  font-size: .86rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-main { min-width: 0; }

.profile-head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-head strong {
  color: var(--gray800);
  font-size: .98rem;
}

.profile-role {
  margin: 5px 0 8px;
  color: var(--gray500);
  font-size: .78rem;
  font-weight: 700;
}

.profile-rows { display: grid; gap: 6px; }

.row {
  display: grid;
  grid-template-columns: 102px minmax(0, 1fr);
  gap: 8px;
  font-size: .8rem;
}

.row span { color: var(--gray500); }
.row strong { color: var(--gray800); word-break: break-word; }

.status {
  display: inline-flex;
  align-items: center;
  height: 20px;
  border-radius: 999px;
  padding: 0 7px;
  font-size: .68rem;
  font-weight: 700;
}

.status.ok { background: #DCFCE7; color: #16A34A; }
.status.remote { background: #DBEAFE; color: #2563EB; }
.status.leave { background: #FEF3C7; color: #D97706; }

@media (max-width: 1100px) {
  .org-explorer { grid-template-columns: minmax(0, 1fr); }
}
</style>
