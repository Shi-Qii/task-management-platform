# 領域模型

## Task

任務管理系統目前只有一個核心領域物件：`Task`。

| 欄位          | 型別      | 說明                              |
|---------------|-----------|-----------------------------------|
| `id`          | Long      | 主鍵，資料庫自動產生               |
| `title`       | String    | 任務標題，必填                     |
| `description` | String    | 任務描述，選填                     |
| `completed`   | boolean   | 是否已完成，預設 `false`           |
| `createdAt`   | Instant   | 建立時間，建立時自動寫入，不可更新 |
| `updatedAt`   | Instant   | 最後更新時間，每次修改自動更新     |

對應的資料表：`tasks`（由 Hibernate `ddl-auto=update` 自動建立）。

目前沒有使用者、分類、標籤等其他領域概念，範圍就是單一 `Task` 的 CRUD，符合題目要求的功能範圍。
