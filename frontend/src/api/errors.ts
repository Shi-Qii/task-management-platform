// [AI assisted - frontend.md #3]
// 後端沿用 Spring Boot 預設錯誤格式，並開了
// server.error.include-message=always / include-binding-errors=always，
// 所以 message 跟逐欄位的 errors 都拿得到。
export interface SpringFieldError {
  field?: string
  defaultMessage?: string
}

export interface SpringErrorBody {
  timestamp?: string
  status?: number
  error?: string
  message?: string
  errors?: SpringFieldError[]
  path?: string
}

/** API 呼叫失敗時統一丟出這個，讓 store 不用管底層是 axios 還是 mock */
export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: SpringFieldError[]

  constructor(message: string, status = 0, fieldErrors: SpringFieldError[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

/** 把 Spring 的錯誤 body 轉成可以直接顯示的訊息 */
export function messageFromSpringError(body: SpringErrorBody | undefined, fallback: string): string {
  const fieldMessages = (body?.errors ?? [])
    .map((e) => e.defaultMessage)
    .filter((m): m is string => Boolean(m))

  if (fieldMessages.length > 0) return fieldMessages.join('、')
  if (body?.message) return body.message
  if (body?.error) return body.error
  return fallback
}
