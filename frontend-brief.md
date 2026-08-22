# Frontend 開發任務說明

給另一個 CLI 視窗／session 用的交接文件，後端已經在另一邊同步進行，這邊照這份規格做前端就好，不用等後端跑起來。

## 任務背景

全端面試作業：任務管理應用程式（Task）。CRUD + 標記完成/未完成。時間很趕（週一下午面試），**不用寫測試**，功能要正確，畫面「有樣子就好」不用刻意雕。

## 技術要求

- Vue 3 + Vite + TypeScript
- UI 庫：**Vuetify**（開發者已經用過，選這個）
- 放在專案根目錄的 `/frontend` 資料夾
- 從後端的 OpenAPI 規格產生 API client 型別（後端用 springdoc-openapi，跑起來後可從 `http://localhost:8080/v3/api-docs` 拿到 spec）。建議用 `openapi-typescript` 或 `orval` 產生型別/client，這是這次作業的技術亮點之一（contract-first 串接）。如果後端還沒跑起來，可以先手動定義好對應的 TypeScript type（見下方 API 規格），等後端跑起來後再跑產生工具替換掉手動型別。

## API 規格（後端 base URL: `http://localhost:8080/api/tasks`）

### Task 資料結構

```ts
interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}

interface TaskRequest {
  title: string;       // required, non-blank
  description?: string;
}
```

### Endpoints

| Method | Path                  | 說明               | Request Body | Response              |
|--------|-----------------------|--------------------|---------------|------------------------|
| GET    | /api/tasks             | 取得所有任務        | -             | `Task[]`               |
| GET    | /api/tasks/{id}        | 取得單一任務        | -             | `Task`                 |
| POST   | /api/tasks             | 建立任務            | `TaskRequest` | `Task` (201 Created)   |
| PUT    | /api/tasks/{id}        | 修改任務            | `TaskRequest` | `Task`                 |
| PATCH  | /api/tasks/{id}/toggle | 切換完成/未完成狀態 | -             | `Task`                 |
| DELETE | /api/tasks/{id}        | 刪除任務            | -             | 204 No Content         |

找不到資源時回 404，body 是 Spring 預設的 error JSON（`status`, `error`, `message`, `path` 等欄位）。

## 畫面需求

- 一個任務列表頁：顯示所有任務（標題、描述、完成狀態）
- 可以勾選/切換完成狀態（呼叫 toggle endpoint）
- 新增任務的表單（可以是頁面內的表單或彈出 dialog）
- 編輯任務（同上，Modal 或 inline 都可以）
- 刪除任務（按鈕 + 簡單的確認）
- 不用刻意做響應式/手機版，desktop 看得順眼就好

## 開發階段先用 mock 資料

後端可能還沒完全跑起來，可以先在前端用假資料把畫面跟互動邏輯做完，之後接上真實 API 時只要換掉資料來源（呼叫 axios/fetch 的地方）即可，建議把 API 呼叫集中包成一個 `api/tasks.ts` 或用 pinia store 管理，方便之後替換。

## AI 使用紀錄規範（重要，繳交要用）

如果這邊也是用 AI 協助寫的，請比照以下方式記錄（跟原始題目規定的格式有調整過，改成分類彙總）：

1. 在 `/ai-notes/frontend.md` 這個檔案裡，依序記錄每一次讓 AI 協助的內容：做了什麼、為什麼用 AI（例如查 API 用法、生成樣板、除錯），簡短幾行就好，並編號（#1, #2, #3...）
2. 在對應的程式碼旁邊加註解，格式：`// [AI assisted - frontend.md #3]`，數字對應 `frontend.md` 裡的第幾筆記錄

`/ai-notes` 資料夾在專案根目錄，跟 `/backend`、`/frontend` 同一層。

## Git

專案是同一個 repo（monorepo），repo 位置：`https://github.com/Shi-Qii/task-management-platform.git`。前端寫在 `/frontend` 資料夾內，不用另外開 repo，也先不用急著 push，先在本機做完。

## 有問題怎麼辦

這份文件涵蓋了目前討論定案的規格，如果做的過程中發現規格不夠清楚或想換做法（例如 UI 排版、要不要加額外套件），先跟使用者確認過再動手調整，不要自己默默改掉這份文件定的方向。
