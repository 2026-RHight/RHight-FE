<template>
  <BaseModal v-model="isOpen" width="1120px">
    <div class="picker-shell">
      <div class="picker-head">
        <h3>{{ selectMode === 'team' ? '조직(팀) 선택' : '사원 찾기' }}</h3>
        <button class="close-btn" type="button" @click="isOpen = false">닫기</button>
      </div>

      <div class="search-row">
        <input v-model.trim="keyword" type="text" placeholder="본부, 부서, 팀, 사원 이름 검색" />
      </div>

      <div class="picker-body" :class="{ 'picker-body--team': selectMode === 'team' }">
        <article class="panel tree-panel">
          <h4>{{ selectMode === 'team' ? '조직도 (팀 선택)' : '조직도' }}</h4>
          <div class="tree-scroll">
            <button
              v-for="row in visibleRows"
              :key="row.id"
              type="button"
              class="tree-row"
              :class="{ active: selectedNodeId === row.node.id, picked: isTeamPicked(row.node.id) }"
              :style="{ paddingLeft: `${10 + row.depth * 16}px` }"
              @click="toggleOrSelect(row)"
            >
              <span class="toggle">{{ row.hasChildren ? (isExpanded(row.node.id) ? '▾' : '▸') : '•' }}</span>
              <span>📂</span>
              <strong>{{ row.node.name }}</strong>
              <span class="type">{{ row.node.type }}</span>
              <span v-if="isTeamPicked(row.node.id)" class="picked-badge">선택됨</span>
            </button>
          </div>
        </article>

        <article v-if="selectMode !== 'team'" class="panel member-panel">
          <h4>사원 목록</h4>
          <div class="member-scroll">
            <button
              v-for="member in filteredMembers"
              :key="member.employeeId"
              type="button"
              class="member-row"
              :class="{ picked: isMemberPicked(member.employeeId) }"
              @click="pickMember(member)"
            >
              <strong>{{ member.name }}</strong>
              <span>{{ member.position }} / {{ member.job }} / {{ member.duty }}</span>
              <em v-if="isMemberPicked(member.employeeId)" class="picked-text">선택됨</em>
            </button>
            <p v-if="filteredMembers.length === 0" class="empty">선택 가능한 사원이 없습니다.</p>
          </div>
        </article>
      </div>

      <div v-if="selectMode === 'team' || multiple" class="team-footer">
        <p class="team-help">{{ footerHelpText }}</p>
        <button type="button" class="team-confirm-btn" @click="confirmSelection">확인</button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { createHrOrgTreeMock, findNodeById, sortMembersByRule } from '@/mocks/hr/organization'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  selectMode: { type: String, default: 'member' },
  multiple: { type: Boolean, default: false },
  initialSelectedIds: { type: Array, default: () => [] }
})

const emit = defineEmits([
  'update:modelValue',
  'select-member',
  'select-team',
  'select-member-list',
  'select-team-list'
])
const selectMode = computed(() => props.selectMode)
const multiple = computed(() => props.multiple)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const root = ref(createHrOrgTreeMock())
const keyword = ref('')
const expanded = ref({ [root.value.id]: true })
const selectedNodeId = ref(root.value.id)
const selectedTeamIds = ref([])
const selectedMemberIds = ref([])

const normalize = (value) => String(value || '').toLowerCase()

const matchesNode = (node, q) => normalize(`${node.name} ${node.type}`).includes(q)
const matchesMember = (member, q) => normalize(`${member.name} ${member.position} ${member.job} ${member.duty}`).includes(q)

const isExpanded = (nodeId) => Boolean(expanded.value[nodeId])

const filteredTree = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  if (!q) return root.value

  const walk = (node) => {
    const childMatches = (node.children || []).map(walk).filter(Boolean)
    const memberMatches = (node.members || []).filter((m) => matchesMember(m, q))
    if (matchesNode(node, q) || childMatches.length > 0 || memberMatches.length > 0) {
      return { ...node, children: childMatches, members: memberMatches }
    }
    return null
  }

  return walk(root.value)
})

