# AI 使用紀錄（前端）

工具：Claude Code（Claude Opus）。以下依開發階段編號，程式碼中以 `// [AI assisted - frontend.md #N]` 標註對應位置。

## #1 專案骨架與套件選型
- **做了什麼**：用 `npm create vite -- --template vue-ts` 建立 `/frontend`，選定 Vuetify 4 + Pinia + axios，並用 `vite-plugin-vuetify` 做元件自動載入與樣式 tree-shaking。因為只有一個列表頁，刻意不裝 vue-router。
- **為什麼用 AI**：產生樣板設定、確認 Vuetify 在 Vite 專案的標準接法。
- **檔案**：`vite.config.ts`、`src/main.ts`

## #2 API contract 型別（由 OpenAPI 規格產生）
- **做了什麼**：先依規格文件手寫 `Task` / `TaskRequest` 讓畫面能先做；後端啟動後執行 `npm run gen:api`（openapi-typescript 讀 `/v3/api-docs`）產生 `src/types/api.d.ts`，`types/task.ts` 改為直接使用產生的 schema，前端不再有任何手寫的 API 型別。
- **過程中的調整**：第一版 spec 因為 DTO 缺少標註，response 欄位全部產成 optional，前端一度需要用 `Required<Omit<...>>` 收斂；回報後端加上 `@Schema(requiredMode = REQUIRED)` 與 `nullable = true` 後重跑產生器，該 workaround 已移除。
- **為什麼用 AI**：把規格轉成型別的樣板工作，以及判讀產生型別與實際回傳形狀的落差。
- **檔案**：`src/types/task.ts`、`src/types/api.d.ts`（產生物，已納入版控）

## #3 Spring Boot 錯誤格式處理
- **做了什麼**：定義 `ApiError` 與 Spring 預設錯誤 body 的解析（優先取 `errors[].defaultMessage`，其次 `message`），並在 axios 攔截器統一轉換；連不上後端時給明確提示。
- **為什麼用 AI**：查 axios interceptor 寫法，以及 Spring Boot `include-message` / `include-binding-errors` 打開後的 body 欄位結構。
- **檔案**：`src/api/errors.ts`、`src/api/http.ts`

## #4 API 抽象層與 mock / 真實資料切換
- **做了什麼**：定義 `TaskApi` 介面，`tasks.real.ts` 走 axios、`tasks.mock.ts` 走假資料，`tasks.ts` 依 `VITE_USE_MOCK` 決定匯出哪一個。上層元件與 store 完全感覺不到差別。
- **為什麼用 AI**：設計可替換的資料來源結構，避免之後接後端時要改動元件。
- **檔案**：`src/api/types.ts`、`src/api/tasks.ts`、`src/api/tasks.real.ts`

## #5 Mock 資料來源
- **做了什麼**：以記憶體陣列實作六個 endpoint，含 250ms 模擬延遲、找不到資源丟 404、`title` 空白丟 400（比照後端 `@Valid`），讓錯誤流程在沒有後端時也能驗證。
- **為什麼用 AI**：產生假資料與模擬後端行為的樣板程式碼。
- **檔案**：`src/api/tasks.mock.ts`

## #6 Pinia store
- **做了什麼**：集中管理清單、載入中／儲存中狀態、逐列忙碌狀態、錯誤訊息與篩選條件；toggle 與 update 一律用後端回傳的 Task 覆蓋該列，不做樂觀更新以免前後端狀態不一致。
- **為什麼用 AI**：產生 Pinia setup store 樣板與非同步錯誤處理結構。
- **檔案**：`src/stores/tasks.ts`

## #7 主畫面與任務清單
- **做了什麼**：Vuetify 初始化（主題與元件預設值）、`v-app-bar` + 置中卡片版面、全部／未完成／已完成篩選、載入用 skeleton、無資料用 `v-empty-state`、錯誤用 snackbar；清單每列是勾選框 + 標題 + 描述 + 更新時間 + 編輯／刪除。
- **為什麼用 AI**：查 Vuetify 元件用法並產生版面樣板。
- **檔案**：`src/plugins/vuetify.ts`、`src/App.vue`、`src/components/TaskList.vue`

## #8 新增／編輯共用 Dialog
- **做了什麼**：同一個 dialog 依有無傳入 `task` 切換新增或編輯模式，開啟時重設表單，送出前檢查標題非空白，失敗時保持開啟讓使用者修正。
- **為什麼用 AI**：產生表單元件樣板與 `defineProps` / `defineEmits` 的 TypeScript 寫法。
- **檔案**：`src/components/TaskFormDialog.vue`

## #9 刪除確認 Dialog
- **做了什麼**：通用的確認對話框，刪除進行中鎖住按鈕。
- **為什麼用 AI**：產生樣板元件。
- **檔案**：`src/components/ConfirmDialog.vue`

## #10 相依套件衝突排除
- **做了什麼**：`openapi-typescript@7` 的 peer 只允許 TypeScript 5，與專案的 TypeScript 6 衝突，會讓 `npm install` 直接失敗；改成不放進 devDependencies，`gen:api` 以 `npx -y openapi-typescript@7` 執行。另外 Pinia 4 把 `@vue/devtools-api` 列為 peer，未安裝會導致 build 失敗，補裝為 devDependency。
- **為什麼用 AI**：解讀 npm ERESOLVE 報告並找出不影響交付的解法。
- **檔案**：`package.json`（JSON 無法寫註解，故僅記錄於此）

## #11 前端說明文件
- **做了什麼**：撰寫 `/frontend/README.md`，說明啟動方式、mock 與真實 API 的切換、以及從後端 OpenAPI 產生型別的指令。
- **為什麼用 AI**：產生文件草稿。
- **檔案**：`frontend/README.md`

## #12 前後端整合驗證
- **做了什麼**：後端啟動後逐項驗證整合：以帶 `Origin` 的 preflight 確認 CORS（`http://localhost:5173` 的 GET/POST/PUT/PATCH/DELETE 皆放行，其他 origin 回 403）；比對 `/v3/api-docs` 的六個 endpoint 與狀態碼跟前端呼叫一致；把後端真實回傳的 400／404 錯誤 body 餵進前端的 `messageFromSpringError`，確認畫面顯示的是後端的 `errors[].defaultMessage`（`title is required`）與 `message`（`Task 999999 not found`）。
- **為什麼用 AI**：設計不依賴瀏覽器也能驗證的檢查方式，並解讀 CORS preflight 結果。
- **檔案**：無（驗證流程，非程式碼）

