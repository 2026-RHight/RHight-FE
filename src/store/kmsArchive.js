import { computed, reactive } from 'vue'
import { archiveDocuments, sortByDateDesc } from '@/mocks/kms'
import {
  createHrOrgTreeMock
} from '@/mocks/hr/organization'

const state = reactive({
  docs: structuredClone(archiveDocuments)
})

const orgRoot = createHrOrgTreeMock()

const collectTeamMeta = (node, path = [], acc = []) => {
  if (!node) return acc
  const nextPath = [...path, node]
  if (node.type === '팀') {
    acc.push({
      teamId: node.id,
      teamName: node.name,
      pathIds: nextPath.map((item) => item.id),
      pathNames: nextPath.map((item) => item.name)
    })
  }
  ;(node.children || []).forEach((child) => collectTeamMeta(child, nextPath, acc))
  return acc
}

const teamMetaList = collectTeamMeta(orgRoot)
const teamNameMetaMap = new Map(teamMetaList.map((row) => [row.teamName, row]))

const findMemberPathByEmployeeId = (root, employeeId) => {
  let foundPath = null
  const walk = (node, path = []) => {
    if (!node || foundPath) return
    const nextPath = [...path, node]
    const hasMember = (node.members || []).some((member) => member.employeeId === employeeId)
    if (hasMember) {
      foundPath = nextPath
      return
    }
    ;(node.children || []).forEach((child) => walk(child, nextPath))
  }
  walk(root, [])
  return foundPath
}

export const resolveCurrentUserOrgContext = (userId) => {
  const effectiveUserId = String(userId || '')
  const memberPath = findMemberPathByEmployeeId(orgRoot, effectiveUserId)

  if (memberPath && memberPath.length > 0) {
    const names = memberPath.map((node) => node.name)
    const teamNode = [...memberPath].reverse().find((node) => node.type === '팀')
    return {
      userId: effectiveUserId,
      teamId: teamNode?.id || null,
      teamName: teamNode?.name || '',
      scopeNames: new Set(names)
    }
  }

  return {
    userId: effectiveUserId,
    teamId: null,
    teamName: '',
    scopeNames: new Set()
  }
}

export const canReadArchiveDoc = (doc, userContext) => {
  const userGranted = doc.allowedUserIds.includes(userContext.userId)
  const scopeGranted = doc.allowedScopes.some((scope) => userContext.scopeNames.has(scope))
  return userGranted || scopeGranted
}

const getDocsSorted = () => sortByDateDesc(state.docs)

const generateArchiveId = () => {
  const maxId = state.docs.reduce((acc, row) => Math.max(acc, Number(row.id) || 0), 0)
  return maxId + 1
}

export const useKmsArchiveStore = () => {
  const docs = computed(() => getDocsSorted())

  const getDocById = (docId) => {
    return state.docs.find((doc) => String(doc.id) === String(docId))
  }

  const createDoc = (payload) => {
    const id = generateArchiveId()
    const now = new Date()
    const y = now.getFullYear()
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    const createdAt = `${y}-${m}-${d}`

    const next = {
      id,
      title: payload.title,
      category: payload.category,
      body: payload.body,
      summary: payload.body.slice(0, 80),
      createdAt,
      owner: payload.owner,
      org: payload.org,
      team: payload.team,
      attachments: payload.attachments || [],
      allowDownload: true,
      allowedScopes: (payload.allowedScopes && payload.allowedScopes.length > 0)
        ? payload.allowedScopes
        : [payload.org, payload.team].filter(Boolean),
      allowedUserIds: payload.allowedUserIds || []
    }

    state.docs.push(next)
    return next
  }

  const updateDoc = (docId, payload, userContext) => {
    const target = getDocById(docId)
    if (!target) return null
    if (!userContext || !canReadArchiveDoc(target, userContext)) return null
    target.title = payload.title
    target.category = payload.category
    target.body = payload.body
    target.summary = payload.body.slice(0, 80)
    target.org = payload.org
    target.team = payload.team
    target.allowedScopes = (payload.allowedScopes && payload.allowedScopes.length > 0)
      ? payload.allowedScopes
      : [payload.org, payload.team].filter(Boolean)
    target.allowedUserIds = payload.allowedUserIds || target.allowedUserIds
    target.attachments = payload.attachments || target.attachments
    return target
  }

  return {
    docs,
    teamMetaList,
    teamNameMetaMap,
    getDocById,
    createDoc,
    updateDoc
  }
}