const visibleRows = computed(() => {
  const tree = filteredTree.value
  if (!tree) return []
  const rows = []

  const walk = (node, depth = 0) => {
    const hasChildren = (node.children || []).length > 0
    rows.push({ id: node.id, node, depth, hasChildren })
    if (!isExpanded(node.id)) return
    ;(node.children || []).forEach((child) => walk(child, depth + 1))
  }

  walk(tree, 0)
  return rows
})

const selectedNode = computed(() => {
  return findNodeById(filteredTree.value, selectedNodeId.value) || findNodeById(root.value, selectedNodeId.value)
})

const filteredMembers = computed(() => {
  const q = keyword.value.trim().toLowerCase()
  const members = sortMembersByRule(selectedNode.value?.members || [])
  if (!q) return members
  return members.filter((member) => matchesMember(member, q))
})

const allMembers = computed(() => {
  const rows = []
  const walk = (node) => {
    if (!node) return
    ;(node.members || []).forEach((member) => rows.push(member))
    ;(node.children || []).forEach(walk)
  }
  walk(root.value)
  return rows
})

watch(filteredTree, (tree) => {
  if (!tree) return
  if (!findNodeById(tree, selectedNodeId.value)) {
    selectedNodeId.value = tree.id
  }
}, { deep: true })

watch(keyword, (next) => {
  if (next.trim()) {
    const openAll = {}
    const walk = (node) => {
      if (!node) return
      openAll[node.id] = true
      ;(node.children || []).forEach(walk)
    }
    walk(filteredTree.value)
    expanded.value = openAll
  } else {
    expanded.value = { [root.value.id]: true }
  }
})

watch(() => props.modelValue, (opened) => {
  if (!opened) return
  if (selectMode.value === 'team') {
    selectedTeamIds.value = [...props.initialSelectedIds]
  } else {
    selectedMemberIds.value = [...props.initialSelectedIds]
  }
})

const toggleOrSelect = (row) => {
  selectedNodeId.value = row.node.id

  if (selectMode.value === 'team' && row.node.type === '팀') {
    if (multiple.value) {
      if (selectedTeamIds.value.includes(row.node.id)) {
        selectedTeamIds.value = selectedTeamIds.value.filter((id) => id !== row.node.id)
      } else {
        selectedTeamIds.value = [...selectedTeamIds.value, row.node.id]
      }
    } else {
      selectedTeamIds.value = [row.node.id]
    }
  }

  if (row.hasChildren) expanded.value[row.node.id] = !expanded.value[row.node.id]
}

const pickMember = (member) => {
  if (multiple.value) {
    if (selectedMemberIds.value.includes(member.employeeId)) {
      selectedMemberIds.value = selectedMemberIds.value.filter((id) => id !== member.employeeId)
    } else {
      selectedMemberIds.value = [...selectedMemberIds.value, member.employeeId]
    }
    return
  }
  emit('select-member', member)
  isOpen.value = false
}

const isTeamPicked = (nodeId) => selectedTeamIds.value.includes(nodeId)
const isMemberPicked = (employeeId) => selectedMemberIds.value.includes(employeeId)

const footerHelpText = computed(() => {
  if (selectMode.value === 'team') {
    return multiple.value
      ? `팀을 여러 개 선택할 수 있습니다. 선택된 팀: ${selectedTeamIds.value.length}개`
      : '팀 노드를 선택한 뒤 확인을 누르세요. (본부/부/센터 선택 불가)'
  }
  return `사용자를 여러 명 선택할 수 있습니다. 선택된 사용자: ${selectedMemberIds.value.length}명`
})

