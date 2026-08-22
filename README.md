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

資料庫已預先寫入 8 筆示範任務（3 筆已完成、5 筆待辦），啟動後端後可直接在畫面上看到內容，不用手動建立。

## OpenAPI 規格

後端使用 [springdoc-openapi](https://springdoc.org/) 自動產生 OpenAPI 規格，後端啟動後可從以下位置存取：

- OpenAPI JSON：`http://localhost:8080/v3/api-docs`
- Swagger UI：`http://localhost:8080/swagger-ui.html`

## 領域模型

詳見 [`docs/domain-model.md`](docs/domain-model.md)。

## AI 使用說明

本專案開發過程中使用了 AI 工具協助（Claude）。使用紀錄依照前端/後端/資料庫分類，存放在 `/ai-notes` 資料夾：

- [`ai-notes/backend.md`](ai-notes/backend.md)
- [`ai-notes/frontend.md`](ai-notes/frontend.md)
- [`ai-notes/database.md`](ai-notes/database.md)

程式碼中對應片段會有 `// [AI assisted - <檔名> #編號]` 註解，指向 `/ai-notes` 中對應的紀錄。
