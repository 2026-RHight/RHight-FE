import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  applyBusinessTrip,
  applyLeave as applyLeaveRequest,
  applyOvertime as applyOvertimeRequest,
  applyWeeklyWorkSchedule,
  cancelBusinessTrip,
  cancelLeave as cancelLeaveRequest,
  cancelOvertime,
  cancelWeeklyWorkSchedule,
  clockIn as clockInRequest,
  clockOut as clockOutRequest,
  getAdminBusinessTripRequests,
  getAdminLeaveRequests,
  getAdminOvertimeRequests,
  getAttendanceRecords,
  getAttendanceSummary,
  getBusinessTripStatusCounts,
  getLeaveBalance as getLeaveBalanceRequest,
  getLeaveStatusCounts,
  getMyBusinessTripRequests,
  getMyLeaveRequests,
  getMyOvertimeRequests,
  getMyWeeklyWorkSchedules,
  getOvertimeStatusCounts,
  getTeamWeeklyWorkSchedules,
  getWeeklyWorkScheduleStatusCounts,
  modifyAttendanceByAdmin,
  processBusinessTrip,
  processLeave,
  processOvertime,
  processWeeklyWorkSchedule,
} from '@/api/attendance'

const formatDate = (value) => {
  if (!value) return ''
  return String(value).slice(0, 10)
}

const formatDateTime = (value) => {
  if (!value) return ''
  return String(value).slice(0, 16).replace('T', ' ')
}

const formatTime = (value) => {
  if (!value) return null
  return String(value).slice(0, 5)
}

const formatPeriod = (start, end) => {
  const safeStart = formatDateTime(start) || formatDate(start)
  const safeEnd = formatDateTime(end) || formatDate(end)
  if (!safeStart && !safeEnd) return '-'
  if (!safeEnd || safeStart === safeEnd) return safeStart
  return `${safeStart} ~ ${safeEnd}`
}

const toRequestStatus = (value) => {
  const normalized = String(value || '').toUpperCase()
  if (normalized === 'APPROVED') return 'approved'
  if (normalized === 'REJECTED') return 'rejected'
  if (normalized === 'CANCELLED') return 'cancelled'
  return 'pending'
}

const toAttendanceStatus = (value) => {
  const normalized = String(value || '').toUpperCase()
  if (normalized === 'TARDY' || normalized === 'LATE') return 'tardy'
  if (normalized === 'EARLY_LEAVE') return 'early_leave'
  if (normalized === 'ABSENT') return 'absent'
  if (normalized === 'VACATION' || normalized === 'LEAVE') return 'vacation'
  return 'normal'
}

const calculateWorkHours = (inTime, outTime) => {
  if (!inTime || !outTime) return '0h'
  const [h1, m1] = String(inTime).slice(0, 5).split(':').map(Number)
  const [h2, m2] = String(outTime).slice(0, 5).split(':').map(Number)
  const diffMinutes = (h2 * 60 + m2) - (h1 * 60 + m1)
  if (diffMinutes <= 0) return '0h'
  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60
  return `${hours}h ${String(minutes).padStart(2, '0')}m`
}

const placeholderIdentity = (employeeId) => ({
  name: `사원 #${employeeId ?? '-'}`,
  position: '직원',
  deptName: '-',
})

const mapLeaveRequest = (item) => ({
  id: item.leaveRequestId,
  leaveRequestId: item.leaveRequestId,
  employeeId: item.employeeId,
  ...placeholderIdentity(item.employeeId),
  type: '휴가',
  leaveType: item.leaveType,
  title: `${item.leaveType || '휴가'} 신청`,
  period: formatPeriod(item.startDate, item.endDate),
  targetDate: formatDate(item.startDate),
  startDate: formatDate(item.startDate),
  endDate: formatDate(item.endDate),
  applyDate: formatDate(item.startDate),
  usedDays: Number(item.usedDays || 0),
  days: Number(item.usedDays || 0),
  reason: item.reason || '',
  status: toRequestStatus(item.leaveStatus),
  rawStatus: item.leaveStatus,
  appliedAt: formatDate(item.startDate),
  approver: '-',
  rejectReason: item.rejectReason || '',
  category: 'leave',
})

const mapOvertimeRequest = (item) => ({
  id: item.overtimeId,
  overtimeId: item.overtimeId,
  employeeId: item.employeeId,
  ...placeholderIdentity(item.employeeId),
  type: '연장근무',
  title: '연장근무 신청',
  period: formatPeriod(item.startTime, item.endTime),
  targetDate: formatDate(item.workDate),
  workDate: formatDate(item.workDate),
  startTime: formatDateTime(item.startTime),
  endTime: formatDateTime(item.endTime),
  days: 0,
  reason: item.reason || '',
  status: toRequestStatus(item.approvalStatus),
  rawStatus: item.approvalStatus,
  appliedAt: formatDate(item.workDate),
  approver: '-',
  rejectReason: item.rejectReason || '',
  category: 'work',
})

