# Task Management Platform

全端面試作業：任務管理應用程式。後端 Spring Boot 3、前端 Vue 3 + Vuetify，資料庫使用 Supabase（PostgreSQL）。

## 專案結構

```
/backend      Spring Boot 3 後端
/frontend     Vue 3 + Vuetify 前端
/docs         OpenAPI 規格、領域模型說明
/ai-notes     AI 使用紀錄（依前端/後端/資料庫分類）
```

## 如何啟動

### 後端

```bash
cd backend
export SUPABASE_DB_URL=jdbc:postgresql://<your-supabase-host>:5432/postgres
export SUPABASE_DB_USER=postgres
export SUPABASE_DB_PASSWORD=<your-password>
./mvnw spring-boot:run
```

後端預設跑在 `http://localhost:8080`。

### 前端

```bash
cd frontend
npm install
npm run dev
```

前端預設跑在 `http://localhost:5173`，詳細設定（環境變數、mock 模式、如何從 OpenAPI 規格產生型別）見 [`frontend/README.md`](frontend/README.md)。

## 示範資料

資料庫已預先寫入 8 筆示範任務（3 筆已完成、5 筆待辦），啟動後端後可直接在畫面上看到內容，不用手動建立。如果操作測試把資料改亂了，後端跑起來後執行以下指令可以重置回乾淨的 8 筆狀態：

```bash
./scripts/reset-demo-data.sh
```

## OpenAPI 規格

後端使用 [springdoc-openapi](https://springdoc.org/) 自動產生 OpenAPI 規格，後端啟動後可從以下位置存取：

- OpenAPI JSON：`http://localhost:8080/v3/api-docs`
- Swagger UI：`http://localhost:8080/swagger-ui.html`

## 領域模型

詳見 [`docs/domain-model.md`](docs/domain-model.md)。

## AI 使用說明

本專案開發過程中使用了 AI 工具協助（Claude，前後端各開一個獨立 session 平行開發）。使用紀錄依照前端/後端/資料庫分類，存放在 `/ai-notes` 資料夾：

- [`ai-notes/backend.md`](ai-notes/backend.md)
- [`ai-notes/frontend.md`](ai-notes/frontend.md)
- [`ai-notes/database.md`](ai-notes/database.md)

程式碼中對應片段會有 `// [AI assisted - <檔名> #編號]` 註解，指向 `/ai-notes` 中對應的紀錄。

**跟題目範例格式的差異**：題目範例是逐次對話存成 `chat-records/001.chat`，程式碼註解對應單一對話編號（`// [AI assisted 001]`）。這次改成依「前端／後端／資料庫」三個分類彙總記錄，一份檔案裡記錄多筆該領域的 AI 協助內容並編號（`#1`、`#2`...），程式碼註解對應到「哪份檔案的第幾筆」（`// [AI assisted - backend.md #1]`）。這樣做是因為這次用兩個 AI session 分別平行開發前後端，依領域彙總比逐次對話記錄更容易讓人看懂「這個領域整體用 AI 做了哪些事」，但紀錄的顆粒度與可追溯性（程式碼片段 ↔ 對應理由）跟題目原意是一致的。
