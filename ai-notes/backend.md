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

## #6
**做了什麼**：`TaskRepository` 加上 `findAllByOrderByCreatedAtAsc()`，`TaskService.findAll()` 改用這個方法，讓任務清單固定依建立時間排序，不會因為修改/切換完成狀態而在畫面上跳動。
**為什麼用 AI**：前端稽核時發現清單順序跟著資料庫物理順序跑，demo 時會很明顯，請 AI 協助修正。

## #7
**做了什麼**：寫一支 `scripts/reset-demo-data.sh`，清空 `tasks` 資料表並重新塞入固定的 8 筆示範資料（3 完成/5 待辦），面試前可以重新跑一次回到乾淨狀態。
**為什麼用 AI**：手動開發測試把種子資料改亂了，需要一個可重複執行的重置方式。

## #8
**做了什麼**：`TaskRepository` 把 `findAllByOrderByCreatedAtAsc()` 從方法名稱推導查詢改成明確的 `@Query` JPQL，並加兩個範本方法（`findByIdCustom` 示範 JPQL + `@Param`、`findByCompletedNative` 示範 `nativeQuery = true` 直接寫 SQL，參數故意用數字 0/1 而非 boolean，並在 SQL 裡用 `(:completed <> 0)` 處理 Postgres 沒有整數轉 boolean 隱式轉換的問題）。
**為什麼用 AI**：開發者習慣工作上明確寫 SQL/JPQL 而非依賴 Spring Data 的方法名稱推導，先準備好範本方便之後現場快速修改；數字參數是配合開發者過去在 MySQL 環境的慣用寫法，但要處理 Postgres 型別系統的差異。
