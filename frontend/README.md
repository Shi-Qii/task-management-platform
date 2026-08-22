# 前端（Vue 3 + Vite + TypeScript + Vuetify）

任務管理應用程式的前端，對接後端 `/api/tasks`。

## 啟動

```bash
npm install
npm run dev          # http://localhost:5173
```

其他指令：

```bash
npm run type-check   # vue-tsc 型別檢查
npm run build        # 型別檢查 + 打包
npm run preview      # 預覽打包結果
```

## 環境變數

`.env.development`（可參考 `.env.example`）：

| 變數 | 說明 |
|---|---|
| `VITE_API_BASE_URL` | 後端 base URL，預設 `http://localhost:8080` |
| `VITE_USE_MOCK` | `true` 時使用前端假資料，不打後端；`false` 時打真實 API |

後端還沒啟動時把 `VITE_USE_MOCK` 設為 `true`，畫面與互動都能完整操作（假資料同樣會模擬 404 與欄位驗證錯誤）。後端啟動後改成 `false` 即可接上真實 API，元件與 store 完全不用改。

## 從 OpenAPI 規格產生型別

後端以 springdoc-openapi 提供規格，啟動後執行：

```bash
npm run gen:api      # 讀 http://localhost:8080/v3/api-docs → src/types/api.d.ts
```

產生後把 `src/types/task.ts` 內手寫的 interface 換成規格產生的型別即可：

```ts
import type { components } from './api'
export type Task = components['schemas']['TaskResponse']
```

Swagger UI：`http://localhost:8080/swagger-ui.html`

## 結構

```
src/
  api/
    errors.ts        # ApiError 與 Spring Boot 預設錯誤格式解析
    http.ts          # axios instance + 錯誤攔截
    types.ts         # TaskApi 介面（mock 與真實實作共用）
    tasks.real.ts    # 真實後端實作
    tasks.mock.ts    # 假資料實作（含 404 / 400 模擬）
    tasks.ts         # 依 VITE_USE_MOCK 決定資料來源
  stores/tasks.ts    # Pinia：清單狀態、CRUD、篩選、錯誤訊息
  components/
    TaskList.vue
    TaskFormDialog.vue   # 新增與編輯共用
    ConfirmDialog.vue
  types/task.ts      # API contract 型別
  App.vue
```

資料流：元件 → Pinia store → `taskApi` → (mock | axios)。切換資料來源只影響最後一層。

## 對應的後端 API

| Method | Path | 說明 |
|---|---|---|
| GET | `/api/tasks` | 取得所有任務 |
| GET | `/api/tasks/{id}` | 取得單一任務 |
| POST | `/api/tasks` | 建立任務 |
| PUT | `/api/tasks/{id}` | 修改任務 |
| PATCH | `/api/tasks/{id}/toggle` | 切換完成狀態 |
| DELETE | `/api/tasks/{id}` | 刪除任務 |

## AI 使用紀錄

見專案根目錄 `/ai-notes/frontend.md`，程式碼中以 `// [AI assisted - frontend.md #N]` 標註對應段落。