const confirmSelection = () => {
  if (selectMode.value === 'team') {
    const teamIds = multiple.value ? selectedTeamIds.value : [selectedNode.value?.id].filter(Boolean)
    const teams = teamIds
      .map((id) => findNodeById(root.value, id))
      .filter((node) => node && node.type === '팀')
      .map((node) => ({ id: node.id, name: node.name, type: node.type }))

    if (teams.length === 0) {
      alert('팀 단위 노드를 선택해 주세요.')
      return
    }

    if (multiple.value) {
      emit('select-team-list', teams)
    } else {
      emit('select-team', teams[0])
    }
    isOpen.value = false
    return
  }

  const members = selectedMemberIds.value
    .map((id) => allMembers.value.find((member) => member.employeeId === id))
    .filter(Boolean)

  if (members.length === 0) {
    alert('사용자를 1명 이상 선택해 주세요.')
    return
  }

  emit('select-member-list', members)
  isOpen.value = false
}
</script>

<style scoped>
.picker-shell { display: flex; flex-direction: column; gap: 10px; height: calc(100vh - 190px); max-height: 730px; min-height: 520px; }
.picker-head { display: flex; align-items: center; justify-content: space-between; }
.picker-head h3 { margin: 0; color: var(--gray800); font-size: 1.1rem; }
.close-btn { height: 32px; border: 1px solid var(--gray200); border-radius: 9px; background: #fff; color: var(--gray600); padding: 0 12px; font-size: .8rem; font-weight: 700; }
.search-row input { width: 100%; height: 36px; border: 1px solid var(--gray200); border-radius: 10px; padding: 0 10px; }
.picker-body { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.picker-body--team { grid-template-columns: 1fr; }
.panel { border: 1px solid var(--gray100); border-radius: 12px; background: #fff; display: flex; flex-direction: column; min-height: 0; }
.panel h4 { margin: 0; padding: 12px; border-bottom: 1px solid var(--gray100); color: var(--gray700); font-size: .9rem; }
.tree-scroll,.member-scroll { flex: 1; min-height: 0; overflow: auto; padding: 8px; }
.tree-row { width: 100%; border: none; background: #fff; border-radius: 8px; height: 34px; text-align: left; display: flex; align-items: center; gap: 8px; color: var(--gray700); }
.tree-row.active { background: #E0F2FE; }
.tree-row.picked {
  border: 1px solid #38bdf8;
  background: linear-gradient(90deg, #cffafe 0%, #ecfeff 100%);
  box-shadow: inset 3px 0 0 #0284c7;
}
.toggle { width: 10px; color: var(--gray500); }
.type { margin-left: auto; color: var(--gray400); font-size: .75rem; }
.member-row { width: 100%; border: 1px solid var(--gray100); background: #fff; border-radius: 8px; padding: 8px 10px; text-align: left; display: flex; flex-direction: column; gap: 3px; margin-bottom: 8px; }
.member-row strong { color: var(--gray800); font-size: .86rem; }
.member-row span { color: var(--gray500); font-size: .76rem; }
.member-row:hover { border-color: #7dd3fc; background: #f0f9ff; }
.member-row.picked {
  border-color: #0891b2;
  background: linear-gradient(180deg, #ecfeff 0%, #f0fdfa 100%);
  box-shadow: inset 3px 0 0 #0e7490;
}
.empty { margin: 0; color: var(--gray400); font-size: .8rem; padding: 8px; }
.picked-badge {
  margin-left: 8px;
  background: #0284c7;
  color: #fff;
  font-size: .68rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 2px 7px;
}
.picked-text {
  margin-top: 2px;
  font-style: normal;
  font-size: .72rem;
  font-weight: 700;
  color: #0e7490;
}
.team-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.team-help { margin: 0; color: var(--gray500); font-size: .78rem; }
.team-confirm-btn {
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #fff;
  border-radius: 9px;
  padding: 8px 12px;
  font-size: .8rem;
  font-weight: 700;
}
@media (max-width: 1100px) { .picker-body { grid-template-columns: 1fr; } }
</style>
