# Database AI 使用紀錄

每筆記錄對應程式碼／設定中的 `// [AI assisted - database.md #N]` 或 `<!-- [AI assisted - database.md #N] -->` 註解。

## #1
**做了什麼**：討論並決定資料庫方案，選用 Supabase（免費雲端 PostgreSQL），避免本機另外安裝資料庫。
**為什麼用 AI**：評估選項與時間成本的討論。

## #2
**做了什麼**：`application.yml` 的資料來源設定（`SUPABASE_DB_URL` / `SUPABASE_DB_USER` / `SUPABASE_DB_PASSWORD` 環境變數化，`ddl-auto=update` 讓 Hibernate 依 `Task` entity 自動建表）。
**為什麼用 AI**：快速產生設定樣板，並確保真實連線密碼不會寫進版控的檔案。

## #3
**做了什麼**：實際用 curl 呼叫後端 API，寫入 8 筆種子任務資料到 Supabase 資料庫（3 筆已完成、5 筆待辦），方便前端串接時畫面有資料可看、也符合面試 demo 需求。
**為什麼用 AI**：批次建立測試資料、驗證 CRUD 與 Supabase 連線是否正常。