const mapBusinessTripRequest = (item) => ({
  id: item.tripId,
  tripId: item.tripId,
  employeeId: item.employeeId,
  ...placeholderIdentity(item.employeeId),
  type: item.tripType === 'BUSINESS_TRIP' ? '출장' : '외근',
  tripType: item.tripType,
  title: `${item.tripType === 'BUSINESS_TRIP' ? '출장' : '외근'} 신청`,
  period: formatPeriod(item.startDatetime, item.endDatetime),
  targetDate: formatDateTime(item.startDatetime),
  destination: item.destination || '',
  reason: item.reason || '',
  status: toRequestStatus(item.approvalStatus),
  rawStatus: item.approvalStatus,
  appliedAt: formatDateTime(item.startDatetime),
  approver: '-',
  rejectReason: item.rejectReason || '',
  category: 'work',
})

const mapWeeklySchedule = (item) => ({
  id: item.weeklyId,
  weeklyId: item.weeklyId,
  employeeId: item.employeeId,
  ...placeholderIdentity(item.employeeId),
  period: formatPeriod(item.startDate, item.endDate),
  startDate: formatDateTime(item.startDate),
  endDate: formatDateTime(item.endDate),
  planDate: formatDate(item.planDate),
  type: item.workForm || '유연근무',
  workForm: item.workForm,
  scheduleTitle: item.scheduleTitle || '유연근무 신청',
  title: item.scheduleTitle || '유연근무 신청',
  dept: '-',
  reason: item.memo || '',
  memo: item.memo || '',
  status: toRequestStatus(item.approvalStatus),
  rawStatus: item.approvalStatus,
  rejectionReason: '',
  appliedAt: formatDateTime(item.createdAt) || formatDate(item.planDate),
  category: 'work',
})

const sortByAppliedAtDesc = (items) =>
  [...items].sort((a, b) => String(b.appliedAt || '').localeCompare(String(a.appliedAt || '')))

