import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useAttendanceStore = defineStore('attendance', () => {
    // --- State ---

    // 1. Daily Attendance Data (populating from backend)
    const dailyAttendance = ref([])
    const isLoading = ref(false)

    // 2. Monthly Summary Data (matching backend DTO)
    const monthlySummary = ref({
        normalCount: 0,
        tardyCount: 0,
        earlyLeaveCount: 0,
        absentCount: 0,
        vacationCount: 0
    })

    // 3. Leave Requests Data (Mock for now, as it might be in a different module)
    const leaveRequests = ref([
        { id: 101, userId: 'user1', name: '김철수', position: '사원', deptName: '개발팀', type: '연차', title: '연차 신청 (1일)', period: '2026-02-20', days: 1, reason: '개인 사정', status: 'pending', appliedAt: '2026-02-10', targetDate: '2026-02-20', approver: 'Steve 매니저' },
        { id: 102, userId: 'user2', name: '이영희', position: '대리', deptName: '개발팀', type: '반차', title: '반차 신청 (오후)', period: '2026-02-21 (오후)', days: 0.5, reason: '병원 진료', status: 'approved', appliedAt: '2026-02-12', targetDate: '2026-02-21', approver: 'Steve 매니저' },
        { id: 103, userId: 'user3', name: '홍길동', position: '과장', deptName: '영업팀', type: '연차', title: '연차 신청 (2일)', period: '2026-02-24 ~ 02-25', days: 2, reason: '가족 여행', status: 'pending', appliedAt: '2026-02-15', targetDate: '2026-02-24', approver: 'Steve 매니저' },
        { id: 104, userId: 'user1', name: '김철수', position: '사원', deptName: '개발팀', type: '연장', title: '연장근무 신청 (2h)', period: '2026-02-12', days: 0, reason: '프로젝트 마감', status: 'approved', appliedAt: '2026-02-12', targetDate: '2026-02-12', approver: 'Steve 매니저' },
        { id: 105, userId: 'user1', name: '김철수', position: '사원', deptName: '개발팀', type: '재택', title: '재택근무 신청', period: '2026-02-03', days: 1, reason: '집중 근무', status: 'rejected', appliedAt: '2026-02-02', targetDate: '2026-02-03', approver: 'Kim 이사' },
    ])

    // 4. Flexible Work Plans Data (Mock for now)
    const flexibleWorkPlans = ref([
        { id: 1, userId: 'user1', name: '김철수', position: '대리', dept: '개발팀', period: '02.23 - 02.27', type: '시차출퇴근', status: 'pending' },
        { id: 2, userId: 'user2', name: '이영희', position: '사원', dept: '개발팀', period: '02.23 - 02.27', type: '선택적근로', status: 'pending' },
        { id: 3, userId: 'user3', name: '박민수', position: '과장', dept: '영업팀', period: '02.23 - 02.27', type: '재택근무', status: 'approved' },
        { id: 4, userId: 'user4', name: '최자바', position: '팀장', dept: '개발팀', period: '02.23 - 02.27', type: '시차출퇴근', status: 'rejected' },
        { id: 5, userId: 'user5', name: '정뷰', position: '사원', dept: '디자인', period: '02.23 - 02.27', type: '시차출퇴근', status: 'pending' },
    ])

    // Current User Check-in/out State
    const checkInTime = ref(null)
    const checkOutTime = ref(null)

    // --- Actions ---

    // Fetch Monthly Summary
    const fetchMonthlySummary = async (year, month) => {
        try {
            const response = await api.get('/v1/attendance/summary', {
                params: { year, month }
            })
            monthlySummary.value = response.data
        } catch (error) {
            console.error('Failed to fetch monthly summary:', error)
        }
    }

    // Fetch Monthly Records
    const fetchMonthlyRecords = async (year, month, status = null) => {
        isLoading.value = true
        try {
            const params = { year, month }
            if (status) params.status = status
            const response = await api.get('/v1/attendance/records', { params })

            // Transform backend data to frontend format
            dailyAttendance.value = response.data.map(record => ({
                id: record.attendanceId,
                date: record.workDate,
                checkIn: record.checkInTime ? record.checkInTime.substring(0, 5) : null,
                checkOut: record.checkOutTime ? record.checkOutTime.substring(0, 5) : null,
                status: record.status.toLowerCase(),
                statusDescription: record.statusDescription,
                workHours: calculateWorkHours(record.checkInTime, record.checkOutTime)
            }))

            // Update check-in/out time if it's today
            const today = new Date().toISOString().split('T')[0]
            const todaysRecord = dailyAttendance.value.find(r => r.date === today)
            if (todaysRecord) {
                checkInTime.value = todaysRecord.checkIn
                checkOutTime.value = todaysRecord.checkOut
            } else {
                checkInTime.value = null
                checkOutTime.value = null
            }
        } catch (error) {
            console.error('Failed to fetch monthly records:', error)
        } finally {
            isLoading.value = false
        }
    }

    // Attendance Actions
    const clockIn = async (tardyReason = null) => {
        try {
            await api.post('/v1/attendance/clock-in', { tardyReason })
            // Re-fetch records for the current month
            const now = new Date()
            await fetchMonthlyRecords(now.getFullYear(), now.getMonth() + 1)
            await fetchMonthlySummary(now.getFullYear(), now.getMonth() + 1)
            return true
        } catch (error) {
            console.error('Clock-in failed:', error)
            throw error
        }
    }

    const clockOut = async () => {
        try {
            await api.put('/v1/attendance/clock-out')
            const now = new Date()
            await fetchMonthlyRecords(now.getFullYear(), now.getMonth() + 1)
            await fetchMonthlySummary(now.getFullYear(), now.getMonth() + 1)
            return true
        } catch (error) {
            console.error('Clock-out failed:', error)
            throw error
        }
    }

    // Helper functions
    const calculateWorkHours = (inTime, outTime) => {
        if (!inTime || !outTime) return '0h'
        const [h1, m1] = inTime.split(':').map(Number)
        const [h2, m2] = outTime.split(':').map(Number)
        let diffMs = (h2 * 60 + m2) - (h1 * 60 + m1)
        if (diffMs < 0) return '0h'

        const h = Math.floor(diffMs / 60)
        const m = diffMs % 60
        return `${h}h ${String(m).padStart(2, '0')}m`
    }

    // Admin Actions (Keep existing for UI consistency for now)
    const updateDailyAttendance = (id, updates) => {
        const idx = dailyAttendance.value.findIndex(item => item.id === id)
        if (idx !== -1) {
            dailyAttendance.value[idx] = { ...dailyAttendance.value[idx], ...updates }
        }
    }

    const updateLeaveStatus = (id, status, rejectReason = '') => {
        const idx = leaveRequests.value.findIndex(item => item.id === id)
        if (idx !== -1) {
            leaveRequests.value[idx].status = status
            if (status === 'rejected' && rejectReason) {
                leaveRequests.value[idx].rejectReason = rejectReason
            }
        }
    }

    const updateFlexibleStatus = (id, status, rejectReason = '') => {
        const idx = flexibleWorkPlans.value.findIndex(item => item.id === id)
        if (idx !== -1) {
            flexibleWorkPlans.value[idx].status = status
            if (status === 'rejected' && rejectReason) {
                flexibleWorkPlans.value[idx].rejectReason = rejectReason
            }
        }
    }

    const setCheckInTime = (time) => {
        checkInTime.value = time
    }

    const setCheckOutTime = (time) => {
        checkOutTime.value = time
    }

    // 5. Leave State
    const leaveBalance = ref({
        totalAnnualLeave: 0,
        usedAnnualLeave: 0,
        pendingAnnualLeave: 0,
        remainingAnnualLeave: 0
    })
    const myLeaveRequestsList = ref([])

    // ... Actions ...

    // Fetch Leave Balance
    const fetchLeaveBalance = async () => {
        try {
            const response = await api.get('/v1/leaves/balance')
            leaveBalance.value = response.data
        } catch (error) {
            console.error('Failed to fetch leave balance:', error)
        }
    }

    // Fetch My Leave Requests
    const fetchMyLeaveRequests = async (page = 1, size = 10) => {
        try {
            const response = await api.get('/v1/leaves/my-requests', {
                params: { page, size }
            })
            myLeaveRequestsList.value = response.data.list
        } catch (error) {
            console.error('Failed to fetch my leave requests:', error)
        }
    }

    // Apply for Leave
    const applyLeave = async (payload) => {
        try {
            await api.post('/v1/leaves/apply', payload)
            await fetchLeaveBalance()
            await fetchMyLeaveRequests()
            return true
        } catch (error) {
            console.error('Failed to apply for leave:', error)
            throw error
        }
    }

    // Cancel Leave
    const cancelLeave = async (leaveRequestId) => {
        try {
            await api.put(`/v1/leaves/${leaveRequestId}/cancel`)
            await fetchLeaveBalance()
            await fetchMyLeaveRequests()
            return true
        } catch (error) {
            console.error('Failed to cancel leave:', error)
            throw error
        }
    }

    // ... existing actions ...

    return {
        dailyAttendance,
        monthlySummary,
        leaveRequests,
        flexibleWorkPlans,
        isLoading,
        leaveBalance,
        myLeaveRequestsList,
        updateDailyAttendance,
        updateLeaveStatus,
        updateFlexibleStatus,
        myLeaveRequests, // This was a computed for mock data, I'll keep it but maybe it should use myLeaveRequestsList now
        checkInTime,
        checkOutTime,
        setCheckInTime,
        setCheckOutTime,
        fetchMonthlySummary,
        fetchMonthlyRecords,
        clockIn,
        clockOut,
        fetchLeaveBalance,
        fetchMyLeaveRequests,
        applyLeave,
        cancelLeave
    }
})

