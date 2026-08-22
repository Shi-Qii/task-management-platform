# Backend AI 使用紀錄

每筆記錄對應程式碼中的 `// [AI assisted - backend.md #N]` 註解。

## #1
**做了什麼**：產生 `Task` entity、`TaskRepository`、`TaskService`、`TaskController` 的 CRUD 骨架。
**為什麼用 AI**：這是標準的 Spring Boot CRUD 樣板，用 AI 加速產生，邏輯與欄位設計由開發者確認過。

## #2
**做了什麼**：加入 springdoc-openapi 的設定（`OpenApiConfig`），讓專案啟動後自動產生 OpenAPI 規格文件。
**為什麼用 AI**：查詢 springdoc-openapi 3.x 相容版本與 Bean 設定用法。

## #3
**做了什麼**：加入 CORS 設定（`WebConfig`），開放本機前端 dev server（`localhost:5173`）呼叫 API。
**為什麼用 AI**：快速產生 Spring MVC CORS 設定樣板。

## #4
**做了什麼**：`pom.xml` 依賴設定（Spring Boot 3.4.0 parent、springdoc、lombok、postgresql driver）。
**為什麼用 AI**：確認各依賴版本相容性，並手動撰寫（因為 start.spring.io 已不提供 Spring Boot 3.x 選項，改為手動組 pom.xml）。

## #5
**做了什麼**：在 `TaskResponse` 加上 `@Schema` 註解，明確標示 `id`/`title`/`completed`/`createdAt`/`updatedAt` 為必填、`description` 為可為 null，讓 OpenAPI 規格更精確（原本 springdoc 預設會把所有欄位標成 optional）。
**為什麼用 AI**：前端串接後回報 spec 欄位都是 optional 造成型別產生不夠精確，請 AI 協助修正 DTO 註解。
