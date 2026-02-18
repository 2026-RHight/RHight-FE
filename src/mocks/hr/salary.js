export const createHrSalarySummaryMock = () => ({
  latestMonthLabel: '2026년 2월',
  grossAmount: 4200000,
  payDate: '2026.02.25'
})

export const createHrSalaryHistoryMock = () => ([
  { id: 'SAL-2026-02', payDate: '2026.02.25', month: '2026-02', grossAmount: 4200000 },
  { id: 'SAL-2026-01', payDate: '2026.01.25', month: '2026-01', grossAmount: 4200000 },
  { id: 'SAL-2025-12', payDate: '2025.12.24', month: '2025-12', grossAmount: 4100000 },
  { id: 'SAL-2025-11', payDate: '2025.11.25', month: '2025-11', grossAmount: 4100000 },
  { id: 'SAL-2025-10', payDate: '2025.10.25', month: '2025-10', grossAmount: 4100000 },
  { id: 'SAL-2025-09', payDate: '2025.09.25', month: '2025-09', grossAmount: 4800000 }
])
