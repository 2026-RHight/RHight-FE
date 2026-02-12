export const hrCertificateKindsMock = [
  {
    key: 'employment',
    title: '재직 증명서',
    description: '현재 재직 중임을 증명하는\n서류입니다.'
  }
]

export const hrCertificateHistoryMock = [
  {
    id: 'CERT-20260205-01',
    kindKey: 'employment',
    kindLabel: '재직 증명서',
    issuedDate: '2026.02.05',
    status: 'ISSUED',
    submitTo: '국민은행',
    purpose: '금융 거래 목적',
    fileName: '재직증명서_20260205.pdf'
  },
  {
    id: 'CERT-20251220-03',
    kindKey: 'employment',
    kindLabel: '재직 증명서',
    issuedDate: '2025.12.20',
    status: 'ISSUED',
    submitTo: '신한은행',
    purpose: '대출 심사 제출',
    fileName: '재직증명서_20251220.pdf'
  }
]

export const hrCertificatePolicyMock = [
  '재직 증명서는 본인 계정에서만 신청할 수 있습니다.',
  '증명서 발급 요청 시 즉시 PDF 문서가 생성됩니다.',
  '발급된 증명서는 발급 이력에서 다시 다운로드할 수 있습니다.',
  '허위 용도로 사용할 경우 사내 규정에 따라 제한될 수 있습니다.'
]

export const createHrCertificateKindsMock = () => structuredClone(hrCertificateKindsMock)
export const createHrCertificateHistoryMock = () => structuredClone(hrCertificateHistoryMock)
export const createHrCertificatePolicyMock = () => structuredClone(hrCertificatePolicyMock)
