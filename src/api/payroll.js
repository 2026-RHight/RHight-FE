import { API_BASE_URL, createApiClient } from './index'

const payrollApi = createApiClient(API_BASE_URL, {
  withCredentials: true,
})

export const verifyPayrollPassword = (password) =>
  payrollApi.post('/payroll/verify-password', { password })

export const getRecentPayrolls = (params) => payrollApi.get('/payroll/recent', { params })

export const getPayrollsByYear = (year) => payrollApi.get(`/payroll/year/${year}`)

export const getPayrollDetail = (ledgerId) => payrollApi.get(`/payroll/details/${ledgerId}`)

export const calculatePayroll = (employeeId, year, month) =>
  payrollApi.post(`/payroll/calculate/${employeeId}`, null, {
    params: { year, month },
  })

export const downloadPayslip = (ledgerId) =>
  payrollApi.get(`/payroll/download/${ledgerId}`, {
    responseType: 'blob',
  })
