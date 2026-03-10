import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  calculatePayroll as calculatePayrollRequest,
  downloadPayslip as downloadPayslipRequest,
  getPayrollDetail,
  getPayrollsByYear,
  getRecentPayrolls,
  verifyPayrollPassword,
} from '@/api/payroll'

const formatMonthParts = (targetMonth) => {
  if (!targetMonth) return { year: '', month: '' }
  const [year = '', month = ''] = String(targetMonth).split('-')
  return { year, month: Number(month) || 0 }
}

const mapPayrollListItem = (item) => {
  const { year, month } = formatMonthParts(item.targetMonth)
  return {
    ledgerId: item.id,
    id: item.id,
    targetMonth: item.targetMonth,
    year,
    month,
    payoutDate: item.targetMonth ? `${item.targetMonth}-25` : '-',
    totalPayment: Number(item.totalPayment || 0),
    totalDeduction: Number(item.totalPayment || 0) - Number(item.netPay || 0),
    netPayment: Number(item.netPay || 0),
  }
}

const mapPayrollDetail = (item) => ({
  ledgerId: item.id,
  id: item.id,
  targetMonth: item.targetMonth,
  employeeName: item.employeeName,
  department: item.department,
  position: item.position,
  paymentDate: item.paymentDate,
  salaryAmount: Number(item.salaryAmount || 0),
  overtimeAmount: Number(item.overtimeAmount || 0),
  mealAmount: Number(item.mealAmount || 0),
  totalPayment: Number(item.totalPayment || 0),
  nationalPensionAmount: Number(item.nationalPensionAmount || 0),
  healthInsuranceAmount: Number(item.healthInsuranceAmount || 0),
  longTermCareAmount: Number(item.longTermCareAmount || 0),
  empInsuranceAmount: Number(item.empInsuranceAmount || 0),
  incomeTaxAmount: Number(item.incomeTaxAmount || 0),
  localTaxAmount: Number(item.localTaxAmount || 0),
  totalDeductionAmount: Number(item.totalDeductionAmount || 0),
  netPay: Number(item.netPay || 0),
  bankName: item.bankName,
  accountNumber: item.accountNumber,
  accountHolder: item.accountHolder,
})

export const usePayrollStore = defineStore('payroll', () => {
  const isVerified = ref(false)
  const recentPayrolls = ref([])
  const yearlyPayrolls = ref([])
  const currentPayrollDetail = ref(null)

  const verifyPassword = async (password) => {
    const response = await verifyPayrollPassword(password)
    isVerified.value = Boolean(response.data)
    return isVerified.value
  }

  const fetchRecentPayrolls = async (limit = 6) => {
    const response = await getRecentPayrolls({ limit })
    recentPayrolls.value = (response.data || []).map(mapPayrollListItem)
    return recentPayrolls.value
  }

  const fetchPayrollsByYear = async (year) => {
    const response = await getPayrollsByYear(year)
    yearlyPayrolls.value = (response.data || []).map(mapPayrollListItem)
    return yearlyPayrolls.value
  }

  const fetchPayrollDetail = async (ledgerId) => {
    const response = await getPayrollDetail(ledgerId)
    currentPayrollDetail.value = mapPayrollDetail(response.data)
    return currentPayrollDetail.value
  }

  const calculatePayroll = async (employeeId, year, month) => {
    const response = await calculatePayrollRequest(employeeId, year, month)
    return response.data
  }

  const downloadPayslip = async (ledgerId) => {
    const response = await downloadPayslipRequest(ledgerId)
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `payslip_${ledgerId}.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return {
    currentPayrollDetail,
    isVerified,
    recentPayrolls,
    yearlyPayrolls,
    calculatePayroll,
    downloadPayslip,
    fetchPayrollDetail,
    fetchPayrollsByYear,
    fetchRecentPayrolls,
    verifyPassword,
  }
})