export const useAttendanceStore = defineStore('attendance', () => {
  const dailyAttendance = ref([])
  const monthlySummary = ref({
    normalCount: 0,
    tardyCount: 0,
    earlyLeaveCount: 0,
    absentCount: 0,
    vacationCount: 0,
  })
  const leaveBalance = ref({
    totalAnnualLeave: 0,
    usedAnnualLeave: 0,
    pendingAnnualLeave: 0,
    remainingAnnualLeave: 0,
  })
  const myLeaveRequestsList = ref([])
  const requestHistory = ref([])
  const leaveRequests = ref([])
  const flexibleWorkPlans = ref([])
  const overtimeRequests = ref([])
  const businessTripRequests = ref([])
  const checkInTime = ref(null)
  const checkOutTime = ref(null)
  const isLoading = ref(false)
  const requestCounts = ref({
    pending: 0,
    approved: 0,
    rejected: 0,
  })

  const refreshCurrentMonth = async () => {
    const now = new Date()
    await Promise.all([
      fetchMonthlyRecords(now.getFullYear(), now.getMonth() + 1),
      fetchMonthlySummary(now.getFullYear(), now.getMonth() + 1),
    ])
  }

  const fetchMonthlySummary = async (year, month) => {
    const response = await getAttendanceSummary({ year, month })
    monthlySummary.value = response.data
  }

  const fetchMonthlyRecords = async (year, month, status = null) => {
    isLoading.value = true
    try {
      const params = { year, month }
      if (status && status !== 'all') params.status = status.toUpperCase()
      const response = await getAttendanceRecords(params)
      dailyAttendance.value = response.data.map((record) => ({
        id: record.attendanceId,
        attendanceId: record.attendanceId,
        ...placeholderIdentity(record.employeeId),
        date: formatDate(record.workDate),
        checkIn: formatTime(record.checkInTime),
        checkOut: formatTime(record.checkOutTime),
        status: toAttendanceStatus(record.status),
        statusDescription: record.statusDescription,
        memo: record.statusDescription,
        workHours: calculateWorkHours(record.checkInTime, record.checkOutTime),
      }))

      const today = formatDate(new Date().toISOString())
      const todaysRecord = dailyAttendance.value.find((record) => record.date === today)
      checkInTime.value = todaysRecord?.checkIn || null
      checkOutTime.value = todaysRecord?.checkOut || null
    } finally {
      isLoading.value = false
    }
  }

  const clockIn = async (tardyReason = null) => {
    await clockInRequest({ tardyReason })
    await refreshCurrentMonth()
    return true
  }

  const clockOut = async () => {
    await clockOutRequest()
    await refreshCurrentMonth()
    return true
  }

  const updateDailyAttendance = async (attendance) => {
    await modifyAttendanceByAdmin(attendance)
  }

  const fetchLeaveBalance = async () => {
    const response = await getLeaveBalanceRequest()
    leaveBalance.value = response.data
  }

  const fetchMyLeaveRequests = async (page = 1, size = 20) => {
    const response = await getMyLeaveRequests({ page, size })
    myLeaveRequestsList.value = (response.data?.content || []).map(mapLeaveRequest)
    return response.data
  }

  const refreshRequestCounts = async () => {
    const [leaveResponse, overtimeResponse, tripResponse, weeklyResponse] = await Promise.all([
      getLeaveStatusCounts(),
      getOvertimeStatusCounts(),
      getBusinessTripStatusCounts(),
      getWeeklyWorkScheduleStatusCounts(),
    ])

    requestCounts.value = {
      pending:
        (leaveResponse.data?.pendingCount || 0) +
        (overtimeResponse.data?.pendingCount || 0) +
        (tripResponse.data?.pendingCount || 0) +
        (weeklyResponse.data?.pendingCount || 0),
      approved:
        (leaveResponse.data?.approvedCount || 0) +
        (overtimeResponse.data?.approvedCount || 0) +
        (tripResponse.data?.approvedCount || 0) +
        (weeklyResponse.data?.approvedCount || 0),
      rejected:
        (leaveResponse.data?.rejectedCount || 0) +
        (overtimeResponse.data?.rejectedCount || 0) +
        (tripResponse.data?.rejectedCount || 0) +
        (weeklyResponse.data?.rejectedCount || 0),
    }
  }

  const fetchRequestHistory = async () => {
    const [leaveResponse, overtimeResponse, tripResponse, weeklyResponse] = await Promise.all([
      getMyLeaveRequests({ page: 1, size: 100 }),
      getMyOvertimeRequests({ page: 1, size: 100 }),
      getMyBusinessTripRequests({ page: 1, size: 100 }),
      getMyWeeklyWorkSchedules({ page: 1, size: 100 }),
    ])

    const history = [
      ...(leaveResponse.data?.content || []).map(mapLeaveRequest),
      ...(overtimeResponse.data?.content || []).map(mapOvertimeRequest),
      ...(tripResponse.data?.content || []).map(mapBusinessTripRequest),
      ...(weeklyResponse.data?.content || []).map(mapWeeklySchedule),
    ]

    requestHistory.value = sortByAppliedAtDesc(history)
    return requestHistory.value
  }

  const applyLeave = async (payload) => {
    await applyLeaveRequest(payload)
    await Promise.all([fetchLeaveBalance(), fetchMyLeaveRequests(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const cancelLeave = async (leaveRequestId) => {
    await cancelLeaveRequest(leaveRequestId)
    await Promise.all([fetchLeaveBalance(), fetchMyLeaveRequests(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const fetchAdminLeaveRequestsList = async (page = 1, size = 100, status = null) => {
    const params = { page, size }
    if (status) params.status = status.toUpperCase()
    const response = await getAdminLeaveRequests(params)
    leaveRequests.value = (response.data?.content || []).map(mapLeaveRequest)
    return response.data
  }

  const processLeaveRequests = async (ids, approve, rejectReason = '') => {
    await Promise.all(
      ids.map((leaveRequestId) =>
        processLeave({
          leaveRequestId,
          approve,
          rejectReason: approve ? null : rejectReason,
        }),
      ),
    )
    await fetchAdminLeaveRequestsList()
  }

  const fetchMyOvertimeRequestsList = async (page = 1, size = 100) => {
    const response = await getMyOvertimeRequests({ page, size })
    overtimeRequests.value = (response.data?.content || []).map(mapOvertimeRequest)
    return response.data
  }

  const applyOvertime = async (payload) => {
    await applyOvertimeRequest(payload)
    await Promise.all([fetchMyOvertimeRequestsList(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const cancelOvertimeRequestById = async (overtimeId) => {
    await cancelOvertime(overtimeId)
    await Promise.all([fetchMyOvertimeRequestsList(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const fetchAdminOvertimeRequestsList = async (page = 1, size = 100, status = null) => {
    const params = { page, size }
    if (status) params.status = status.toUpperCase()
    const response = await getAdminOvertimeRequests(params)
    overtimeRequests.value = (response.data?.content || []).map(mapOvertimeRequest)
    return response.data
  }

  const processOvertimeRequests = async (ids, approve, rejectReason = '') => {
    await Promise.all(
      ids.map((overtimeId) =>
        processOvertime({
          overtimeId,
          approve,
          rejectReason: approve ? null : rejectReason,
        }),
      ),
    )
    await fetchAdminOvertimeRequestsList()
  }

  const fetchMyBusinessTripRequestsList = async (page = 1, size = 100) => {
    const response = await getMyBusinessTripRequests({ page, size })
    businessTripRequests.value = (response.data?.content || []).map(mapBusinessTripRequest)
    return response.data
  }

  const submitBusinessTrip = async (payload) => {
    await applyBusinessTrip(payload)
    await Promise.all([fetchMyBusinessTripRequestsList(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const cancelBusinessTripRequestById = async (tripId) => {
    await cancelBusinessTrip(tripId)
    await Promise.all([fetchMyBusinessTripRequestsList(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const fetchAdminBusinessTripRequestsList = async (page = 1, size = 100, status = null) => {
    const params = { page, size }
    if (status) params.status = status.toUpperCase()
    const response = await getAdminBusinessTripRequests(params)
    businessTripRequests.value = (response.data?.content || []).map(mapBusinessTripRequest)
    return response.data
  }

  const processBusinessTripRequests = async (ids, approve, rejectReason = '') => {
    await Promise.all(
      ids.map((tripId) =>
        processBusinessTrip({
          tripId,
          approve,
          rejectReason: approve ? null : rejectReason,
        }),
      ),
    )
    await fetchAdminBusinessTripRequestsList()
  }

  const fetchMyFlexibleWorkPlans = async (page = 1, size = 100) => {
    const response = await getMyWeeklyWorkSchedules({ page, size })
    flexibleWorkPlans.value = (response.data?.content || []).map(mapWeeklySchedule)
    return response.data
  }

  const submitWeeklyWorkSchedule = async (payload) => {
    await applyWeeklyWorkSchedule(payload)
    await Promise.all([fetchMyFlexibleWorkPlans(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const cancelWeeklyWorkScheduleRequestById = async (weeklyId) => {
    await cancelWeeklyWorkSchedule(weeklyId)
    await Promise.all([fetchMyFlexibleWorkPlans(), fetchRequestHistory(), refreshRequestCounts()])
    return true
  }

  const fetchTeamFlexibleWorkPlans = async (page = 1, size = 100, status = null) => {
    const params = { page, size }
    if (status) params.status = status.toUpperCase()
    const response = await getTeamWeeklyWorkSchedules(params)
    flexibleWorkPlans.value = (response.data?.content || []).map(mapWeeklySchedule)
    return response.data
  }

  const processFlexiblePlans = async (ids, approve) => {
    await Promise.all(ids.map((weeklyId) => processWeeklyWorkSchedule({ weeklyId, approve })))
    await fetchTeamFlexibleWorkPlans()
  }

  return {
    businessTripRequests,
    checkInTime,
    checkOutTime,
    dailyAttendance,
    flexibleWorkPlans,
    isLoading,
    leaveBalance,
    leaveRequests,
    monthlySummary,
    myLeaveRequests: computed(() => myLeaveRequestsList.value),
    myLeaveRequestsList,
    overtimeRequests,
    requestCounts,
    requestHistory,
    applyLeave,
    applyOvertime,
    cancelBusinessTrip: cancelBusinessTripRequestById,
    cancelLeave,
    cancelOvertime: cancelOvertimeRequestById,
    cancelWeeklyWorkSchedule: cancelWeeklyWorkScheduleRequestById,
    clockIn,
    clockOut,
    fetchAdminBusinessTripRequestsList,
    fetchAdminLeaveRequestsList,
    fetchAdminOvertimeRequestsList,
    fetchAttendanceRecords: fetchMonthlyRecords,
    fetchLeaveBalance,
    fetchMonthlyRecords,
    fetchMonthlySummary,
    fetchMyBusinessTripRequestsList,
    fetchMyFlexibleWorkPlans,
    fetchMyLeaveRequests,
    fetchMyOvertimeRequestsList,
    fetchRequestHistory,
    fetchTeamFlexibleWorkPlans,
    processBusinessTripRequests,
    processFlexiblePlans,
    processLeaveRequests,
    processOvertimeRequests,
    refreshRequestCounts,
    submitBusinessTrip,
    submitWeeklyWorkSchedule,
    updateDailyAttendance,
  }
})
